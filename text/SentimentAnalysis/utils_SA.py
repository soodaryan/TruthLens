from transformers import AutoTokenizer, AutoModelForSequenceClassification

class SentimentAnalyzer:
    def __init__(self, model_path="cardiffnlp/twitter-roberta-base-sentiment"):
        """Initializes the sentiment analyzer with a specific model and tokenizer."""
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)

    def preprocess(self, text):
        """Tokenizes the input text for the model."""
        return self.tokenizer(text, truncation=True, max_length=512, return_tensors="pt")

    def analyze_sentiment(self, text):
        """Analyzes the sentiment of the input text and returns the result."""
        encoded_text = self.preprocess(text)
        output = self.model(**encoded_text)
        scores = output.logits[0].detach().numpy()
        sentiments = {
            "NEGATIVE": scores[0],
            "NEUTRAL": scores[1],
            "POSITIVE": scores[2]
        }
        return max(sentiments, key=lambda x: sentiments[x])

# if __name__ == "__main__":
#     sentiment_analyzer = SentimentAnalyzer()  
#     # Dynamic input for pipeline
#     text_input = "I am very happy."
#     result = sentiment_analyzer.analyze_sentiment(text_input)
#     print(f"Sentiment for the text '{text_input}': {result}")