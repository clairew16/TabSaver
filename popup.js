function updateTabList() {
    chrome.storage.local.get(['savedTabs'], (result) => {
      const savedTabs = result.savedTabs || [];
      const tabList = document.getElementById('tabList');
      tabList.innerHTML = ''; 
      savedTabs.forEach((tab) => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = tab.url;
        link.textContent = tab.title;
        link.onclick = () => switchToTab(tab.tabId); 

        listItem.appendChild(link);
        tabList.appendChild(listItem);
      });
    });
}
  
document.getElementById('saveTab').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0]; 
        chrome.storage.local.get(['savedTabs'], (result) => { 
        let savedTabs = result.savedTabs || [];
        const tabData = {
            url: tab.url,
            title: tab.title,
            tabId: tab.id
        }
        savedTabs.push(tabData); 
        chrome.storage.local.set({ savedTabs: savedTabs }); 
        updateTabList(); 
        });
    });
})

document.getElementById('addAll').addEventListener('click', () => {
    chrome.tabs.query({}, (tabs) => {

        const allTabData = tabs.map(tab => ({ 
        url: tab.url, 
        title: tab.title, 
        id: tab.id 
        }));

        chrome.storage.local.set({ savedTabs: allTabData });
        updateTabList();
    });
})

document.getElementById('clearList').addEventListener('click', () => {
    chrome.storage.local.set({ savedTabs: [] }, () => {
        updateTabList(); 
    });
});

function switchToTab(tabId) {
    chrome.tabs.update(tabId, { active: true });
}

updateTabList();