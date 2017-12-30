import MsgItem from './MsgItem.jsx'
export default class Component extends Component {
  static propTypes = {
    a: PropTypes.string,
    spreadProp: PropTypes.object,
    b: PropTypes.bool
  }
  static defaultProps = {
    spreadProp: {},
    a: 'world',
    b: true,
  }
  state = {
    open: true,
    x: 'hi',
    item: {
      index: 0,
      msg: 'this is a template',
      time: '2016-09-15'
    }
  }
  render() {
    return (
      <view show if={open}>
        <MsgItem {...item} />
        <MsgItem msg="hi component" index={1} time={item.time} />
      </view>
    )
  }
}