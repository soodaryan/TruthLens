import cloudinary
import cloudinary.uploader

import os
cloudinary.config(
    cloud_name = "dhl7ozerr",
    api_key = "454558618776768",
    api_secret = "aO0NitclWYcyf0fn0uEmcDZkP3o",
    secure = True
)

response = cloudinary.uploader.upload("images/deepfake.png")
print(response['secure_url'])