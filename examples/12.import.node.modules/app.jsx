import { App } from 'weact'
import './pages/index.jsx'
import { createStore } from 'redux'
import rootReducer from './reducer'

export default class extends App {
  onLaunch() {
    console.log('app: hello world')
    const store = {
      count: 0,
    }
    console.log('store', rootReducer(store))
    createStore(state => state, { value: 1 })
  }
}
