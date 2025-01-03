# 🕵️‍♂️ TruthLens: Focus On Facts, Blur The False 🌐

TruthLens is dedicated to combating the rapid spread of misinformation in live broadcasts and digital media—a challenge that has become increasingly urgent in today’s fast-paced information landscape. With a mission rooted in fostering trust and transparency, TruthLens harnesses cutting-edge AI technologies to validate the authenticity of content in real time.

---

## 🚀 Features
- **Real-Time Verification**: Validate text, images, and videos instantly.
- **Multimodal Detection**: Simultaneously analyze text, images, and videos to detect manipulation using AI.
- **Dynamic Hashtag Context Analysis**: Predict the relevance and intent of trending hashtags using real-time semantic analysis 🔖.
- **Profile Behavior Scoring**: Assess social media profiles based on historical behavior for credibility scoring 📊.
- **Dual-Pipeline Architecture**:
  - **Data Extraction Pipeline**: Processes live data for context using visual analysis, sentiment detection, and more.
  - **Validation Pipeline**: Ensures credibility via redundancy-aware APIs, knowledge graphs, and fact-checking tools.

---

## 📈 Achievements
- **Finetuned NLI Model**: Achieved 94% accuracy in identifying contradictions, entailments, and neutral views by fine-tuning xlm-RoBERTa model.
- **Speech-to-Text**: Achieved 96%+ accuracy using Google Speech Recognition API.
- **Deepfake Detection**: Models achieved an 89% accuracy rate in detecting manipulated content.
- **Sentiment Analysis**: State-of-the-art results with 96% accuracy using a finetuned twitter-RoBERTa model.
- **Named Entity Recognition**: Levereaged GLiNER (Generalist and Lightweight Model for Named Entity Recognition) for accurate NER over news reports.

---

## 🛠️ Tech Stack
- **Programming Languages**: Python (Backend), HTML/CSS/JS with Tailwind (Frontend)
- **Libraries and Frameworks**: 
  - TensorFlow, PyTorch for AI/ML
  - OpenCV, PIL, OCR.space, Google Lens for image processing
  - Hugging Face Transformers, NLTK, SpaCy for NLP tasks
- **Databases**: MongoDB (data storage), Neo4j (Knowledge Graph mapping)
- **Cloud Platforms**: Google Cloud Platform (storage and APIs), Firebase (authentication)
- **APIs**: SightEngine (Deepfake detection), Google Fact Check Tools API

---

## 🌟 Key Tools and Modules
- **Web-Based Toolkit**:
  - Scrapes and validates data from news websites and live platforms.
  - Implements tools like article scrapers and tweet scrapers for context-rich verification.
- **Social Media Toolkit**:
  - Analyzes interaction networks for credibility assessment.
  - Predicts trending hashtags and validates social media content in real time.
- **True Source Tool**:
  - Maps relationships between trusted sources using a knowledge graph.

---

## 🌐 Future Developments
- **Jan-Jan Satya**: A B2G initiative empowering citizens to report and verify local news with geotagged content.
- **Expanded Multilingual Support**: Address misinformation across diverse regions globally.
- **Optimization**: Minimize external LLM API calls and resource dependencies to enhance scalability.

---

## 🎯 Dashboard Features
- User and broadcaster-friendly interface for verifying articles and news sources.
- Provides real-time statistics on verified news, flagged reports, and geotagged inputs from the community.
- Promotes transparency and competition among broadcasters.

---

## 💻 Installation Guide
1. Clone the repository:
   ```bash
   git clone https://github.com/soodaryan/TruthLens.git
   ```
2. Navigate to the directory:
   ```bash
   cd TruthLens
   ```
3. Set Up a Virtual Environment
   It is recommended to create a virtual environment to manage dependencies. Run the following commands to set it up:
   For Linux/macOS:
   ```bash
       python3 -m venv venv
       source venv/bin/activate
   ```
   For Windows:
   ```bash
       python3 -m venv venv
       venv/bin/activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the backend:
   ```bash
   python backend/main.py
   ```
6. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

---

## 🎯 Run Specific Functionalities

If you want to check out some specific functionalities, you can directly execute files from the following directories:
1. Run text-based functionalities (e.g., Fake News Detection)
```bash
    python text/fake_news_detection.py
   ```

2. Run audio-based functionalities (e.g., Speech to Text or Sentiment Analysis)
```bash
    python audio/SpeechToText/AudioProcessor.py
    python audio/AudioSentimentAnalysis.py
   ```

3. Run image-based functionalities (e.g., Deepfake Detection or OCR)
```bash
    python images/deepfake_detection.py
    python images/OCR.py
   ```

---

## 🙌 Contributing
We welcome contributions! Feel free to submit issues or pull requests. For major changes, please discuss them in an issue first. Let’s work together to make TruthLens even better! 💪

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 🔗 Useful Links
- **GitHub Repository**: [TruthLens Repository](https://github.com/soodaryan/TruthLens)
- **Demo Video**: [TruthLens Demo](https://www.youtube.com/watch?v=4E97q1Qvh7k)
- **Acknowledgments**:
  - [Hugging Face Models](https://huggingface.co/)
  - [SightEngine API](https://sightengine.com/)
  - [Google Speech Recognition API](https://cloud.google.com/speech-to-text)

---

## 👥 Team
- **Ishan Chugh**: Backend and Deployment Lead ([LinkedIn](https://www.linkedin.com/in/ishanchugh01/))
- **Hemant Verma**: Frontend and AI Lead ([LinkedIn](https://www.linkedin.com/in/hemantverma06/))
- **Aryan Sood**: Design and GenAI Lead ([LinkedIn](https://www.linkedin.com/in/soodaryan/))
- **Hemang Jain**: Data and Frontend Lead ([LinkedIn](https://www.linkedin.com/in/jain-hemang/))
- **Vishrut Grover**: Design and ML Lead ([LinkedIn](https://www.linkedin.com/in/vishrutgrover/))

---

