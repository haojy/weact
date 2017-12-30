import { App } from 'weact'
import rootReducer from './reducer'
import './pages/index.jsx'

export default class extends App {
  onLaunch() {
    console.log('app: hello world')
    const store = {
      count: 0,
    }
    console.log('store', rootReducer(store))
  }
}
