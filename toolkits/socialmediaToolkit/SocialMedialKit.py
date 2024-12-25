from toolkits.socialmediaToolkit.hashtagPredictor import hashtagPredictor
from lib.llms import OpenAI

class SocialMediaTool : 
    def __init__(self) :
        
        self.openai = OpenAI()
    
    def predict_hashtag(self, query) : 

        """Used to Predict Hashtag based on input information. Returns a list of relevant hastags"""
    
        return hashtagPredictor(query) 
        
