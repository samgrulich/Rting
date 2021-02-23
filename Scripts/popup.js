const activeTab = {active: true, currentWindow: true};

chrome.tabs.query(activeTab, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"popup-get"}, function(response){
        var bool = response;
        Toggle(bool);
        document.getElementById('toggle').onclick = ('click', () => {
            bool = !bool;
            Toggle(bool);
            
            chrome.tabs.query(activeTab, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {type:"popup-set", bool:bool}, function(response){});
            });
        });
    });
});

function Toggle(toggle, button = document.getElementById('toggle')) {
    if(toggle){
        button.style.filter = 'opacity(5%)';
    } else {
        button.style.filter = null;
    }
}
