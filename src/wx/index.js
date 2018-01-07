/* global wx*/
import promisify, { promisifyReturns } from '../util/promisify'
const exceptions = `closeSocket
stopRecord
getRecorderManager
pauseVoice
stopVoice
pauseBackgroundAudio
stopBackgroundAudio
getBackgroundAudioManager
createAudioContext
createInnerAudioContext
createVideoContext
createMapContext
canIUse
hideToast
hideLoading
showNavigationBarLoading
hideNavigationBarLoading
navigateBack
createAnimation
pageScrollTo
createSelectorQuery
createCanvasContext
createContext
drawCanvas
stopPullDownRefresh
createSelectorQuery
getExtConfigSync
createCameraContext
createLivePlayerContext
createLivePusherContext`


const promisifiedWxApi = promisify(wx, {
  objectParams: true,
  exclude: [
    /^on/,
    /Sync$/,
    new RegExp(exceptions.split(/\r\n|\r|\n/).join('|'), 'gi'),
  ],
})

promisifiedWxApi.createCameraContext = promisifyReturns(wx.createCameraContext.bind(wx), {
  takePhoto: { objectParams: true },
  startRecord: { objectParams: true },
  stopRecord: { objectParams: true },
})

promisifiedWxApi.createLivePlayerContext = promisifyReturns(wx.createLivePlayerContext.bind(wx), {
  play: { objectParams: true },
  stop: { objectParams: true },
  mute: { objectParams: true },
  requestFullScreen: { objectParams: true },
  exitFullScreen: { objectParams: true },
})

promisifiedWxApi.createLivePusherContext = promisifyReturns(wx.createLivePusherContext.bind(wx), {
  play: { objectParams: true },
  stop: { objectParams: true },
  mute: { objectParams: true },
  requestFullScreen: { objectParams: true },
  exitFullScreen: { objectParams: true },
})

export default promisifiedWxApi