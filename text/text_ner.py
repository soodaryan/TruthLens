from gliner import GLiNER

class NERExtractor:
    def __init__(self, model_name="urchade/gliner_base"):
        """Initialize the NERExtractor with the pre-trained GLiNER model."""
        self.model = GLiNER.from_pretrained(model_name)
        self.labels = [
            "person", "organization", "location", "date", "time", "event",
            "product", "work_of_art", "law", "percent", "money",
            "quantity", "ordinal", "cardinal", "miscellaneous", "technology", "finance", "policy"
        ]

    def extract_entities(self, news_list):
        """Extracts named entities from the provided list of news texts."""
        for news in news_list:
            print(f"\nOriginal News: {news}")
            entities = self.model.predict_entities(news, self.labels)

            # Display the identified entities
            if entities:
                print("Extracted Entities:")
                for entity in entities:
                    print(f"{entity['text']} => {entity['label']}")
            else:
                print("No entities were found in this news.")


if __name__ == "__main__":
    news_list = [
        "Apple is launching a new iPhone next week.",
        "Elon Musk visited the White House yesterday."
    ]

    ner_extractor = NERExtractor()
    ner_extractor.extract_entities(news_list)