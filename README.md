
# Scroll Percentage in Tab Title Chrome Extension

Chrome extension that updates the page title with the scrolled percentage of the page. Best for blogs and articles. Always see your reading progress, how much you have read and how much is left.

## Try it
TODO: Add link from google chrome store

### Demo Video

<a href="https://www.youtube.com/watch?v=4x18QXkK5Ko"><img src="./assets/youtube screenshot.png" alt="Scroll Percentage in Tab Title Chrome Extension"/></a>

### Screenshots

<img src="./assets/screenshot 1.png" alt="Scroll Percentage in Tab Title Chrome Extension screenshot" />
<img src="./assets/screenshot 2.png" alt="Scroll Percentage in Tab Title Chrome Extension screenshot" />

## For developers

First get the code and build it:

```
# get the code
`git clone https://github.com/dimshik100/Scroll-Percentage-in-Tab-Title-Chrome-Extension`

# get dependencies and build
npm install
npm run build
```

Now ensure the code loads and works:

* [Load the "dist" folder containing the extension](https://developer.chrome.com/extensions/getstarted) (or `manifest.json`) in
your browser.

    1. Open the Extension Management page by navigating to chrome://extensions.
        The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
    2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
    3. Click the LOAD UNPACKED button and select the extension directory (dist folder).
![alt text](https://developer.chrome.com/static/images/get_started/load_extension.png)

    4. Ta-da! The extension has been successfully installed.

* Load `medium.com` or `dev.to` in your browser and open the developer console.

You should be greeted by a message saying the following

```
Scroll Percentage in Tab Title Extension loaded 👍
```

If that works, you should now be ready to customize the
extension-code. Do this by editing `extension.js`.

Cheers!

## TODO

- [x] Add the option to add/remove supported urls in popup

- [x] Change toolbar icon to disabled/enabled in the active tab according to url

- [ ] Highlight url in popup if matches current tab
