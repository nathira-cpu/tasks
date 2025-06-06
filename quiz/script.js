const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Tabular Markup Language", correct: false },
      { text: "None of these", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false }
    ]
  },
  {
    question: "Which is not a JavaScript Framework?",
    answers: [
      { text: "Python Script", correct: true },
      { text: "JQuery", correct: false },
      { text: "Django", correct: false },
      { text: "NodeJS", correct: false }
    ]
  },
  {
    question: "Which is used to connect to Database?",
    answers: [
      { text: "PHP", correct: true },
      { text: "HTML", correct: false },
      { text: "JS", correct: false },
      { text: "All", correct: false }
    ]
  },
  {
    question: "Which tag is used to define an unordered list in HTML?",
    answers: [
      { text: "<ul>", correct: true },
      { text: "<ol>", correct: false },
      { text: "<li>", correct: false },
      { text: "<list>", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false }
    ]
  },
  {
    question: "How do you write \"Hello World\" in an alert box?",
    answers: [
      { text: "msgBox('Hello World');", correct: false },
      { text: "alertBox('Hello World');", correct: false },
      { text: "msg('Hello World');", correct: false },
      { text: "alert('Hello World');", correct: true }
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function myFunction()", correct: true },
      { text: "function:myFunction()", correct: false },
      { text: "function = myFunction()", correct: false },
      { text: "def myFunction()", correct: false }
    ]
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answers: [
      { text: "if i = 5 then", correct: false },
      { text: "if (i == 5)", correct: true },
      { text: "if i == 5 then", correct: false },
      { text: "if i = 5", correct: false }
    ]
  },
  {
    question: "How does a WHILE loop start?",
    answers: [
      { text: "while i = 1 to 10", correct: false },
      { text: "while (i <= 10)", correct: true },
      { text: "while (i <= 10; i++)", correct: false },
      { text: "while i <= 10", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreBox = document.getElementById("score-box");
const scoreText = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreBox.classList.add("hide");
  document.getElementById("quiz-box").classList.remove("hide");
  nextButton.innerText = "Next";
  showQuestion();
}

function startTimer() {
  timeLeft = 15;
  timeDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  Array.from(answerButtons.children).forEach(li => {
    const btn = li.firstChild;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
  nextButton.classList.remove("hide");
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    li.appendChild(button);
    answerButtons.appendChild(li);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  nextButton.classList.add("hide");
  answerButtons.innerHTML = "";
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(li => {
    const btn = li.firstChild;
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    btn.disabled = true;
  });

  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  document.getElementById("quiz-box").classList.add("hide");
  scoreBox.classList.remove("hide");
  scoreText.innerText = `${score} / ${questions.length}`;
}

startQuiz();
