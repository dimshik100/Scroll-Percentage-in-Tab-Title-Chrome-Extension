"use strict";

function addScript(src) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(src);
  (document.body || document.head || document.documentElement).appendChild(script);
}

// Important to add the script to the DOM only after we registered the event listeners
addScript("extension.js");
