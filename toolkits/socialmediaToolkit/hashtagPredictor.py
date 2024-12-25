import warnings

# Suppress the specific warning related to LibreSSL
warnings.filterwarnings("ignore")

from lib.llms import OpenAI
from lib.prompts import hashtag_predictor_prompt

def hashtagPredictor(query): 

    """Used to Predict Hashtag based on input information"""
    
    openai = OpenAI()

    prompt = hashtag_predictor_prompt.format(query)

    response = openai.query(prompt)
    
    tag_list = response.split()

    return tag_list


if __name__ == "__main__" : 

    news = """
    Pushpa 2 Sandhya Theatre tragedy: Dil Raju says ‘whole film industry’ will meet CM Revanth Reddy
    Dil Raju, shared that Telangana CM Revanth Reddy has assured that he will act as a bridge between the Telangana Film Development Corporation and the government.
    Dil Raju visited KIMS Hospital in Secunderabad, Hyderabad, to meet Sri Tej's family. Speaking to ANI, he revealed that he had previously met Telangana Chief Minister Revanth Reddy to discuss providing support to Sri Tej's family, ensuring that both the film industry and government would offer all necessary assistance.
    """

    hashtags = hashtagPredictor(news)
    print(hashtags)

    # Sample Output : 
    # [
    #   '#Pushpa2', 
    #   '#SandhyaTheatreTragedy', 
    #   '#DilRaju', 
    #   '#TelanganaCM', 
    #   '#RevanthReddy', 
    #   '#FilmIndustrySupport', 
    #   '#SriTejFamily', 
    #   '#TelanganaFilmDevelopment', 
    #   '#HyderabadNews', 
    #   '#KIMSVisit', 
    #   '#CinemaCommunity', 
    #   '#GovernmentAssistance', 
    #   '#TeluguCinema', 
    #   '#IndustryUnity'
    # ]
