// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const closeBtn = document.querySelector(".close-btn");
// const chatbox = document.querySelector(".chatbox");

// // let mediaRecorder;
// // let audioChunks = [];

// // const createChatLi = (audioUrl, className) => {
// //     const chatLi = document.createElement("li");
// //     chatLi.classList.add("chat", `${className}`);
// //     const audio = document.createElement("audio");
// //     audio.controls = true;
// //     audio.src = audioUrl;
// //     chatLi.appendChild(audio);
// //     return chatLi;
// // };

// // // const generateResponse = async (audioBlob) => {
// // //     const formData = new FormData();
// // //     formData.append('audio', audioBlob);

// // //     try {
// // //         console.log('formData : ', formData);
// // //         const response = await fetch('http://localhost:5000/upload', {
// // //             method: 'POST',
// // //             body: formData
// // //         });
// // //         console.log('response : ', response);
// // //         // const blob = await response.blob();
// // //         // console.log('blob : ', blob);
// // //         // const audioUrl = URL.createObjectURL(blob);
// // //         // chatbox.appendChild(createChatLi(audioUrl, "incoming"));
// // //         // chatbox.scrollTo(0, chatbox.scrollHeight);
// // //     } catch (err) {
// // //         console.log('err : ', err);
// // //         alert("Oops! Something went wrong. Please try again.");
// // //     }
// // // fetch('http://localhost:5000/upload', {
// // //     method: 'POST',
// // //     body: formData
// // // })
// // // .then(response => {
// // //     console.log('response : ', response);
// // //     response.blob();
// // // })
// // // .then(blob => {
// // //     console.log('blob : ', blob);
// // //     const audioUrl = URL.createObjectURL(blob);
// // //     chatbox.appendChild(createChatLi(audioUrl, "incoming"));
// // //     chatbox.scrollTo(0, chatbox.scrollHeight);
// // // })
// // // .catch((err) => {
// // //     console.log('err : ', err);
// // //     alert("Oops! Something went wrong. Please try again.");
// // // });
// // // };

// // const socket = io.connect(
// //     "http://" + document.domain + ":" + location.port
// // );
// // const listeningStatusDiv = document.getElementById("listeningStatus");

// // socket.on("connect", function () {
// //     console.log("Connected to server");
// // });

// // socket.on("response", function (data) {
// //     const message = data.message;
// //     document.getElementById("conversation").innerHTML +=
// //         "<p><b>Assistant:</b> " + message + "</p>";
// //     const synth = window.speechSynthesis;
// //     const utterance = new SpeechSynthesisUtterance(message);
// //     synth.speak(utterance);
// // });

// // function startListening() {
// //     const recognition = new (window.SpeechRecognition ||
// //         window.webkitSpeechRecognition)();
// //     recognition.lang = "en-IN";
// //     recognition.interimResults = false;
// //     recognition.maxAlternatives = 1;

// //     recognition.start();
// //     listeningStatusDiv.style.display = "block"; // Show listening status

// //     recognition.onresult = function (event) {
// //         const userInput = event.results[0][0].transcript;
// //         document.getElementById("conversation").innerHTML +=
// //             "<p><b>You:</b> " + userInput + "</p>";
// //         socket.emit("user_input", { message: userInput });
// //         listeningStatusDiv.style.display = "none"; // Hide listening status after processing
// //     };

// //     recognition.onerror = function (event) {
// //         console.error("Error occurred in recognition: " + event.error);
// //         listeningStatusDiv.style.display = "none"; // Hide listening status on error
// //     };

// //     recognition.onend = function () {
// //         // Automatically restart recognition
// //         startListening();
// //     };
// // }

// // document.getElementById('recordButton').addEventListener('click', async () => {
// //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //     mediaRecorder = new MediaRecorder(stream);
// //     mediaRecorder.start();

// //     mediaRecorder.ondataavailable = event => {
// //         audioChunks.push(event.data);
// //     };

// //     mediaRecorder.onstop = () => {
// //         const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
// //         const audioUrl = URL.createObjectURL(audioBlob);
// //         chatbox.appendChild(createChatLi(audioUrl, "outgoing"));
// //         document.getElementById('audioPlayback').src = audioUrl;
// //         // audioChunks = [];
// //         document.getElementById('sendButton').disabled = false;
// //     };

// //     document.getElementById('recordButton').disabled = true;
// //     document.getElementById('stopButton').disabled = false;
// // });

// // document.getElementById('stopButton').addEventListener('click', () => {
// //     mediaRecorder.stop();
// //     console.log('audioChunks : ', audioChunks);
// //     document.getElementById('recordButton').disabled = false;
// //     document.getElementById('stopButton').disabled = true;
// // });

// // document.getElementById('sendButton').addEventListener('click', () => {
// //     const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
// //     console.log('audioBlob : ', audioBlob);
// //     audioChunks = [];
// //     generateResponse(audioBlob);
// //     document.getElementById('sendButton').disabled = true;
// // });



// closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));