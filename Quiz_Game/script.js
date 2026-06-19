// Start screen DOM
const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#startBtn");

// quiz-screen
const quizScreen = document.querySelector("#quiz-screen");
const btns = document.querySelectorAll(".btn");
const question = document.querySelector(".question");
const scoreVal = document.querySelector(".scoreValue");
const timeTaken = document.querySelector(".timeTaken");

// result-screen
const resultScreen = document.querySelector("#result-screen");
const restart = document.querySelector(".restart");
const result = document.querySelector(".result");
const set = document.querySelector(".set");

// question and answer data
const data = [
  {
    question: "Who is the prime minister of India?",
    answers: [
      { text: "Narendra Damodar das modi", correct: false },
      { text: "Nelson Mandela", correct: false },
      { text: "Daupadi Murmu", correct: true },
      { text: "Kiran Bedi", correct: false },
    ],
  },
  {
    question: "Who is the chief minister of Odisha?",
    answers: [
      { text: "Pravati Parida", correct: false },
      { text: "Kelucharan Mohapatra", correct: false },
      { text: "Mohan Majhi", correct: true },
      { text: "dama Rout", correct: false },
    ],
  },
  {
    question: "What is the capital of Odisha?",
    answers: [
      { text: "Cuttack", correct: false },
      { text: "Puri", correct: false },
      { text: "Konark", correct: false },
      { text: "Bhubaneswar", correct: true },
    ],
  },
  {
    question: "Best food of Odisha?",
    answers: [
      { text: "Mohaprasad", correct: true },
      { text: "Kakera", correct: false },
      { text: "Podapitha", correct: false },
      { text: "chena poda", correct: false },
    ],
  },
  {
    question: "Which is the best color for positivity?",
    answers: [
      { text: "yellow", correct: true },
      { text: "Blue", correct: false },
      { text: "White", correct: false },
      { text: "golden", correct: false },
    ],
  },
];

// add eventlistener in start screen
startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setTimeout(() => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    clearInterval(timer);
    responseData = [];
    currentQuestion = 0;
    score = 0;
    scoreVal.textContent = `Score: ${score}`;
    set.innerHTML = ""; //clear old break down
    loadQuestions(data);
  }, 0);
});

let currentQuestion = 0;
let score = 0;

let timer;
let timeLeft = 5;

//for capturing data of questions
let responseData = [];

function loadQuestions(data) {
  function showQuestion() {
    // stop quiz
    if (currentQuestion === data.length) {
      clearInterval(timer);
      quizScreen.classList.add("hidden");
      resultScreen.classList.remove("hidden");
      result.textContent = `Your score is : ${score}`;
      showBreakDown(responseData);
      return;
    }
    //show question
    question.textContent =
      `${currentQuestion + 1}. ` + data[currentQuestion].question;

    btns.forEach((btn, index) => {
      btn.textContent = data[currentQuestion].answers[index].text;
      btn.onclick = () => {
        clearInterval(timer);

        if (data[currentQuestion].answers[index].correct) {
          score++;
          scoreVal.textContent = `Score: ${score}`;
        }
        // add value in obj
        responseData.push({
          question: data[currentQuestion].question,
          Score: data[currentQuestion].answers[index].correct ? 1 : 0,
          time: 5 - timeLeft,
        });
        currentQuestion++;
        showQuestion();
      };
    });
    startTimer();
    // reset timer for new question
  }

  function startTimer() {
    clearInterval(timer);
    timeLeft = 5;

    timeTaken.textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
      // time over, next question
      if (timeLeft <= 0) {
        currentQuestion++;
        showQuestion();
        return;
      }
      timeTaken.textContent = `Time Left: ${timeLeft}s`;
      // responseData.time = timeLeft;
      console.log(timeLeft);
      timeLeft--;
    }, 1000);
  }
  showQuestion();
}

restart.addEventListener("click", (e) => {
  e.preventDefault();
  responseData = [];

  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
console.log(responseData);

// fun for showing breakdown
function showBreakDown(responseData) {
  responseData.forEach((item) => {
    console.log(item);

    const li = document.createElement("li");
    li.classList.add("task");

    const div1 = document.createElement("div");
    div1.classList.add("group");

    const div2 = document.createElement("div");
    div2.classList.add("qstn");
    div2.textContent = item.question;

    const div3 = document.createElement("div");
    div3.classList.add("breakDownTimeTaken");
    div3.textContent = `Take: ${item.time}s`;
    const div4 = document.createElement("div");
    div4.classList.add("scoreTotal");
    div4.textContent = `Score: ${item.Score}`;
    console.log(item.Score);

    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);

    li.appendChild(div1);

    set.appendChild(li);
  });
}
