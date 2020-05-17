"use strict";

function addScript(src) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(script);
}

const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

  // check if current website is in the supported urls list
  async function checkIfUrlMatches() {
    const storageKey = "scrollPercentageUrls";
    let data = await getStorageData(storageKey);

    const urls = data[storageKey];

    if(!urls) {
      return;
    }

    for (const url of urls) {
      if (window.location.href.includes(url)) {
        addScript("extension.js");
        return;
      }
    }
  }


  checkIfUrlMatches();