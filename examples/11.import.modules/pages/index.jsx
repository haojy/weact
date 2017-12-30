import { Page } from 'weact'
import postDefault from '../actions/post'
import * as post from '../actions/post'
import { nextPage, default as aliasDefault } from '../actions/post'
export default class extends Page {
  onLoad() {
    nextPage()
    console.log('postDefault', postDefault)
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
