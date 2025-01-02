import warnings

# Suppress the specific warning related to LibreSSL
warnings.filterwarnings("ignore")

from lib.llms import OnDemandOpenAI
from lib.prompts import hashtag_predictor_prompt


class HashtagPredictor:
    def __init__(self):
        self.openai = OnDemandOpenAI()

    def _generate_prompt(self, query):
        """Formats the prompt using the query."""
        return hashtag_predictor_prompt.format(query)

    def predict_hashtags(self, query):
        """Predicts hashtags based on the input query."""
        prompt = self._generate_prompt(query)
        response = self.openai.query(prompt)
        return response.split()


if __name__ == "__main__":
    news = """
    Pushpa 2 Sandhya Theatre tragedy: Dil Raju says 'whole film industry' will meet CM Revanth Reddy
    Dil Raju, shared that Telangana CM Revanth Reddy has assured that he will act as a bridge between the Telangana Film Development Corporation and the government.
    Dil Raju visited KIMS Hospital in Secunderabad, Hyderabad, to meet Sri Tej's family. Speaking to ANI, he revealed that he had previously met Telangana Chief Minister Revanth Reddy to discuss providing support to Sri Tej's family, ensuring that both the film industry and government would offer all necessary assistance.
    """

    predictor = HashtagPredictor()
    hashtags = predictor.predict_hashtags(news)
    print(hashtags)