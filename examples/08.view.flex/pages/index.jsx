import { Page, WXSS } from 'weact';

WXSS`
.flex-wrp{
  margin-top: 60rpx;
  display:flex;
}
.flex-item{
  width: 200rpx;
  height: 300rpx;
  font-size: 26rpx;
}
.flex-item-V{
  margin: 0 auto;
  width: 300rpx;
  height: 200rpx;
}
`

export default class extends Page {
  render() {
    return (
      <view>
        <view class="section">
          <view class="section__title">flex-direction: row</view>
          <view class="flex-wrp" style="flex-direction:row;">
            <view class="flex-item bc_green">1</view>
            <view class="flex-item bc_red">`2</view>
            <view class="flex-item bc_blue">3</view>
          </view>
        </view>
        <view class="section">
          <view class="section__title">flex-direction: column</view>
          <view class="flex-wrp" style="height: 300px;flex-direction:column;">
            <view class="flex-item bc_green">1</view>
            <view class="flex-item bc_red">2</view>
            <view class="flex-item bc_blue">3</view>
          </view>
        </view>
      </view>
    );
  }
}
