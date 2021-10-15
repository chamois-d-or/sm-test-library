// translations/getInitialLocale.ts

export function getInitialLocale() {
  // preference from the previous session
  const localSetting = localStorage.getItem('locale')
  if (localSetting) {
    const regexp = new RegExp('^[a-z]{2}-[a-z]{2}$');
    if (regexp.test(localSetting)) {
      return localSetting
    }
  }

  // the language setting of the browser
  const browserSetting = navigator.language.split('-')[0].toLocaleLowerCase()+"-"+navigator.language.split('-')[1].toLocaleLowerCase()
  if (browserSetting) {
    return browserSetting
  }

  return 'en-us'
}