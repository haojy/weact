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
