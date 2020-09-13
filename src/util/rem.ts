let deviceWidth
const setHtmlFontSize = (): void => {
    // 1000是设计稿的宽度，当大于1000时采用1000宽度，比例也是除以62.5
    // deviceWidth = document.documentElement.clientWidth
    deviceWidth = document.documentElement.clientWidth > 1000 ? 1000 : document.documentElement.clientWidth
    // deviceWidth = document.documentElement.clientWidth > 1500 ? 1500 : document.documentElement.clientWidth
    // document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 93.75 + 'px !important'
    document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 62.5 + 'px !important'
}
if (window.addEventListener) {
  window.addEventListener('resize', () => {
      setHtmlFontSize()
  }, false)
}
setHtmlFontSize()

