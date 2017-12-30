export default function MsgItem({index, msg, time}) {
  return (
    <view>
      <text> {index}: {msg} </text>
      <text> Time: {time} </text>
    </view>    
  )
}
