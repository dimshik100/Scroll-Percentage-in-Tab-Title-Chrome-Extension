"use strict";

function addScript(src) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(
    script
  );
}

// check if current website is in the supported urls list
async function checkIfUrlMatches() {
  let data = await StorageManager.get(storageKey);

  if (!data?.urls) {
    return;
  }

  for (const url of data.urls) {
    if (window.location.href.includes(url)) {
      addScript("extension.js");
      return;
    }
  }
}

checkIfUrlMatches();
