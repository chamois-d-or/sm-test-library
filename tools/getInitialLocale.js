// translations/getInitialLocale.ts

export function getInitialLocale() {
  // the language setting of the browser
  const browserSetting = navigator.language.split('-')[0].toLocaleLowerCase()+"-"+navigator.language.split('-')[1].toLocaleLowerCase()
  console.log(browserSetting)
  if (browserSetting) {
    return browserSetting
  }

  return 'en-us'
}