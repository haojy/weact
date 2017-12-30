import { Page } from 'weact'

export default class extends Page {
  onLoad() {
      console.log('page 1: loading...')
  }

  onShow() {
      console.log('page 1: yes, I am')
  }

  onReady() {
      console.log('page 1: I am ready now')
  }

  onHide() {
      console.log('page 1: just minutes')
  }

  onUnload() {
      console.log('page 1: bye...')
  }

  onReachBottom() {
      console.log('page 1: we get to the most bottom')
  }

  onPullDownRefresh() {
      console.log('page 1: pull down')
  }

  onPageScroll() {
      console.log('page 1: scrolling...')
  }

  onShareAppMessage() {
      console.log('page 1: share this')
  }
  render() {
    return (
      <view>
        Page 1 
      </view>
    )
  }
}
