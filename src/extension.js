"use strict";

console.log("Scroll Percentage in Tab Title Extension loaded 👍");

const originalTitle = document.title;

window.addEventListener(
  "scroll",
  () => {
    const windowHeight = document.body.offsetHeight;
    const scrollTop = window.scrollY;
    const containers = document.querySelectorAll(
      "body,main,*[class~='content'],*[class*='Content'],*[class~='article']:first-child,article:first-child"
    );

    let mainContainer = null,
      mainContainerSizes = null;

    for (let x = containers.length - 1; x >= 0; x--) {
      mainContainer = containers[x];
      mainContainerSizes = mainContainer.getBoundingClientRect();
      if (windowHeight / mainContainerSizes.height < 3) {
        break;
      }
    }

    let docHeight =
      scrollTop + mainContainerSizes.top + mainContainerSizes.height;
    let winHeight = window.innerHeight;
    let scrollPercent = scrollTop / (docHeight - winHeight);
    let scrollPercentRounded = Math.min(
      Math.max(Math.round(scrollPercent * 100), 0),
      100
    );
    document.title = `(${scrollPercentRounded}%) ${originalTitle}`;
  },
  { passive: true }
);
