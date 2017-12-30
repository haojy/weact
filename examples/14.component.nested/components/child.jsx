import { Component, PropTypes } from 'weact'
export default class extends Component {
  static propTypes = {
    b: PropTypes.string,
    a: PropTypes.array,
  }
  static defaultProps = {
    a: {},
    b: 'hi',
  }


  render() {
    return (
      <view>
        子级组件
      </view>
    )

  }
}

