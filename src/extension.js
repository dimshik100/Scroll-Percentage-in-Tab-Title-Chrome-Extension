"use strict";

console.log("Scroll Percentage in Tab Title Extension loaded 👍");

const originalTitle = document.title;

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY;
  let docHeight = document.body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);
  document.title = `(${scrollPercentRounded}%) ${originalTitle}`;
}, { passive: true });
