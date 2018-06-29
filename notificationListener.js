chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.browserAction.setBadgeText({text: request.operations.length.toString()})
  chrome.storage.sync.set({'operations': request.operations})
})

chrome.browserAction.setPopup({
  popup: 'popup.html'
})

// chrome.browserAction.onClicked.addListener(function(tab){
//   chrome.storage.sync.get(['operations'], function(data){
//     console.log('GOT THE DATA:', data);
//   })
// })
