/*
recieves label text and attempts to decide whether checkbox
should be checked or unchecked, as well as what category the checkbox is
returns an object structured like so:
{
action: ('checked', 'unchecked', 'ignored'),
category: ('marketing', 'terms and conditions', 'unknown')
}
*/
function determineOperation(text){
  // try to determine if the text is opt-out
  var isOptOut = (
    text.includes('do not') ||
    text.includes('don\'t')
  );
  var action = '';
  var category = '';
  if(isMarketingRelated(text)){
    action = 'unchecked';
    category = 'marketing';
    if(isOptOut){
      action = 'checked';
    }
    return {
      action: action,
      category: category
    }
  } else if(isTermsAndConditions(text)) {
    action = 'checked';
    category = 'terms and conditions';
    if(isOptOut){
      action = 'unchecked';
    }
    return {
      action: action,
      category: category
    }
  } else {
    return {
      action: 'ignored',
      category: 'unrelated/unknown'
    }
  }
}

function isTermsAndConditions(text){
  return text.includes('terms') ||
  text.includes('policy') ||
  text.includes('privacy')
}

function isMarketingRelated(text){
  return text.includes('marketing') ||
  text.includes('receive') ||
  text.includes('send me') ||
  text.includes('email') ||
  text.includes('sms') ||
  text.includes('news') ||
  text.includes('updates')
}

setTimeout(() => {
  const operations = []
  // find all inputs of type checkbox on the page
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // for every checkbox on the page
  checkboxes.forEach((checkbox) => {
    // attempt to find text for the checkbox
    let label = null;
    let labelText = '';
    // try finding a label with a 'for' attribute of this checkbox
    if(checkbox.labels.length){
      // great, the html is made properly and the label has the text in it
      labelText = checkbox.labels[0].innerText
    } else {
      // search sibling elements
      label = document.querySelector('label[for="'+checkbox.id+'"]');
      if(label){
        labelText = label.innerText
      }
    }

    const operation = determineOperation(labelText.toLowerCase());

    if(operation.action === 'checked'){
      checkbox.checked = true;
    } else if(operation.action === 'unchecked'){
      checkbox.checked = false;
    }
    operations.push({
      checkboxId: checkbox.id,
      text: labelText,
      action: operation.action,
      category: operation.category
    })
  })

  chrome.runtime.sendMessage({
    operations: operations
  })
}, 2500)
