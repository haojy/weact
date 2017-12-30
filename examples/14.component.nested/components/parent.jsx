import { Component, PropTypes } from 'weact'
import child from './child.jsx'
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
        父级组件
        <child />
      </view>
    )
  }
}

