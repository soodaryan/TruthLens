from huggingface_hub import InferenceClient
client = InferenceClient("black-forest-labs/FLUX.1-dev", token="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")

# output is a PIL.Image object
image = client.text_to_image("Astronaut riding a horse")
image.show()