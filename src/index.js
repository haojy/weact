import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import chalk from 'chalk'
import chokidar from 'chokidar'
import minimist from 'minimist'
import rollup from 'rollup'
import rp_babel from 'rollup-plugin-babel'
import { invert, remove } from 'lodash'

import transform from './transform'

const error = (str, ...rest) => console.log(
  chalk.red.bold(`[ERR] ${str}`, rest),
)
const INFO_TYPE = {
  page: '页面',
  app: '应用',
  component: '组件',
  template: '模版',
  local_module: '模块',
  node_module: 'NPM包',
}
const info = (type, str, ...rest) => console.log(
  chalk.cyanBright.bold(`[${INFO_TYPE[type]}]\t`),
  chalk.dim.bold(`${str}`, rest),
)


function copyNodeModule(name, target) {
  // Let`s guess
  let nodeModuleSource = path.resolve('node_modules', name, 'dist', `${name}.js`)
  if (!fs.existsSync(nodeModuleSource)) nodeModuleSource = path.resolve('node_modules', name, `${name}.js`)
  if (!fs.existsSync(nodeModuleSource)) return error(`无法加载 ${name}`)

  const modulesPath = path.join(target, 'modules')
  const type = 'node_module'
  const filePath = path.join(modulesPath, `${name}.js`)

  if (!fs.existsSync(modulesPath)) mkdirp.sync(modulesPath)
  if (!fs.existsSync(filePath)) fs.copyFileSync(nodeModuleSource, filePath)
  info(type, path.relative('', nodeModuleSource))
}

async function scan(input, target) {
  const inputOptions = {
    input,
    external: ['weact'],
    plugins: [
      rp_babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }),
    ],
    onwarn({ code, source, importer, names, message, url }) {
      switch(code) {
        case 'UNRESOLVED_IMPORT': {
          copyNodeModule(source, target)
          return
        }
        case 'UNUSED_EXTERNAL_IMPORT': return
        case 'NON_EXISTENT_EXPORT': return
        default: {
          error(message)
        }
      }

    }
  }
  const bundle = await rollup.rollup(inputOptions)
  const modules = {} 
  const referenced = {}
  bundle.modules.forEach(function({ id, dependencies, originalCode, resolvedIds }) {
    // if (!dependencies.length) return
    if (id === 'rollupPluginBabelHelpers') return
    remove(dependencies, id => id === 'rollupPluginBabelHelpers')
    dependencies.forEach(function(refId) {
      if (refId === 'rollupPluginBabelHelpers') return

      if (!Array.isArray(referenced[refId])) referenced[refId] = []
      referenced[refId].push(path.relative(refId, id))
    })
    const resolved = invert(resolvedIds)
    modules[id] = {
      id,
      // ast,
      depended: dependencies,
      code: originalCode,
      // cjs: code,
      resolved,
      // resolvedExternalIds,
    }
  })

  return {
    modules,
    referenced,
    main: bundle.modules[bundle.modules.length - 1].id,
  }
}

function writeOutput(output, paths) {
  const { id, type, js, } = output
  const { target, src } = paths
  const { name, dir } = path.parse(path.join(target, path.relative(src, id)))
  const dirname = /page|component/.test(type) ? path.resolve(dir, name) : dir

  if (type) {
    info(type, path.relative(src, id))
    if (!fs.existsSync(dirname)) mkdirp.sync(dirname)
    Object.entries(output).forEach(function([fileSuffix, data]) {
      if (data && /json|js|wxml|wxss/.test(fileSuffix)) {
        const filePath = path.join(dirname, `${name}.${fileSuffix}`)
        fs.writeFileSync(filePath, data)
      }
    })
  } else {
    error(id, js)
  }
}

function gen(id, modules, transformedModules, paths, referenced) {
  const { depended,code } = modules[id]
  if (depended.length) {
    depended.reduce((transformedModules, id) => gen(id, modules, transformedModules, paths, referenced), transformedModules)
    if (!transformedModules[id]) {
      const dependedModules = depended.reduce((dependedModules, dependedId) => (dependedModules[dependedId] = transformedModules[dependedId]) && dependedModules, {})
      transformedModules[id] = Object.assign({ id }, transform({ id, code, dependedModules, referencedBy: referenced[id], sourcePath: paths.src }))
      writeOutput(transformedModules[id], paths)
    }
  } else {
    if (!transformedModules[id]) {
      transformedModules[id] = Object.assign({ id }, transform({ id,  code, referencedBy: referenced[id], sourcePath: paths.src }))
      writeOutput(transformedModules[id], paths)
    }
  }
  return transformedModules
}


async function build(sourcePath, targetPath) {
  const source = fs.statSync(sourcePath).isDirectory() ? path.join(sourcePath, 'app.jsx') : sourcePath
  const target = path.isAbsolute(targetPath) ? targetPath : path.resolve(targetPath)

  // rimraf.sync(target)

  const {
    modules,
    referenced,
    main,
  } = await scan(source, target)
  const transformedModules = {}
  const src = path.parse(path.resolve(source)).dir

  // console.log('SCANNED', Object.keys(modules))
  gen(main, modules, transformedModules, { target, src }, referenced)
  return modules
}

(async function () {
  const command = minimist(process.argv.slice(2), {
    alias: {
      w: 'watch',
      h: 'helper',
    }
  })
  const [sourcePath, targetPath = './dist'] = command._

  if (!sourcePath) {
    error('No app.jsx')
    return
  } else if (!targetPath) {
    error('No target project path')
    return
  }

  let modules = await build(sourcePath, targetPath)

  if (command.watcher) {
    const watcher = chokidar.watch(Object.keys(modules))

    watcher.on('change', async function(path) {
      modules = await build(sourcePath, targetPath)
      watcher.add(modules)
    })
  }

})()
