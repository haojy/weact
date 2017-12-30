import { App } from 'weact'
import './pages/index.jsx'

export default class extends App {
  debug = true

  window = {
    navigationBarTitleText: '你好，小程序',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#e3e4e5',
    backgroundColor: '#f3f3f3',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true,
    onReachBottomDistance: 50,
  }

  globalData = {
    hasLogin: false,
    openid: null
  }

  onLaunch() {
    console.log('hello world')
  }

  onShow() {
    console.log('yes, I am')
  }

  onHide() {
    console.log('just minutes')
  }

  onError() {
    console.log('woops')
  }
}