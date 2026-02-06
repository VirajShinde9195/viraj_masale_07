function addMessage(text, type) {
  const chat = document.getElementById("chatBody");
  const div = document.createElement("div");
  div.className = type === "user" ? "user-msg" : "bot-msg";
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function detectLanguage(text) {
  if (/[\u0900-\u097F]/.test(text)) return "mr";
  return "en";
}

function findIntent(text) {
  text = text.toLowerCase();
  for (let item of knowledgeBase) {
    if (item.keywords.some(k => text.includes(k))) {
      return item;
    }
  }
  return null;
}

function sendToBot(userText) {
  addMessage(userText, "user");

  const lang = detectLanguage(userText);
  const intent = findIntent(userText);

  let reply;

  if (intent) {
    reply = intent.answer[lang] || intent.answer.en;
  } else {
    reply =
      lang === "mr" ? "माफ करा, मला समजले नाही." :
      lang === "hi" ? "माफ़ कीजिए, मैं समझ नहीं पाया." :
      "Sorry, I didn't understand that.";
  }

  setTimeout(() => {
    addMessage(reply, "bot");
    speak(reply, lang);
  }, 500);
}

function sendText() {
  const input = document.getElementById("userInput");
  if (!input.value.trim()) return;
  sendToBot(input.value);
  input.value = "";
}

function startVoice() {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "hi-IN";
  recognition.start();

  recognition.onresult = (e) => {
    sendToBot(e.results[0][0].transcript);
  };
}

function speak(text, lang) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "mr" ? "mr-IN" :
           lang === "hi" ? "hi-IN" :
           "en-US";
  speechSynthesis.speak(u);
}
