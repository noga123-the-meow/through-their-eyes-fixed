// שמירת הטקסט המקורי כדי שלא ייהרס עם הערבובים החוזרים
let originalText = "";
let shuffleInterval;
let dyslexiaEnabled = true;

window.onload = () => {
    const sentenceEl = document.getElementById('sentence');

    if (sentenceEl) {
        originalText = sentenceEl.innerText;

        shuffleInterval = setInterval(shuffleSentence, 400);
    }
};

// פונקציה לכפתור
function toggleDyslexia() {

    const icon = document.querySelector(".eye-button .material-symbols-outlined");
    const sentenceEl = document.getElementById("sentence");

    if (dyslexiaEnabled) {

        clearInterval(shuffleInterval);

        sentenceEl.innerText = originalText;

        icon.textContent = "visibility_off";

        dyslexiaEnabled = false;

    } else {

        shuffleInterval = setInterval(shuffleSentence, 400);

        icon.textContent = "visibility";

        dyslexiaEnabled = true;
    }
}

// פונקציה לערבוב אותיות בתוך מילה
function shuffleWord(word) {
    if (word.length <= 3) return word;

    const first = word[0];
    const last = word[word.length - 1];
    // מטפל בסימני פיסוק בסוף מילה
    const hasPunctuation = /[,.!?;]/.test(last);
    
    let middle;
    let end = last;

    if (hasPunctuation && word.length > 4) {
        middle = word.slice(1, -2).split("");
        end = word.slice(-2);
    } else {
        middle = word.slice(1, -1).split("");
    }

    for (let i = middle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middle[i], middle[j]] = [middle[j], middle[i]];
    }

    return first + middle.join("") + end;
}


function shuffleSentence() {
    const sentenceEl = document.getElementById('sentence');
    if (!sentenceEl) return;

    const words = originalText.split(/\s+/);
    const shuffledWords = words.map(word => shuffleWord(word));
    sentenceEl.innerText = shuffledWords.join(" ");
}

const slides = document.querySelectorAll('input[name="slide"]');

next.onclick = () => {
  let current = [...slides].findIndex(s => s.checked);
  slides[(current + 1) % slides.length].checked = true;
};

prev.onclick = () => {
  let current = [...slides].findIndex(s => s.checked);
  slides[(current - 1 + slides.length) % slides.length].checked = true;
};

/* const colors = ["#ff3b3b", "#4cc9f0", "#b5179e", "#f9c74f"];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function splitWordsAndColor() {
  const elements = document.getElementById("");

  elements.forEach(el => {
    const words = el.innerText.split(" ");

    el.innerHTML = words.map(word => {
      if (word.length < 2) return word;

      const letters = word.split("");

      // בוחר אות רנדומלית אחת מהמילה
      const randomIndex = Math.floor(Math.random() * letters.length);

      const newWord = letters.map((letter, i) => {
        if (i === randomIndex) {
          return `<span style="
            color:${randomColor()};
            font-weight:900;
            text-shadow:0 0 8px rgba(255,255,255,0.3);
          ">${letter}</span>`;
        }
        return letter;
      }).join("");

      return newWord;
    }).join(" ");
  });
}

window.addEventListener("load", splitWordsAndColor); */

function toggleBox(id) {

    const element = document.getElementById(id);

    element.classList.toggle("open");
}
