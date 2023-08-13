// Check when the continue button is clicked
function handleElementClick(event) {
  const target = event.target;
  const selector = "#session\\/PlayerFooter > div > div._10vOG > button";
  if (target.matches(selector)) {
    setTimeout(function () {
      getTranslation()
    }, 500);
  }
}

// Attach a click event listener to the document
document.addEventListener("click", handleElementClick);

function getTranslation() {
  const selectEnglishWords = () => {

    const chineseContainer = document.querySelector('#root > div._3W86r._3YKTw > div > div > div._3yOsW._3VXxf > div > div > div > div > div.FZpIH > h1 > span')

    if (chineseContainer) {
      console.log(chineseContainer.textContent)
    }

    if (chineseContainer && chineseContainer.textContent === 'Write this in English') {
      // observer.disconnect();

      // Get all the <span> elements on the webpage
      var spanElements = document.getElementsByTagName('span');

      // Loop through each <span> element and extract the text content
      for (var i = 0; i < spanElements.length; i++) {
        var textInsideSpan = spanElements[i].textContent;

        if (textInsideSpan && !(textInsideSpan in ['Skip', 'Check', '。'])) {
          // console.log(textInsideSpan);
        }
      }

      // observeDOMChanges();
    }

  };
  selectEnglishWords()

  // const observeDOMChanges = () => {
  //   // Observe the DOM changes and call selectEnglishWords when needed
  //   observer.observe(document.body, {
  //     childList: true,
  //     subtree: true,
  //     attributes: false,
  //     characterData: false,
  //   });
  // };

  // // Listen for page changes
  // const observer = new MutationObserver(selectEnglishWords);

  // // Start observing the DOM changes
  // observeDOMChanges();

};
