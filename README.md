# Duolingo Word Bank Cheater

I love Duolingo, but the word bank system is massively annoying. Once I know the translation, I don't want to waste my time finding the right words to click, and you probably don't either!

The Duolingo Word Bank Cheater is a FastAPI app with endpoints exposed through `localhost`. A Chrome extension frontend adds a button to Duolingo that sends question data to the app, which then uses GPT-3.5 to translate. The frontend then selects the right words for you!

Note: currently only supports translation to English, although the prompt in `translation_api/main.py` can easily be modified to support any desired language.

## Installation

Before proceeding, paste your OpenAI API key into a file named `openai_key.txt` in the project root directory. Note you may need to set up billing for API access. Costs incurred by using this application are your fault, not mine!

```
pip install fastapi
pip install --upgrade openai
pip install uvicorn # to run local server
```

Navigate to `translation_api` and run `uvicorn main:app --reload`. Note the port number used for the server. You may need to update `manifest.json` in `scripts/` accordingly (within `permissions` and `web-accessible-resources`).

Navigate to `chrome://extensions` in Google Chrome, click `Load unpacked`, and select `scripts/`.

- You may get an error regarding `Permission 'http://localhost:<PORT_NUMBER>/*' is unknown or URL pattern is malformed.` This is a-ok

Ready to go!

## Debugging Notes

Sometimes the timing doesn't work out and the question detection doesn't detect it's the right type of question, which is why there's a physical button now that triggers the process. Just makes a better user experience.
