const urlsList = document.getElementById("urlsList");
const form = document.getElementById("addUrlForm");
const urlInput = document.getElementById("url");
const resetStorageBtn = document.getElementById("resetStorage");

const storageKey = "scrollPercentageUrls";
const defaultUrls = ["medium.com", "dev.to"];

const getStorageData = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  );

const setStorageData = (data) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );

const clearStorageData = () =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.clear(() =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  );

refreshUrls();

async function addUrl(event) {
  console.log("submit -> event", event);
  event.preventDefault();

  const url = urlInput.value;

  // if the input field is empty, don't do anything
  if (!url) {
    return;
  }

  // get latest data from storage
  let data = await getStorageData(storageKey);
  // console.log("addUrl -> data", data);

  const urls = data[storageKey];

  // create a local anchor element to leverage javascript location API
  const link = document.createElement("a");
  link.href = url;
  const cleanUrl = removeUselessWords(link.origin);

  // make sure we don't have this url already in the list
  if (urls.includes(cleanUrl)) {
    // clear input value
    urlInput.value = "";
    return;
  }

  urls.push(cleanUrl);

  await setStorageData({ scrollPercentageUrls: urls });

  // clear input value
  urlInput.value = "";

  refreshUrls();
}

function removeUselessWords(str) {
  var uselessWordsArray = ["http://", "https://", "www."];

  var expStr = uselessWordsArray.join("|");
  return str
    .replace(new RegExp("\\b(" + expStr + ")\\b", "gi"), "")
    .replace(/\s{2,}/g, "");
}

async function removeUrl(url) {
  // get latest data from storage
  let data = await getStorageData(storageKey);
  // console.log("removeUrl -> data", data);

  const currentUrls = data[storageKey];

  const urls = currentUrls.filter((e) => e !== url);

  await setStorageData({ scrollPercentageUrls: urls });

  refreshUrls();
}

async function refreshUrls() {
  let urlListItemsHtml = "";

  let data = await getStorageData(storageKey);
  console.log("refreshUrls -> data", data);

  // if there is no urls in storage, set some default urls
  if (!data[storageKey]) {
    console.log("refreshUrls -> Setting defaultUrls");
    await setStorageData({ scrollPercentageUrls: defaultUrls });
    data = await getStorageData(storageKey);
  }

  console.log("refreshUrls -> data", data);
  const urls = data[storageKey];

  for (const url of urls) {
    urlListItemsHtml += `<li>${url} <button class="delete-btn" data-url="${url}">Del</button></li>`;
  }

  urlsList.innerHTML = urlListItemsHtml;
}

async function resetStorage() {
  await clearStorageData();
  refreshUrls();
}

form.addEventListener("submit", addUrl, true);
resetStorageBtn.addEventListener("click", resetStorage);

urlsList.addEventListener("click", (event) => {
  let target = event.target;

  if (!target.classList.contains("delete-btn")) {
    return;
  }

  removeUrl(target.dataset.url);
});
