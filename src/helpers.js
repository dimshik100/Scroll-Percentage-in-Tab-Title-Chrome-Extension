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
