const urlsList = document.getElementById("urlsList");
const form = document.getElementById("addUrlForm");
const urlInput = document.getElementById("url");

const storageKey = "scrollPercentageUrls";

chrome.storage.sync.get([storageKey], function (result) {
  console.log("Value currently is " + result.key);
});

// temp urls list
urls = ["asd.com", "asdsadsad.com"];

let urlListItemsHtml = "";

for (const url of urls) {
  urlListItemsHtml += `<li>${url} <button class="delete">Del</button></li>`;
}

urlsList.innerHTML = urlListItemsHtml;

function addUrl(event) {
  console.log("submit -> event", event);
  event.preventDefault();

  const url = urlInput.value;

  if (!url) {
    return;
  }

  urls.push(url);
  
  chrome.storage.sync.set({ storageKey: urls }, function () {
    console.log("Value is set to " + urls);
  });
}

function removeUrl(event) {}

form.addEventListener("submit", addUrl, true);
