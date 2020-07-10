const storageKey = "scrollPercentageExtension";
const defaultUrls = ["medium.com", "dev.to"];

const StorageManager = {
  get: (key) =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.get(key, (result) =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve(result[key])
      )
    ),

  set: (key, data) =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.set({ [key]: data }, () =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve()
      )
    ),

  clear: () =>
    new Promise((resolve, reject) =>
      chrome.storage.sync.clear(() =>
        chrome.runtime.lastError
          ? reject(Error(chrome.runtime.lastError.message))
          : resolve()
      )
    ),
};
