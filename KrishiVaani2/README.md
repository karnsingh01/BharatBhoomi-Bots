# Digital Krishi Officer Prototype (Multi-Language)

## Overview
AI advisory for farmers with multi-language support (English, Hindi, Malayalam, Tamil, Telugu). UI and responses adapt to selected language.

## Installation
1. Clone repo: `git clone https://your-repo/digital-krishi-officer.git`
2. Install deps: `pip install -r requirements.txt`
3. Download IndicBART: Via Hugging Face in app.py.
4. Download sample dataset: PlantDoc from https://github.com/pratikkayal/PlantDoc-Dataset.
5. Run: `streamlit run app.py`

## Usage
- Select language from dropdown (e.g., हिंदी for Hindi).
- UI changes instantly.
- Ask queries in chosen language, e.g., Hindi: "मेरे केले में पत्ती के धब्बे के लिए कौन सा कीटनाशक?"
- Supports text/voice/image inputs.

## Tech Stack
- UI: Streamlit
- LLM: ai4bharat/IndicBART (multilingual Indic)
- Vision: transformers ViT
- RAG: FAISS + langchain
- Indic NLP: indic-nlp-library

## Expanding Languages
Add to translations.py dictionary.

License: MIT