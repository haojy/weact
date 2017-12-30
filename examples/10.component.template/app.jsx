import { App } from 'weact'
import './pages/index.jsx'

export default class extends App {
  window = {
    navigationBarTitleText: '你好，小程序',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#f8f8f8',
    backgroundColor: '#efefef',
  }
}