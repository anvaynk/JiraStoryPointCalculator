chrome.webNavigation.onHistoryStateUpdated.addListener(function({ tabId }) {
  chrome.tabs.sendMessage(tabId, {action: "calculate_aggregates"});  
}, {
  url: [
    { 
      urlMatches: 'https://wazirx.atlassian.net/*'
    }]
});