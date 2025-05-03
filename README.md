# Mental HealthCare ChatBot

A conversational AI chatbot designed to provide mental health support using Natural Language Processing (NLP) techniques. This project aims to assist users by recognizing mental health concerns and offering empathetic responses.

## Project Structure

- `Python-Mental-Health-Chatbot-main/`: Main directory containing the chatbot implementation.
- `chatbot-model.h5`: Pre-trained model for intent classification.
- `data.pickle`: Serialized data objects used by the chatbot.

## Technologies Used

- **Python**: Core programming language.
- **TensorFlow/Keras**: For building and training the neural network model.
- **Natural Language Toolkit (NLTK)**: For text preprocessing.
- **Pickle**: For object serialization.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Python 3.x
- pip (Python package installer)

### Installation

1. **Clone the repository:**
   - git clone https://github.com/Sowmiyahub/Mental_HealthCare_ChatBot.git
   - cd Mental_HealthCare_ChatBot/Python-Mental-Health-Chatbot-main
2. **Install dependencies:**
   - pip install -r requirements.txt
   - Note: If requirements.txt is not present, install the necessary libraries manually:
     pip install tensorflow nltk
3. **Run the chatbot:**
    - python chatbot.py
## Features
- Intent Recognition: Classifies user inputs into predefined intents.
- Contextual Responses: Provides responses based on the identified intent.
- Extensible Design: Easily add new intents and responses by modifying the intents JSON file.
## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.
## Contact
For any inquiries or feedback, please contact sowmiyadasa2004@example.com.
