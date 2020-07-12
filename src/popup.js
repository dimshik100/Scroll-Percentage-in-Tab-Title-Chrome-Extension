const urlsList = document.getElementById("urlsList");
const form = document.getElementById("addUrlForm");
const urlInput = document.getElementById("url");
const resetStorageBtn = document.getElementById("resetStorage");
const useCurrentUrlBtn = document.getElementById("useCurrentUrl");
const settingsForm = document.getElementById("settingsForm");

loadSettings();
refreshUrls();

async function addUrl(event) {
  event.preventDefault();

  const url = urlInput.value;

  // if the input field is empty, don't do anything
  if (!url) {
    return;
  }

  // get latest data from storage
  let data = await StorageManager.get(storageKey);

  const cleanUrl = extractHostname(url);

  // make sure we don't have this url already in the list
  if (data.urls.includes(cleanUrl)) {
    // clear input value
    urlInput.value = "";
    return;
  }

  data.urls.push(cleanUrl);

  await StorageManager.set(storageKey, data);

  // clear input value
  urlInput.value = "";

  refreshUrls();
}

async function removeUrl(url) {
  // get latest data from storage
  let data = await StorageManager.get(storageKey);
  data.urls = data.urls.filter((e) => e !== url);
  await StorageManager.set(storageKey, data);
  refreshUrls();
}

async function refreshUrls() {
  let urlListItemsHtml = "";

  let data = await StorageManager.get(storageKey);
  // if there is no urls in storage, set some default urls
  if (!data?.urls) {
    console.log("refreshUrls -> Setting defaultUrls");
    await StorageManager.set(storageKey, { urls: defaultUrls });
    data = await StorageManager.get(storageKey);
  }

  for (const url of data.urls) {
    urlListItemsHtml += `<li><button class="delete-btn" data-url="${url}">&times;</button> ${url}</li>`;
  }

  urlsList.innerHTML = urlListItemsHtml;
}

async function resetStorage() {
  await StorageManager.clear();
  refreshUrls();
}

form.addEventListener("submit", addUrl, true);
// resetStorageBtn.addEventListener("click", resetStorage);

urlsList.addEventListener("click", (event) => {
  let target = event.target;

  if (!target.classList.contains("delete-btn")) {
    return;
  }

  removeUrl(target.dataset.url);
});

useCurrentUrlBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentUrl = await getCurrentUrl();
  urlInput.value = extractHostname(currentUrl, false);
});

async function saveSettings(event) {
  event.preventDefault();
  const newSettings = formSerialize(this);

  // get latest data from storage
  const currentSettings = await StorageManager.get(storageKey);
  currentSettings.advanced = newSettings;
  await StorageManager.set(storageKey, currentSettings);
}

async function loadSettings() {
  // get latest data from storage
  const currentSettings = await StorageManager.get(storageKey);

  currentSettings.advanced &&
    Object.entries(currentSettings.advanced).forEach(([name, val]) => {
      const settingControllers = settingsForm.querySelectorAll(
        `[name=${name}]`
      );
      if (!settingControllers) return;
      settingControllers.forEach((settingController) => {
        if (settingController?.value && settingController.value === val) {
          settingController.checked = true;
        } else if (settingController?.value) {
          settingController.checked = false;
        } else {
          settingController.value = val;
        }
      });
    });
}

settingsForm.addEventListener("submit", saveSettings, true);
