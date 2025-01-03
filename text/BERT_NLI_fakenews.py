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
        """In a landmark decision, the government has announced sweeping tax reforms, including a 25% reduction in income tax rates for middle-income 
        groups, aiming to provide relief amid rising inflation and boost consumer spending across the nation.""", 
        """Contrary to earlier promises of tax relief, the government has introduced a comprehensive new policy that increases
          income tax rates by 20% for middle-income groups, citing the need to address fiscal deficits and fund critical infrastructure projects."""
    )

    print(result)