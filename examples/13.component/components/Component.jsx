import { Component, PropTypes } from 'weact'
export default class extends Component {
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
    const { spreadProp, b } = this.props
    const { open } = this.state
    return (
      <view>
        <view x={b} y="str">hi {a} </view>
        <view for={[1, 2, 3]} > </view>
        <view for={array} for-index="i" for-item="node"> </view>
      </view>
    )
  }
}