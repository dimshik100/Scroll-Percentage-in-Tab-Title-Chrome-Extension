const rule2 = {
  // That fires when a page's URL contains a 'medium.com' ...
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlContains: 'medium.com' },
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlContains: 'dev.to' },
    })
  ],
  // And shows the extension's page action.
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function () {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([rule2]);
  });
});