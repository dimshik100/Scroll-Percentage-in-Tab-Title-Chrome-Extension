"use strict";

console.log("Scroll Percentage in Tab Title Extension loaded 👍");

const originalTitle = document.title;

function findOutMainContentElement() {
  const windowHeight = window.innerHeight;
  const containers = document.querySelectorAll(
    "body,main,*[class~='content'],*[class*='Content'],*[class~='article']:first-child,article:first-child"
  );

  let bestMatchedContainer = {
    ratio: 0,
    elm: null,
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

let {
  elm: mainContainer,
  sizes: mainContainerSizes,
} = findOutMainContentElement();

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
mainContainer.querySelectorAll("p").forEach((elem) => {
  observer.observe(elem);
});
