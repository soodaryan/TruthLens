from transformers import AutoTokenizer, AutoModelForSequenceClassification


def initialize_models() :
    model_path = f"cardiffnlp/twitter-roberta-base-sentiment"
    tokenizer = AutoTokenizer.from_pretrained(model_path)
    model = AutoModelForSequenceClassification.from_pretrained(model_path)

    return model, tokenizer

def preprocess (text, tokenizer) : 
   return tokenizer(text, truncation=True, max_length=512, return_tensors="pt")

def get_sentiment (sent, model, tokenizer) : 
    encoded_text = preprocess(sent, tokenizer)
    output = model(**encoded_text)
    scores = output[0][0].detach().numpy()
    sentiments = {
        "NEGATIVE" : scores[0],
        "NEUTRAL" : scores[1],
        "POSITIVE" : scores[2]
    }
    return max(sentiments, key = lambda x : sentiments[x])


if __name__ == "__main__" : 
    model, tokenizer = initialize_models()
    text = "i am very happy."
    print(get_sentiment(text, model, tokenizer))
