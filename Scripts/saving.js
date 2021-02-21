window.addEventListener("message", function(event) {
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        const data = event.data.data;
        chrome.storage.local.set({'alldata': data}, () => {});
        /*for(key in data){
            chrome.storage.local.set({key: data[key]}, () => {});
        }*/
    }
});