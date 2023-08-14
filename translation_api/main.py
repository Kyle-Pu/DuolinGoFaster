from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import openai

# Config
app = FastAPI()

# Allow access from anywhere lol
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

openai.api_key_path = '../openai_key.txt'

def get_translation(orig_lang_phrase: str, word_bank: list[str]):
    language = "English"
    model = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=
        [
            {"role": "system", "content": "You are a translation assistant."},
            {"role": "assistant", "content": "You will be given a word bank to construct your translation from. You must not use words that aren't in the word bank. Strictly follow the {language} grammar, like you're writing a university paper. Output the translation excluding exclamation marks, question marks, and periods. Don't output anything but the translation."},
            {"role": "user", "content": f"Given this phrase: {orig_lang_phrase}, what is the most likely {language} translation using only words from this word bank: {','.join(word_bank)}."},
        ])
    return {'Answer': model.choices[0].message.content}

# Endpoints
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/orig_lang/{phrase}/{words}")
def ingest_orig_lang_phrase_and_words(phrase: str, words: str):
    '''words should be a period delimited string of all the words in the word bank'''
    return get_translation(phrase, list(set(words.split("."))))
