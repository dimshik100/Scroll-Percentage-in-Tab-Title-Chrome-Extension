console.log("Hello from background.js");

let updatedUrls = [];

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//   const rule = {
//     // That fires when a page's URL contains a url
//     conditions: [
//     ],
//     // And shows the extension's page action.
//     actions: [new chrome.declarativeContent.ShowPageAction()],
//   };

//   // With a new rule ...
//   chrome.declarativeContent.onPageChanged.addRules([rule]);
// });

// function replaceRules(rule) {
//   // Replace all rules ...
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//     // With a new rule ...
//     chrome.declarativeContent.onPageChanged.addRules([rule]);
//   });
// }

// function createShowPageActionRule(urls) {
//   const rule = {
//     // That fires when a page's URL contains a url
//     conditions: [],
//     // And shows the extension's page action.
//     actions: [new chrome.declarativeContent.ShowPageAction()],
//   };

//   for (const url of urls) {
//     const condition = new chrome.declarativeContent.PageStateMatcher({
//       pageUrl: { urlContains: url },
//     });
//     rule.conditions.push(condition);
//   }

//   return rule;
// }

chrome.runtime.onInstalled.addListener(async function () {
  // replaceRules(createShowPageActionRule(defaultUrls));

  // get latest data from storage
  let data = await StorageManager.get(storageKey);
  if (!data?.urls) {
    return;
  }

  updatedUrls = data.urls;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes?.urls) {
    updatedUrls = changes.urls.newValue;
    // replaceRules(createShowPageActionRule(storageChange.newValue));
  }
});

const updateIconState = (state, tabId) => {
  const icons = {
    enabled: {
      "16": "icons/icon_extension_toolbar_16.png",
      "32": "icons/icon_extension_toolbar_32.png",
    },
    disabled: {
      "16": "icons/disabled_icon_extension_toolbar_16.png",
      "32": "icons/disabled_icon_extension_toolbar_32.png",
    },
  };

  const icon = state === "disabled" ? icons.disabled : icons.enabled;
  chrome.browserAction.setIcon({ tabId, path: icon });
};

async function isCurrentUrlMatch() {}

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (tab && !tab.active) {
    return;
  }

  for (const url of updatedUrls) {
    if (tab.url.includes(url)) {
      updateIconState("enabled", tabId);
      return;
    }
  }

  updateIconState("disabled", tabId);
});
