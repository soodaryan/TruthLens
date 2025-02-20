hashtag_predictor_prompt = """
    Generate a list of relevant, trending, and concise hashtags based on the following piece of news: {}. 
    Ensure the hashtags capture the essence of the news, its key themes, and potential audience interest. 
    Include popular hashtags related to the topic as well as unique ones.
    Only give me the hastags.
"""

input_summary_prompt = """
Extract key details from the provided Transcriptions, Entities, and Text in a structured Markdown format. Identify important points, entities, and claims and combine it into a cohesive summary while ensuring clarity for fact-checking.

Inputs:
Text: {}
Transcriptions: {}
Blog Content: {}
Output:
Provide a single, clear summary integrating insights from all three sources in the following format :
## **Summary**
(A concise summary of the main ideas and themes.)

## **Key Points**
- (Bullet points highlighting the most important information.)
- (Keep it clear and direct.)

## **Entities Mentioned**
- **Person:** (List notable people and their role/context.)
- **Organization:** (Mentioned companies, institutions, or groups.)
- **Event:** (Any significant events referenced.)
- **Other:** (Any additional relevant entities.)

## **Notable Claims & Facts**
- **Claim:** (State the claim or fact)
  - **Context:** (Where it was mentioned)
  - **Supporting Info:** (Any details supporting or opposing it)

## **Additional Notes**
- (Any extra insights or points that need verification.)
"""

# Entities: {}