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
    savedTabs.push(tab); 
    chrome.storage.local.set({ savedTabs: savedTabs }); 
    updateTabList(); 
    });
});
})

document.getElementById('clearList').addEventListener('click', () => {
    chrome.storage.local.set({ savedTabs: [] }, () => {
        updateTabList(); 
    });
});

updateTabList();