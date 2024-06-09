from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import pyttsx3
import speech_recognition as sr
import json
import datetime
import time
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'
socketio = SocketIO(app)

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)

file_path = 'qa_data.json'

def speak(audio):
    def _speak():
        engine.say(audio)
        engine.runAndWait()
    threading.Thread(target=_speak).start()

def take_command():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...........")
        r.adjust_for_ambient_noise(source, duration=1)
        try:
            audio = r.listen(source, timeout=5, phrase_time_limit=10)
            print("Recognizing.....")
            query = r.recognize_google(audio, language='en-in')
            print(f"User said: {query}\n")
        except sr.WaitTimeoutError:
            print("Listening timed out. Please try again.")
            speak("Listening timed out. Please try again.")
            return "None"
        except sr.UnknownValueError:
            print("Unable to recognize your voice...")
            speak("Unable to recognize your voice...")
            return "None"
        except Exception as e:
            print(e)
            print("Sorry, I couldn't understand. Can you repeat that?")
            speak("Sorry, I couldn't understand. Can you repeat that?")
            return "None"
        return query

def username():
    print("What should I call you, sir?")
    speak("What should I call you, sir?")
    uname = take_command()
    if uname == "None":
        uname = "User"
    print(f"Welcome, Mister {uname}")
    speak("Welcome, Mister " + uname)
    print("How can I help you, Sir?")
    speak("How can I help you, Sir?")

def wish_me():
    hour = datetime.datetime.now().hour
    if hour >= 0 and hour < 12:
        print("Good Morning, Sir!")
        speak("Good Morning, Sir!")
    elif hour >= 12 and hour < 18:
        print("Good Afternoon, Sir!")
        speak("Good Afternoon, Sir!")
    else:
        print("Good Evening, Sir!")
        speak("Good Evening, Sir!")

    print("I am your virtual Assistant, Merry!")
    speak("I am your virtual Assistant, Merry!")

def load_qa_data(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

qa_data = load_qa_data(file_path)

def search_and_speak(query, qa_data):
    if query.lower() == "exit":
        return "Goodbye, Sir! Please come again for any Career related help"

    max_matches = 0
    best_match = None
    query_words = set(query.lower().split())
    
    for question in qa_data.keys():
        question_words = set(question.lower().split())
        common_words = query_words & question_words
        num_matches = len(common_words)
        if num_matches > max_matches:
            max_matches = num_matches
            best_match = question

    if best_match:
        answer = qa_data[best_match]
        print(f"Answer: {answer}")
        return answer
    else:
        answer = "Sorry, I couldn't find an answer."
        print(f"Answer: {answer}")
        return answer

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    wish_me()
    username()

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('user_input')
def handle_user_input(data):
    query = data['message']
    print(f"User query: {query}")
    answer = search_and_speak(query, qa_data)
    emit('response', {'message': answer})
    speak(answer)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
