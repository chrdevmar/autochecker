setTimeout(function(){
  var operations = []
  // find all inputs of type checkbox on the page
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // for every checkbox on the page
  checkboxes.forEach(function(checkbox){
    // attempt to find text for the checkbox
    var label = null;
    var labelText = '';
    // try finding a label with a 'for' attribute of this checkbox
    var label = document.querySelector('label[for="'+checkbox.id+'"]');
    if(label){
      var labelText = label.innerText
    }
    if(labelText.includes('agree')){
      checkbox.checked = true;
      operations.push({
        checkbox: checkbox,
        text: labelText,
        action: 'checked'
      });
    }
    console.log('got text for checkbox', checkbox.id, ': ', labelText)
  })
  if(operations.length){
    var numChecked = 0;
    var numUnchecked = 0;
    operations.forEach(function(operation){
      if(operation.action === 'checked'){
        numChecked += 1;
      } else {
        numUnchecked += 1;
      }
    })
    chrome.runtime.sendMessage({
      operations: operations
      // type: 'list',
      // iconUrl: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png',
      // title: 'Spam was blocked!',
      // message: 'Unchecker was able to uncheck '+numUnchecked+' and check '+numChecked+' marketing related checkboxes to prevent you from receving marketing sms and emails.',
      // items: operations.map(function(operation){
      //   return {
      //     title: operation.checkbox.id+' ('+operation.action+')',
      //     message: 'this text was identified as marketing related: '+'"'+operation.text+'". The checkbox has been '+operation.action
      //   }
      // })
    })
  }
}, 2000)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log('GOT A MESSAGE', request)
})
