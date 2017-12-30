import { Page } from 'weact'
import postDefault from '../actions/post'
import * as post from '../actions/post'
import { nextPage, default as aliasDefault } from '../actions/post'

const a = 1
export default class extends Page {
  onLoad() {
    nextPage()
    console.log('post', postDefault)
    console.log('post', post)
    console.log('alias default', aliasDefault)
  }
  handleTap(event) {
    nextPage()
  }
  render() {
    return (
      <view>
        Hello World!
        <button onTap={this.handleTap}>下一页</button>
      </view>
    )
  }
}
