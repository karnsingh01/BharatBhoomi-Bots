from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

# Multilingual samples (add more in respective languages)
SAMPLE_KNOWLEDGE = {
    "en": ["For banana leaf spot, use Chlorothalonil pesticide. Dose: 2g/L water."],
    "hi": ["केले के पत्ते के धब्बे के लिए क्लोरोथालोनिल कीटनाशक का उपयोग करें। डोज: 2g/L पानी।"],
    "ml": ["ബനാന ലീഫ് സ്പോട്ടിന് ക്ലോറോതലോണിൽ പെസ്റ്റിസൈഡ് ഉപയോഗിക്കുക. ഡോസ്: 2g/L വെള്ളം."],
    # Add for ta, te
}

def build_vectorstore(lang_code):
    # Save language-specific knowledge to file
    with open(f"data/agri_knowledge_{lang_code}.txt", "w") as f:
        f.write("\n".join(SAMPLE_KNOWLEDGE.get(lang_code, SAMPLE_KNOWLEDGE["en"])))
    loader = TextLoader(f"data/agri_knowledge_{lang_code}.txt")
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(documents)
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")  # Multilingual embedder
    vectorstore = FAISS.from_documents(texts, embeddings)
    return vectorstore

def retrieve_context(query, vectorstore):
    results = vectorstore.similarity_search(query, k=3)
    return " ".join([doc.page_content for doc in results])