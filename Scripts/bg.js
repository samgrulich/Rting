chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab){
  if(changeInfo.url){
    //send message on content load
    chrome.runtime.onConnect.addListener(port => {
      if (port.name === 'bg-content') {
        chrome.tabs.sendMessage(tabID, {url: changeInfo.url}, (response) => {
          console.log(response.farewell);
        });
        port.onMessage.addListener(this.processMessage);
      }
    });
    //open popup
  }
});
