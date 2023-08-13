function createCheatButton() {
  // Create the button element
  const button = document.createElement("button");
  button.textContent = "Cheat";
  button.style.backgroundColor = "blue";
  button.style.color = "white";
  button.style.position = "fixed";
  button.style.bottom = "35px";
  button.style.left = "50%";
  button.style.transform = "translateX(-50%)";
  button.style.padding = "10px 20px";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";
  button.style.zIndex = "9999"; // Ensure the button is on top of other elements

  // Add a click event listener to the button
  button.addEventListener("click", () => {
    getTranslation()
  });

  // Append the button to the document body
  document.body.appendChild(button);
}

// Call the function to create the cheat button
createCheatButton();

let selectAnswer = (data) => {
  const words = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(' ')
  const spanElements = document.querySelectorAll('button');
  
  for (var i = 0; i < words.length; i++) {
    for (const span of spanElements) {
      if (span.textContent.trim() === words[i]) {
        span.click();
        break; // Stop searching after clicking the first matching span
      }
    }
  }
}

function fetchData(origLang, wordBank) {
  const apiUrl = `http://localhost:8000/orig_lang/${origLang}/${wordBank}`;

  // Make a GET request using the Fetch API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Handle the API response data here
      console.log(data);
      selectAnswer(data['Answer']);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}

let wordBank = new Set();

// Check when the continue button is clicked
function handleElementClick(event) {
  const target = event.target;
  const selector = "#session\\/PlayerFooter > div > div._10vOG > button";
  if (target.matches(selector)) {
    // setTimeout(() => getTranslation(), 500)
    console.log("next")
  }
}

// Attach a click event listener to the document
document.addEventListener("click", handleElementClick);

function getTranslation() {
  const selectEnglishWords = () => {

    const prompt = document.querySelector('#root > div._3W86r._3YKTw > div > div > div._3yOsW._3VXxf > div > div > div > div > div.FZpIH > h1 > span')

    if (prompt) {
      console.log(prompt.textContent)
    }

    if (prompt && prompt.textContent === 'Write this in English') {
      // observer.disconnect();
      chineseSentence = document.querySelector('#root > div._3W86r._3YKTw > div > div > div._3yOsW._3VXxf > div > div > div > div > div._1Zh-d._1lDmW.d84Fd > div._2qYLw._3oxW8._2Hg6H > div > div.r37iz > div > div._1KUxv._11rtD > div > span:nth-child(2)').textContent

      // Get all the <span> elements in the word bank
      var spanElements = document.querySelector('#root > div._3W86r._3YKTw > div > div > div._3yOsW._3VXxf > div > div > div > div > div._1Zh-d._1lDmW.d84Fd > div._3GhCe._1zSeg._qg8x > div > div > div._3Lqi- > div').getElementsByTagName('span');

      // Loop through each <span> element and extract the text content
      for (var i = 0; i < spanElements.length; i++) {
        var textInsideSpan = spanElements[i].textContent;

        if (textInsideSpan && !(textInsideSpan in ['Skip', 'Check', '。'])) {
          wordBank.add(textInsideSpan);
        }
      }

      wordBankString = Array.from(wordBank).join('.')
      wordBank = new Set();
      console.log(chineseSentence, wordBankString)
      fetchData(chineseSentence, wordBankString)

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
