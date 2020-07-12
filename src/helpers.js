function getCurrentUrl() {
  return new Promise((resolve, reject) =>
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(tabs[0].url);
    })
  );
}

function formSerialize(formElm) {
  const elements = formElm.elements;
  const obj = {};
  for (let i = 0; i < elements.length; i++) {
    const item = elements.item(i);
    if (!item.name || !(item.checked ?? !item.checked)) continue;
    obj[item.name] = item.value;
  }

  return obj;
}

function extractHostname(url, removeProtocol = true) {
  //find & remove protocol (http, ftp, etc.) and get hostname
  let hostname = removeUselessWords(url, removeProtocol);
  if (removeProtocol) {
    //find & remove port number
    hostname = hostname.split(":")[0];
  }
  //find & remove "?"
  hostname = hostname.split("?")[0];
  // remove last slash
  hostname = hostname.replace(/\/$/g, "");

  return hostname;
}

function removeUselessWords(str, removeProtocol = true) {
  const uselessWordsArray = ["www."];
  removeProtocol && uselessWordsArray.push("http://", "https://", "ftp://");
  const expStr = uselessWordsArray.join("|");

  return str
    .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), "")
    .replace(/\s{2,}/g, "");
}
