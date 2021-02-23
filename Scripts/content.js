const API_URL = 'https://rting.herokuapp.com/';
// const API_URL = 'http://localhost:5501/';
const port = chrome.runtime.connect({name: 'bg-content'});

//POPUPS
document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';

var iframe = document.createElement('iframe');
iframe.id = 'div-text';
iframe.style = `
    background-color: white; 
    position: absolute; 
    width: 10%;
    height: 7vw;
   top: 10%;
    right: 3%;
    min-width: 100px;
    min-height: 80px;
    max-width: 150px;
    max-height: 120px;
    margin-top: 0%; 
    margin-left: 0%;
    border: 0 solid black;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 1px rgb(177, 177, 177);
    z-index: 999;`;
  
//MESSAGIGNG -w BG
chrome.extension.onMessage.addListener(async (request, sender, sendResponse) => {
    const url = request.url.replaceAll('http://', '').replaceAll('https://', '').replaceAll('/', '%').replaceAll(':', '%1');
    iframe.src = `${API_URL}?url=${url}`;
    
    const popup = await document.body.appendChild( iframe );
    
    popup.onload = () => {
        chrome.storage.local.get(['alldata'], (data) => {
            popup.contentWindow.postMessage(data, '*');
        })
    };
    
    sendResponse({farewell: "goodbye"});
});

/* /w iframe */

/* /w popup*/
chrome.runtime.onMessage.addListener(message => {
    if(message.type == "popup-set") {
        bool = message.bool;
        if(bool){
            iframe.style.display = 'none';
        } else {
            iframe.style.display = '';
        }
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.type == 'popup-get'){
        sendResponse((iframe.style.display == 'none') ? true : false)
    }
});
