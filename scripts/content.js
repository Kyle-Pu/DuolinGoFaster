(function () {
  const selectEnglishWords = () => {

    const chineseContainer = document.querySelector(
      '#root > div._3W86r._3YKTw > div._3x0ok > div > div._3yOsW._3VXxf > div > di\
    v > div > div > div._1Zh-d._1lDmW.d84Fd > div._2qYLw._3oxW8._2Hg6H > div > \
    div.r37iz > div > div._1KUxv._11rtD > div > span:nth-child(2)'
    );

    // Get all the <span> elements on the webpage
    var spanElements = document.getElementsByTagName('span');

    // Loop through each <span> element and extract the text content
    for (var i = 0; i < spanElements.length; i++) {
      var textInsideSpan = spanElements[i].textContent;

      if (textInsideSpan && !(textInsideSpan in ['Skip', 'Check', '。'])) {
        console.log(textInsideSpan);
      }
    }
  };

  const observeDOMChanges = () => {
    // Observe the DOM changes and call selectEnglishWords when needed
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  };

  // Listen for page changes
  const observer = new MutationObserver(selectEnglishWords);

  // Start observing the DOM changes
  observeDOMChanges();

})();
