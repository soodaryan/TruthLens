# TruthLens

## Overview

TruthLens is a cutting-edge platform designed to combat the spread of misinformation in live broadcasts and digital media. By leveraging state-of-the-art AI technologies, TruthLens validates the authenticity of content in real-time across various media types—text, images, and videos. It aims to provide transparency and ensure the accuracy of information, empowering audiences to distinguish credible sources from misleading narratives.

At the heart of TruthLens is a dual-pipeline system that processes live data, extracts key context, and validates it for accuracy, credibility, and relevance. This two-pronged approach ensures quick and precise detection of falsehoods in dynamic environments.

## Technical Architecture

### 1. **Data Extraction Pipeline**

The Data Extraction Pipeline is responsible for capturing the full context of live data and processing it to extract relevant information for further analysis.

#### Key Components:

- **Visual Analysis**:
  - Utilizes tools like **OpenCV** and **SAMURAI** to analyze visual elements (objects, logos, and graphics).
  - Provides a nuanced understanding of images and videos to detect inconsistencies, such as manipulated visuals or misleading visual context.

- **Text Intelligence**:
  - **Hugging Face Transformers** models process text to detect:
    - **Named Entities**: Identifying key entities like people, places, and organizations.
    - **Sentiment**: Analyzing the tone of the text.
    - **Language Detection**: Recognizing the language of the content.
  - Detects inconsistencies in text, such as an altered image being paired with a misleading caption, in real-time.

- **Deepfake Detection**:
  - AI models analyze audio and video data for signs of manipulation, such as changes in speech or unnatural video frames that may indicate deepfakes.

- **Domain-Specific Insights**:
  - Integrates **APIs** and **scrapers** to gather reliable, context-rich data (e.g., election updates, stock trends) for informed analysis.

### 2. **Validation Pipeline**

The Validation Pipeline ensures the accuracy and credibility of the data extracted from the Data Extraction Pipeline. This stage is where the actual fact-checking takes place.

#### Key Components:

- **Multi-layer Validation**:
  - Cross-checks the extracted data against multiple trusted sources using **redundancy-aware APIs** to verify credibility and accuracy.

- **Knowledge Mapping**:
  - **Neo4j** and **LangGraph**-powered **Knowledge Graph** map relationships between verified sources, reducing fact-checking time and enhancing the overall speed and accuracy of validation.

- **Hashtag Analysis**:
  - Real-time semantic analysis of trending hashtags is conducted to predict their intent and relevance.
  - Flags potential misuse of hashtags or manipulation efforts in social media narratives.

- **Social Media Insights**:
  - **Graph algorithms** analyze social media interaction networks and user behavior to assess the trustworthiness of sources and detect **echo chambers**—where misleading narratives tend to spread among certain groups.

- **Fact-checking Integrations**:
  - Integrates with external fact-checking services such as the **Google Fact Check API** and **Snopes API** to validate claims with pre-verified information from trusted databases.

### Key Tools and Features

- **Hashtag Predictor**:
  - Predicts the intent and context of trending hashtags in real time.
  - Flags hashtags that may be manipulated to spread misinformation or create misleading narratives.

- **Social Media Miner**:
  - Uses **graph algorithms** to analyze interaction networks, assess trustworthiness, and detect echo chambers in social media platforms.
  - Provides a deeper understanding of how false narratives spread through communities.

- **True Source Tool**:
  - Maps relationships between verified sources and information.
  - Dramatically reduces latency in fact-checking, ensuring that information is verified and validated as quickly as possible.
