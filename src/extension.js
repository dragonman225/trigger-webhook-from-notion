'use strict'
/** 
 * Any webhook will work, as long as it requires a POST request
 */
const buildHookUrl = 'https://Replace.this.string.with.your.webhook.URL'
const throttleInterval = 300 // ms
const DEBUG_EN = true
const BUTTON_ID = 'trigger-webhook-button'

/** Prepare a button */
const button = document.createElement('DIV')
/** Give the button an id so we can check if it exists later */
button.setAttribute('id', BUTTON_ID)
button.setAttribute('style', 'margin-left: 10px; display: inline-flex')
/**
 * Use a dummy iframe to prevent redirect
 * @see https://stackoverflow.com/a/28060195
 */
button.innerHTML = `\
<iframe width="0" height="0" border="0" name="dummyframe" id="dummyframe" style="display: none;"></iframe>
<form action="${buildHookUrl}" method="post" target="dummyframe">
  <button style="font-size: 14px; color: white; height: 24px; background: rgb(46, 170, 220); border: none; border-radius: 3px;">Trigger Site Update</button>
</form>
`

/**
 * Use MutationObserver API, DOMSubtreeModified event is deprecated.
 * @see https://developer.mozilla.org/zh-TW/docs/Web/API/MutationObserver
 */
const observer = new MutationObserver(function (mutations) {
  /** Try to hook up the button if not exist */
  let toolbar = document.querySelector('div.notion-scroller:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)')
  let btn = document.getElementById(BUTTON_ID)
  /** btn doesn't exists && toolbar exists */
  if (!btn && toolbar) toolbar.appendChild(button)
});
const observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
  subtree: true
}
observer.observe(document, observerConfig)