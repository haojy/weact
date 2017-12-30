import { App } from 'weact'
import './pages/index.jsx'
import './pages/page1.jsx'
import './pages/page2.jsx'

export default class extends App {
  window = {
    navigationBarTitleText: '你好，小程序',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#f4f5f6',
    backgroundColor: '#f4f5f6',
    backgroundTextStyle: 'dark',
  }

  tabBar = {
    color: '#333333',
    selectedColor: '#0095d4',
    borderStyle: 'black',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '🏠',
      },
      {
        pagePath: 'pages/page1/page1',
        text: 'Page 1',
      },
      {
        pagePath: 'pages/page2/page2',
        text: 'Page 2',
      },
    ],
  }
}