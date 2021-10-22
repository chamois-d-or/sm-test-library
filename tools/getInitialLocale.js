// translations/getInitialLocale.ts

export function getInitialLocale(isHomePage) {
  // preference from the previous session
  const localSetting = localStorage.getItem('locale')
  if (localSetting) {
    const regexp = new RegExp('^[a-z]{2}-[a-z]{2}$');
    if (regexp.test(localSetting)) {
      return localSetting
    }
  }

  if(isHomePage){
    // the language setting of the browser
    // const browserSetting = navigator.language.split('-')[0].toLocaleLowerCase()+"-"+navigator.language.split('-')[1].toLocaleLowerCase()
    const browserSetting = navigator.language.toLocaleLowerCase()
    if (browserSetting) {
      const regexp = new RegExp('^[a-z]{2}-[a-z]{2}$');
      if (regexp.test(browserSetting)) {
        if(['en-us', 'fr-fr', 'de-de'].includes('browserSetting')){
          return browserSetting
        }
      }
    }
  }

  return 'en-us'
}