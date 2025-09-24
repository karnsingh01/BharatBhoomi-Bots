import streamlit as st
from transformers import pipeline as hf_pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
import torch
from knowledge_base import build_vectorstore, retrieve_context
from image_analyzer import analyze_image
from translations import get_translation
import os
from indicnlp.tokenize import sentence_tokenize

# Load Multilingual LLM (IndicBART for Indic languages)
@st.cache_resource
def load_llm():
    model_name = "ai4bharat/IndicBART"
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    return hf_pipeline("text2text-generation", model=model, tokenizer=tokenizer, device=0 if torch.cuda.is_available() else -1)

llm_pipeline = load_llm()

# Language Selector
available_languages = {"English": "en", "हिंदी": "hi", "മലയാളം": "ml", "தமிழ்": "ta", "తెలుగు": "te"}  # Expandable
selected_lang = st.selectbox("Choose Language / भाषा चुनें / ഭാഷ തിരഞ്ഞെടുക്കുക", list(available_languages.keys()))
lang_code = available_languages[selected_lang]

# Build vectorstore for selected language
vectorstore = build_vectorstore(lang_code)

# Dynamic System Prompt
SYSTEM_PROMPT = get_translation(lang_code, "system_prompt")

st.title(get_translation(lang_code, "title"))

# User profile
location = st.text_input(get_translation(lang_code, "location_label"), "കേരളം" if lang_code == "ml" else "Kerala" if lang_code == "en" else "केरल")
crop = st.text_input(get_translation(lang_code, "crop_label"), "വാഴ" if lang_code == "ml" else "Banana" if lang_code == "en" else "केला")

# Query input
query_type = st.radio(get_translation(lang_code, "input_type"), (get_translation(lang_code, "text"), get_translation(lang_code, "voice"), get_translation(lang_code, "image")))
if query_type == get_translation(lang_code, "text"):
    user_query = st.text_area(get_translation(lang_code, "query_label"))
elif query_type == get_translation(lang_code, "voice"):
    st.write("Voice Input: Use browser mic.")  # Translate if needed; simulate
    user_query = st.text_area(get_translation(lang_code, "voice_transcript"))
else:  # Image
    uploaded_file = st.file_uploader(get_translation(lang_code, "upload_image"), type=["jpg", "png"])
    if uploaded_file:
        with open("temp.jpg", "wb") as f:
            f.write(uploaded_file.getbuffer())
        advice = analyze_image("temp.jpg")
        # Translate advice (simple; use LLM for complex)
        user_query = advice  # Pass to LLM for language-specific response

if st.button(get_translation(lang_code, "ask_button")):
    if user_query:
        # Tokenize for Indic languages
        if lang_code in ["hi", "ml", "ta", "te"]:
            user_query = " ".join(sentence_tokenize.sentence_split(user_query, lang=lang_code))
        
        full_query = f"Location: {location}. Crop: {crop}. Query: {user_query}"
        rag_context = retrieve_context(full_query, vectorstore)
        prompt = f"{SYSTEM_PROMPT}\nContext: {rag_context}\n{full_query}"
        
        # Generate response
        response = llm_pipeline(prompt, max_length=256, num_return_sequences=1)[0]['generated_text']
        st.write(get_translation(lang_code, "response_label"), response)
        
        # Escalation
        if len(user_query) > 100:
            st.write(get_translation(lang_code, "escalate_msg"))
            with open("escalations.log", "a") as f:
                f.write(f"{user_query}\n")
        
        # Feedback
        feedback = st.radio(get_translation(lang_code, "feedback_label"), (get_translation(lang_code, "yes"), get_translation(lang_code, "no")))
        if feedback:
            with open("feedback.log", "a") as f:
                f.write(f"Query: {user_query} | Feedback: {feedback} | Lang: {lang_code}\n")
            st.write(get_translation(lang_code, "thanks"))

# Clean up
if os.path.exists("temp.jpg"):
    os.remove("temp.jpg")