"use strict";

console.log("Scroll Percentage in Tab Title Extension loaded 👍");

const originalTitle = document.title;

window.addEventListener(
  "scroll",
  () => {
    const scrollTop = window.scrollY;
    const containers = document.querySelectorAll(
      "body,main,*[class*='content'],*[class*='Content']"
    );
    const main_container = containers[containers.length - 1];
    const main_container_sizes = main_container.getBoundingClientRect();
    let docHeight =
      scrollTop + main_container_sizes.top + main_container_sizes.height;
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
