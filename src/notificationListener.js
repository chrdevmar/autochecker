chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs) => {
    chrome.browserAction.setBadgeText({
      text: request.operations.length.toString(),
      tabId: tabs[0].id
    });
    chrome.storage.sync.set({[sender.url]: request.operations})
    setTimeout(() => {
      chrome.storage.sync.remove(sender.url)
    }, 300000)
  })
})

chrome.browserAction.setPopup({
  popup: 'popup.html'
})
