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
    model = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{
        "role": "user", "content": f"Given this phrase: {orig_lang_phrase}, what is the most likely English translation given this word bank: {','.join(word_bank)}. Words not in this bank should not be in your output, even if slightly incorrect of a translation. Output the full translation, excluding exclamation marks, question marks, and periods. Don't output anything but the translation.",
        }])
    return {'Answer': model.choices[0].message.content}

# Endpoints
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/orig_lang/{phrase}/{words}")
def ingest_orig_lang_phrase_and_words(phrase: str, words: str):
    '''words should be a period delimited string of all the words in the word bank'''
    return get_translation(phrase, list(set(words.split("."))))
