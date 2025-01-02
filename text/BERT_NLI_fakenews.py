from transformers import pipeline, AutoModelForSequenceClassification, AutoTokenizer
import warnings
warnings.filterwarnings("ignore")

class TextClassifier:
    def __init__(self, model_name: str, tokenizer_name: str):
        self.model = AutoModelForSequenceClassification.from_pretrained(model_name)
        self.tokenizer = AutoTokenizer.from_pretrained(tokenizer_name)
        self.nlp = pipeline("text-classification", model=self.model, tokenizer=self.tokenizer)
    
    def classify(self, text: str, text_pair: str):
        return self.nlp({"text": text, "text_pair": text_pair})

if __name__ == "__main__":
    classifier = TextClassifier(model_name="vishgg/nli-xlm-roberta", tokenizer_name="xlm-roberta-base")
    result = classifier.classify(
        "If you are sad and you know it clap your feet.", 
        "We are sad to announce the demise of Manmohan Singh."
    )
    print(result)