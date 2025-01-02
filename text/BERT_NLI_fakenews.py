# import torch
# from transformers import AutoTokenizer, AutoModelForSequenceClassification

# tokenizer = AutoTokenizer.from_pretrained('xlm-roberta-base')
# model = AutoModelForSequenceClassification.from_pretrained('nam7197/vi-nli-xml-roberta-base')

# premise = "I am going to the store later today."
# hypothesis = "Rahul is a dog."
# label = 2

# inputs = tokenizer(premise, hypothesis, return_tensors='pt')
# model.eval()

# with torch.no_grad():
#     outputs = model(**inputs)
#     probs = torch.nn.functional.softmax(outputs.logits, dim=-1)
#     pred_label = torch.argmax(probs, dim=-1)

#     print(pred_label)