from lib.prompts import hashtag_predictor_prompt
from lib.llms import OpenAI

class SocialMediaTool : 
    def __init__(self) :
        self.openai = OpenAI()
    
    def pre