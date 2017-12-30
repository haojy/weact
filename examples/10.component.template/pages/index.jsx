import { Page } from 'weact'
import flex from '../components/flex.jsx'


export default class extends Page {
  render() {
    return (
      <view>
        <flex direction="row" />
        <flex direction="column" />
      </view>
    )
  }
}
