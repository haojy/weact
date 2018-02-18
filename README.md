# weact 用JSX快速开发小程序

[![travis-ci](https://travis-ci.org/haojy/weact.svg?branch=master)](https://travis-ci.org/haojy/weact)
[![Code coverage](https://codecov.io/gh/haojy/weact/branch/master/graph/badge.svg)](https://codecov.io/github/haojy/weact?branch=master")
[![Dependence](https://david-dm.org/haojy/weact/status.svg)](https://david-dm.org/haojy/weact)
[![License](https://img.shields.io/npm/l/weact-cli.svg)](https://github.com/haojy/weact/blob/master/LICENSE)


weact实现了用JSX和ES6/7来开发小程序，你可以在一个jsx文件中编写页面或组件，并把关联的JSX代码和引用包编译成小程序代码，然后在*小程序开发者工具*中调试代码。因为使用了JSX和ES标准语法，你可以轻松地把已有的JSX代码重构成小程序，当然你也可以使用喜欢的语法高亮，语法检查器等工具。

最新版本[![Version](https://img.shields.io/npm/v/weact-cli.svg)](https://github.com/haojy/weact/blob/master/CHANGELOG.md)支持

* JSX，ES6/7标准语法
* 单文件开发小程序模块
* 引用NPM包
* async/await
* Promise化微信小程序/小游戏API
* 导入CSS/Sass/Less样式文件

下个小版本将支持
* 用React方式开发小程序组件

> 安装包*./node_modules/weact-cli/examples/* 有使用weact的例子，也可以从https://github.com/haojy/weact-startup获取例子。
## 快速上手
  - [安装](#安装)
  - [JSX小程序](#jsx小程序)
  - [生成小程序](#生成小程序)
## 教程
  - [从JSX到WXML](#从jsx到wxml)
  - [App.jsx](#appjsx)
  - [Page.jsx](#pagejsx)
  - [导入样式](#importStyle)
  - [模版==函数式Component](#模版函数式component)
  - [组件](#组件)
    - [组件关系](#组件关系)
    - [React组件 (TODO)](#React组件)
  - [引用模块](#引用模块)
  - [Promise和async/await](#promise和asyncawait)
  - [Promise化微信小程序/小游戏API](#promise化微信小程序小游戏api)
  - [命令行用法](#命令行用法)


### 安装
---

在项目里安装*weact-cli*,
```bash
npm install -D weact-cli
npx weact
```

### JSX小程序
---

让我们开始写一个Hello world的小程序，只需要两个文件：app.jsx，index.jsx, 通常页面代码会被放在`./pages`目录下，
```
src/
├── app.jsx
└── pages
    └── index.jsx
```

weact只把app.jsx作为目标文件，也就是说所有需要的页面需要在app.jsx中被import进来。在这个例子中，只有一个页面index可以import。我们还需要继承`weact.App`来声明小程序的app, 这里只export一个空的类，[ App.jsx ](#App.jsx)会详细说明怎么定义app，
```javascript
// src/app.jsx
import { App } from 'weact'
import './pages/index.jsx' // app应用的页面，需要import

export default class extends App {
}
```

和app一样，所有页面要继承`weact.Page`，并被export才可以。与应用不同的是，页面有`render()`方法来定义显示部分，在render方法里返回JSX标签，在语法上这和React Component的render相同。weact会根据render方法里返回的标签，自动编译出WXML文件，[ 从JSX到WXML ](#从JSX到WXML)会说明如何用JSX写出符合WXML定义的标签。`weact.WXSS`利用ES6字符串模版的能力，可以在jsx中声明符合WXSS语法的样式，这样样式就会被weact编译成对应的WXSS文件。

```javascript
// src/pages/index.jsx
import { Page, WXSS } from 'weact'

WXSS`
.hi {
  color: blue;
}
`
export default class extends Page {
  render() {
    return (
      <view class="hi">
        Hello World!
      </view>
    )
  }
}
```

这样，一个基于JSX的小程序就完成了。
> 在[ 实战JSX开发小程序 ](https://github.com/haojy/weact-startup) 中有更多的例子可以参考。

### 生成小程序
---

上面的代码都存放在`./src`目录下，然后执行
```bash
npx weact ./src # 等同于 weact ./src/app.jsx ./dist
```

在当前目录下会生成`./dist`目录，里面全是根据jsx文件编译出的小程序代码，
```
dist/
├── app.js
├── app.json
└── pages
    └── index
        ├── index.js
        ├── index.wxml
        └── index.wxss
```
在*微信开发者工具*添加项目，项目目录设置成`./dist`, 然后就可以在模拟器中看到运行结果了。

### 从JSX到WXML
---

weact可以在语法上把JSX编译成WXML，下面列表给出两种语言的在语法上的对应关系。

语法 | JSX | WXML
----|-----|-----
数据绑定 | `<view>{message}</view>` | `<view> {{ message }} </view>`
属性 | ``<view id={`${prefix}-item}`>hi</view>`` | `<view id="{{prefix}}-item">hi</view>`
关键字 false | `<view checked={false}>hi</view>` | `<view checked="{{false}}">hi</view>`
关键字 | `<view checked>hi</view>` | `<view checked="{{true}}">hi</view>` 
三元运算 | `<view hidden={flag ? true: false}>hi</view>` | `<view hidden="{{flag ? true : false}}">hi</view>`
算数运算 | `<view>{a + b} + {c} + d</view>` | `<view>{{a + b}} + {{c}} + d</view>`
逻辑判断 | `<view if={length > 5}>hi</view>` | `<view wx:if="{{length > 5}}">hi</view>`
字符串运算 | `<view>{"hello " + name}</view>` | `<view>{{"hello " + name}}</view>`
数组 | `<view for={[zero, 1, 2, 3, 4]}>`<br/>&nbsp;&nbsp;`{item}`<br/>`</view>` | `<view wx:for="{{[zero, 1, 2, 3, 4]}}">`<br/>&nbsp;&nbsp;`{{item}}`<br/>` </view>`
对象 | `<view data={{ foo: 0, bar: 1 }}>hi</view>` | `<view data="{{ foo: 0, bar: 1 }}">hi</view>`
数据访问 | `<view>{object.key} {array[0]}</view>` | `<view>{{object.key}} {{array[0]}}</view>`
for 循环 | `<view for={array} key="message">`<br/>&nbsp;&nbsp;`{index}:{item.message}`<br/>`</view>` | `<view wx:for="{{array}}" wx:key="message">`<br/>&nbsp;&nbsp;`{{index}}:{{item.message}}`<br/>`</view>`
if 条件 | `<view if={condition}>hi</view>` | `<view wx:if="{{condition}}">hi</view>`
if else | `<view if={x > 5}>1</view>`<br/>`<view elif={x > 2}>2</view>`<br/>`<view else>3</view>` | `<view wx:if="{{x > 5}}">1</view>`<br/>`<view wx:elif="{{x > 2}}">2</view>`<br/>`<view wx:else>3</view>`
block 条件 | `<block if={true}>`<br/>&nbsp;&nbsp;`<view> 1 </view>`<br/>` </block>` | `<block wx:if="{{true}}">`<br/>&nbsp;&nbsp;`<view> 1 </view>`<br/>` </block>`
block 循环 | `<block for={[1, 2, 3]}>`<br/>&nbsp;&nbsp;`<view>{index}:{item}</view>`<br/>`</block>` | `<block wx:for="{{[1, 2, 3]}}">`<br/>&nbsp;&nbsp;`<view>{{index}}:{{item}}</view>`<br/>`</block>`
事件处理 | `<button bindtap={handleTap}>Next</button>`| `<button bindtap="handleTap">Next</button>`
onXXX == bindxxx  | `<button onTap={this.handleTap}>Next</button>` | `<button bindtap="handleTap">Next</button>`

### App.jsx
---

小程序在json文件中进行全局配置，用JSX把这些配置写成App的类属性，对比参考[ 小程序配置 ](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)。同样，App的[ 生命周期函数，自定义公共变量，自定义公共函数等属性 ](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/app.html)都可以写成类属性。weact把app.jsx编译成对应的app.json，app.js, app.wxss。

```javascript
export default class extends App {

  debug = true

  window = {
    navigationBarTitleText: '你好，小程序',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#f4f5f6',
    backgroundColor: '#f4f5f6',
  }

  tabBar = {
    color: '#333333',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index', // 编译后js路径
        text: '�',
      },
      {
        pagePath: 'pages/page1/page1',
        text: 'Page 1',
      },
    ],
  }

  myData = '自定义公共变量',

  hello() { return '自定义公共函数' }

  // 生命周期函数
  onLaunch() { console.log('app: hello world') }
  onShow() { console.log('app: yes, I am') }
  onHide() { console.log('app: just minutes') }
  onError() { console.log('app: woops') }
}
```

### Page.jsx
---

类似App.jsx，页面的[ 生命周期函数和其他属性 ](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/app-service/page.html)也写成Page的类属性。除此之外，
- Page的`render()`函数定义页面显示，
- 标签使用参考[小程序基础组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
- 组件的事件处理函数在Page中直接定义类函数

```javascript
export default class extends Page {

  data = {
    // 页面数据
  }

  myData = '自定义公共变量',

  handleTap() { console.log('自定义公共函数') }

  // 生命周期函数
  onLoad() { console.log('page index: loading...') }
  onShow() { console.log('page index: yes, I am') }
  onReady() { console.log('page index: I am ready now') }
  onHide() { console.log('page index: just minutes') }
  onUnload() { console.log('page index: bye...') }
  onReachBottom() { console.log('page index: we get to the most bottom') }
  onPullDownRefresh() { console.log('page index: pull down') }
  onPageScroll() { console.log('page index: scrolling...') }
  onShareAppMessage() { console.log('page index: share this') }

  render() {
    return (
      <view>
        Hello World!
        <button onTap={this.handleTap}>下一页</button>
        <navigator url="/pages/page1/page1">跳转到Page 1</navigator>
        <navigator url="/pages/page2/page2">跳转到Page 2</navigator>
      </view>
    )
  }
}

```

### 导入样式

weact支持在JSX文件中直接引用CSS/SASS/SCSS/LESS文件，所有引用的文件会被编译成单个样式文件*app.wxss*。根据具体使用的样式文件类型，安装对应的编译器

样式类型 | 安装包
----------|-------------
*css* | 内置，无需安装
*sass/scss* |`yarn add node-sass --dev`
*less* | `yarn add less --dev`
*stylus* | `yarn add stylus --dev`

比如，
```
import './index.css'
import './page1.scss'du y
import './page2.less'
```
支持在单个文件中引用多个不同样式文件，只要安装好对应的编译器。

### 模版==函数式Component
---

小程序的模版可以理解成，没有状态的函数式Component。weact会把返回JSX标签的函数编译成模版，使用这类组件时，只要确保import的名字和定义的一样就可以。

```javascript
// src/components/flex.jsx
export default function flex({
  direction,
}) {
  return (
    <view>
      <view class="section">
        <view>flex-direction: ${direction}</view>
        <view style={`display:flex;flex-direction:${direction};`}>
          <view class="flex-item bc_green">1</view>
          <view class="flex-item bc_red">2</view>
          <view class="flex-item bc_blue">3</view>
        </view>
      </view>
    </view>
  )
}
```

```javascript

// src/pages/index.jsx
import { Page } from 'weact'
import flex from '../components/flex.jsx'


export default class extends Page {
  render() {
    return (
      <view>
        <flex direction="row" />
        <flex direction="column" />
      </view>
    )
  }
}
```

### 组件
---

用weact自定组件更类似写*react Component*，像Page一样显示声明继承Compnent类就可以。组件的属性可以用`propTypes`和`defaultProps`来定义，分别对应着`properties[...].type`和`properties[...].value`。属性类型由`weact.PropTypes`定义如下

PropTypes | 小程序属性类型
----------|-------------
*string* | *String*
*number* | *Number*
*bool* | *Boolean*
*object* | *Object*
*array* | *Array*

在下面的例子里*a*，*b*就是组件属性。如果你了解*react*，你会比较熟悉这种定义Component的方式。 
另外，自定义的方法和事件响应函数可以直接定义为类属性，weact在编译时把这些函数放在`methods`属性里。

```javascript
import { Component, PropTypes } from 'weact'
export default class extends Component {
  static propTypes = {
    a: PropTypes.string
    b: PropTypes.bool
  }
  static defaultProps = {
    a: 'world',
    b: true,
  }
  state = {
    open: true,
    x: 'hi',
    item: {
      index: 0,
      time: '2016-09-15'
    }
  }

  render() {
    const { a, b } = this.props
    const { open } = this.state
    return (
      <view>
        <view x={b} y="str">hi {a} </view>
        <view for={[1, 2, 3]} > </view>
        <view for={array} for-index="i" for-item="node"> </view>
      </view>
    )
  }
}
```

#### 组件关系

weact会根据父子组件的引用关系，自动编译出`relations`的定义。来看看下面的例子，父组件parent引用了子组件child。

```javascript
// ./parent.jsx
import { Component, PropTypes } from 'weact'
import child from './child.jsx'
export default class extends Component {
  render() {
    return (
      <view>
        父级组件
        <child />
      </view>
    )
  }
}
```

```javascript
// ./child.jsx
import { Component, PropTypes } from 'weact'
export default class extends Component {
  render() {
    return (
      <view>
        子级组件
      </view>
    )

  }
}
```

weact编译后在各自的js文件里自动生成关系定义，而不用手动定义。
```javascript
// ./parent.js
  relations: {
    "../child/child": {
      type: "child"
    }
  },
```
```javascript
// ./child.js
  relations: {
    "../parent/parent": {
      type: "parent"
    }
  },
```

#### React组件

TODO

### 引用模块
---

虽然小程序暂不支持直接引入NPM包，但支持类CommonJS的模块引用。weact在语法上实现ES模块间引用, 用*babel-plugin-transform-modules-commonjs*解析成CommonJS的包；NPM包也会被拷贝到*modules*目录下。*weact*模块并没有代码存在，暂时只为了符合语法。

import方式 | JS/JSX | 小程序
----------|--------|-------
模块间 | `import reducer from './reducer'` | `var _reducer = require("./reducer.js");`
NPM包 | `import redux from 'redux'` | `var _redux = require("modules/redux.js");` 
引用Page | `import './pages/index.jsx'` | *app.json* `{"pages":["pages/index/index"]}`
引用Component | `import Component from '../components/Component.jsx'` | *\*.json*: `{"usingComponents":{"Component":"../../components/Component/Component"}}`
引用Template | `import MsgItem from './MsgItem.jsx'` | *wxml* `<import src="../MsgItem.wxml" />` 

> 引用的NPM包需用npm或yarn安装 

### Promise和async/await
---

weact支持Promise的相关语法，也支持async/await。你可以在App和Page的类方法上使用`async`来定义异步函数，然后就可以在这函数内使用`await`来处理异步或Promise函数。为了方便用`await`方式调用微信小程序API的异步函数，weact内置的模块Promise化了这些接口，具体使用方法参考[ Promise化微信小程序/小游戏API ](#Promise化微信小程序/小游戏API)
```javascript
// in page.jsx
import { wx } from 'weact'  // 引用Promise化的wx接口
export default class extends Page {
  async onLoad() {
    const wait = () => new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve('小程序')
      }, 1000)
    })
    const who = await wait() // 调用自定异步函数
    console.info(who)
    const systemInfo = await wx.getSystemInfo() // 调用Promise化的wx接口
    console.info(systemInfo)
  }
}
```
> async/await最终执行依赖于目标设备的支持

### Promise化微信小程序/小游戏API
---

weact内置了Promise化的微信小程序和小游戏的API, 编译后会引入*weact.js*。Promise化的规则

- 接口含参数`success`和`fail`的API被Promise化，其他参数不变
- `success`对应`Promise.resolve`，`fail`对应`Promise.reject`
- 参数`complete`暂不支持
- 保留已有同步接口（Sync结尾的函数）和监听接口（以on/off开头的函数）


```javascript
import { Page, wx } from 'weact'

export default class extends Page {
  state = {
    storage: 'nothing',
  }
  onLoad() {
    // 原接口 wx.getStorage({ key, success, fail, complete })
    wx.getStorage({ key: 'store' }) 
    .then(rs => {
      this.setState({ storage: rs})
    }, err => {
      this.setState({ storage: err.errMsg})
    })
  }
  render () {
    ...
  }
```
详细API的使用参考
* [小程序API开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
* [小游戏API开发文档](https://mp.weixin.qq.com/debug/wxgame/dev/api/)


### 命令行用法 
---

使用: weact [options] <source> <target>

- source 源码目录路径或app.jsx文件路径
- target 代码生成路径=./dist

options:
* -v, --version               显示版本 
* -h, --help                  显示当前内容 
* -w, --watch                 Watch源码变化，自动更新代码

__例子__:

- 在当前路径./dist目录下生成代码

`weact examples/01.hello.world/`

- 指定代码生成路径

`weact examples/01.hello.world/ ./your_distribution`

- watch模式, 根据源码改动，自动更新生成代码

`weact -w examples/01.hello.world/`
