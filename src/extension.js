"use strict";

// check if current website is in the supported urls list
async function startIfNedded() {
  const settings = (window.__ScrollPercentage = await StorageManager.get(
    storageKey
  ));
  if (!settings?.urls) return false;
  for (const url of settings.urls) {
    if (window.location.href.includes(url)) return settings;
  }
  return false;
}

startIfNedded().then((settings) => {
  if (!settings) return;
  console.log("Scroll Percentage in Tab Title Extension loaded 👍");

  const originalTitle = document.title;

  let {
    elm: mainContainer,
    sizes: mainContainerSizes,
  } = findOutMainContentElement(settings);

  let observer = new IntersectionObserver((entries, observer) => {
    const scrollTop = window.scrollY;
    let docHeight = mainContainerSizes.top + mainContainerSizes.height;
    let winHeight = window.innerHeight;
    let scrollPercent =
      scrollTop > docHeight ? 100 : scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.min(
      Math.max(Math.round(scrollPercent * 100), 0),
      100
    );
    document.title = `(${scrollPercentRounded}%) ${originalTitle}`;
  });
  mainContainer.querySelectorAll(":first-child > *, p").forEach((elem) => {
    observer.observe(elem);
  });

  function findOutMainContentElement(settings) {
    if (settings.advanced.calcMethod === "page") {
      console.log("page");
      return {
        ratio: 1,
        elm: document.body,
        sizes: document.body.getBoundingClientRect(),
      };
    }

    const windowHeight = window.innerHeight;
    const containers = document.querySelectorAll(
      "body,main,*[class~='content'],*[class*='Content'],*[class~='article']:first-child,article:first-child"
    );

    let bestMatchedContainer = {
      ratio: 0,
      elm: null,
      sizes: null,
    };

    for (let x = containers.length - 1; x >= 0; x--) {
      const optionalMainContainer = containers[x];
      const optionalMainContainerSizes = optionalMainContainer.getBoundingClientRect();
      const containerRatio = windowHeight / optionalMainContainerSizes.height;

      bestMatchedContainer.ratio <= containerRatio &&
        (bestMatchedContainer = {
          ratio: containerRatio,
          elm: optionalMainContainer,
          sizes: optionalMainContainerSizes,
        });
    }

    return bestMatchedContainer;
  }
});
