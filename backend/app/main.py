<<<<<<< HEAD
from fastapi import FastAPI, UploadFile, File, Form
import time
from app.services.parser import extract_text_from_pdf, split_into_chunks
from app.services.chain import split_summaries, prepare_final_summary
from app.services.closest import return_closest_indices
from app.services.translator import translate_text
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/summarize")
async def process_pdf(file: UploadFile = File(...), language:str = Form(...)):
=======
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import os
from services.parser import extract_text_from_pdf, split_into_chunks
from services.chain import split_summaries, prepare_final_summary
from services.closest import return_closest_indices
from services.translator import translate_text

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/health")
def heath():
    return jsonify({"Status": "Good"})

@app.route('/summarize', methods=['POST'])
def process_pdf():
    print("Runnning well...")
    if 'file' not in request.files or 'language' not in request.form:
        return jsonify({"error": "Missing file or language"}), 400

    file = request.files['file']
    language = request.form['language']
    print("1. File uploaded...")
>>>>>>> 20d39cb1dd08c6d22eaf94805a2bbb79e3e659e0
    c = time.time()
    contents = extract_text_from_pdf(file)
    print("2. Content extracted...")
    chunks = split_into_chunks(contents)
    print("3. Splitted into chunks...")
    selected_indices = return_closest_indices(chunks)
    print("4. Selected indices")
    summaries = split_summaries(selected_indices, chunks)
    print("5. Summaries splitted")
    result = prepare_final_summary(summaries)
    print("6. Final processing")
    result = result["output_text"]
    result = translate_text(result, language)
<<<<<<< HEAD
    result = str(result)
    ans = time.time() - c
    return {"Summary": result, "Done in: ": ans}

# app = ASGIApp(app)
=======
    print("7. Translated text to: ", language)
    result = str(result)
    ans = time.time() - c

    return jsonify({"Summary": result, "Done in": ans})

if __name__ == '__main__':
    app.run(host=os.getenv('HOST', '0.0.0.0'), port=int(os.getenv('PORT', 10000)))
# host=os.getenv('HOST', '0.0.0.0'), port=int(os.getenv('PORT', 8080)),
>>>>>>> 20d39cb1dd08c6d22eaf94805a2bbb79e3e659e0
