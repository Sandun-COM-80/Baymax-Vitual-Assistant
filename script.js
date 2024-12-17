const btn = document.querySelector("#btn");
const content = document.querySelector("#text");
const voice = document.querySelector("#voice");
const transcriptElem = document.querySelector("#transcript");
const micIcon = document.querySelector("#micIcon");

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

function wishMe() {
    const hours = new Date().getHours();
    if (hours < 12) {
        speak("Good Morning!");
    } else if (hours < 18) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

recognition.onstart = () => {
    voice.style.display = "block";  // Show listening animation
    micIcon.src = "mic-on.svg";  // Update icon
};

recognition.onend = () => {
    voice.style.display = "none";  // Hide listening animation
    micIcon.src = "mic.svg";  // Update icon
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    transcriptElem.innerText = "You said: " + transcript;  // Display the spoken text
    handleCommand(transcript);
};

btn.addEventListener("click", () => {
    btn.style.display = "none";  // Hide the button while speaking
    recognition.start();  // Start speech recognition
});

function handleCommand(message) {
    btn.style.display = "flex";  // Show the button again
    voice.style.display = "none";  // Hide the listening animation

    if (message.includes("hello") || message.includes("hi")) {
        wishMe();
        speak("Hello! How can I assist you today?");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");
    } else if (message.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
    } else if (message.includes("date")) {
        const date = new Date().toLocaleDateString();
        speak(`Today's date is ${date}`);
    } else if (message.includes("play music")) {
        speak("Playing music...");
        playSound("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    } else if (message.includes("close")) {
        speak("Goodbye!");
        window.close();
    } else {
        speak(`I couldn't find anything for "${message}". Let's search on Google.`);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

// Add this function call to speak the introduction on page load
window.onload = () => {
    wishMe();
    speak("I'm Baymax, your Virtual Assistant.");
};
