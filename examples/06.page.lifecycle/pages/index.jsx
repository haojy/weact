import { Page } from 'weact'

export default class extends Page {
  onLoad() {
      console.log('page index: loading...')
  }

  onShow() {
      console.log('page index: yes, I am')
  }

  onReady() {
      console.log('page index: I am ready now')
  }

  onHide() {
      console.log('page index: just minutes')
  }

  onUnload() {
      console.log('page index: bye...')
  }

  onReachBottom() {
      console.log('page index: we get to the most bottom')
  }

  onPullDownRefresh() {
      console.log('page index: pull down')
  }

  onPageScroll() {
      console.log('page index: scrolling...')
  }

  onShareAppMessage() {
      console.log('page index: share this')
  }

  render() {
    return (
      <view>
        Hello World!
      </view>
    )
  }
}
