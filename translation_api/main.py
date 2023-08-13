from fastapi import FastAPI
import openai

# Config
app = FastAPI()
openai.api_key_path = '../openai_key.txt'

def get_translation(orig_lang_phrase: str, word_bank: list[str]):
    model = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{
        "role": "user", "content": f"Given this phrase: {orig_lang_phrase}, what is the most likely English translation given this word bank: {','.join(word_bank)}. Output only the translation, excluding exclamation marks, question marks, and periods.",
        }])
    return model.choices[0].message.content

# Endpoints
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/orig_lang/{phrase}/{words}")
def ingest_orig_lang_phrase_and_words(phrase: str, words: str):
    '''words should be a period delimited string of all the words in the word bank'''
    return get_translation(phrase, list(set(words.split(".")))).split()
