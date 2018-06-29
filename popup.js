function generateHeader(operations){
  var container = document.getElementById('autochecker-results');
  var headerElement = document.createElement('h3');
  var headerText = document.createTextNode(operations.length+' checkboxes detected on this page.');
  headerElement.appendChild(headerText)
  headerElement.appendChild(document.createElement('hr'))
  container.appendChild(headerElement)
}

function generateCheckboxInfo(operations){
  var container = document.getElementById('autochecker-results');
  if(operations.length){
    operations.forEach(function(operation){
      // create title for checkbox
      var titleElement = document.createElement('h4');
      var titleText = document.createTextNode(operation.checkboxId+' ('+operation.action+' by auto-checker)');
      titleElement.appendChild(titleText);
      container.appendChild(titleElement);
      // create info for checkbox
      var labelTextElement = document.createElement('p');
      // add an italics element for displaying the label text of the checkbox
      var italicsElement = document.createElement('i');
      var labelText = document.createTextNode('"'+operation.text+'"');
      italicsElement.appendChild(labelText);
      labelTextElement.appendChild(italicsElement);
      container.appendChild(labelTextElement);
      // now add the message from auto-checker
      var infoElement = document.createElement('p');
      var infoText = document.createTextNode('this text was identified as '+operation.category+'. The checkbox has been '+operation.action);
      infoElement.appendChild(infoText)
      container.appendChild(infoElement);
      container.appendChild(document.createElement('hr'))
    })
  } else {
    var infoContainer = document.createElement('p');
    var infoText = document.createTextNode('Either there were no checkboxes on this page, or auto-checker was unable to identify them.')
    infoContainer.appendChild(infoText);
    container.appendChild(infoContainer);
  }
}

chrome.storage.sync.get(['operations'], function(data){
  generateHeader(data.operations);
  generateCheckboxInfo(data.operations);
})
