function getCurrentUrl() {
  return new Promise((resolve, reject) =>
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(tabs[0].url);
    })
  );
}
