import promisify from './promisify'
const promisifiedWxApi = promisify(wx, {objectParams: true})

export default promisifiedWxApi