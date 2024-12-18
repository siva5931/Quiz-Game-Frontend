const quizData = [
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest",
  },
  {
    question: "Who is known as the Missile Man of India?",
    options: ["Homi Bhabha", "C.V. Raman", "A.P.J. Abdul Kalam", "Vikram Sarabhai"],
    answer: "A.P.J. Abdul Kalam",
  },
  {
    question: "Which is the highest civilian award in India?",
    options: ["Padma Shri", "Padma Bhushan", "Bharat Ratna", "Dronacharya Award"],
    answer: "Bharat Ratna",
  },
  {
    question: "Which Indian author wrote the book 'The God of Small Things'?",
    options: ["Ruskin Bond", "Arundhati Roy", "Chetan Bhagat", "R.K. Narayan"],
    answer: "Arundhati Roy",
  },
  {
    question: "Which Indian movie won the Best Original Song award at the Oscars in 2023?",
    options: ["RRR", "Lagaan", "Sholay", "Dangal"],
    answer: "RRR",
  },
  {
    question: "Who wrote the book 'Wings of Fire'?",
    options: ["Jawaharlal Nehru", "A.P.J. Abdul Kalam", "Rabindranath Tagore", "Dr. B.R. Ambedkar"],
    answer: "A.P.J. Abdul Kalam",
  },
  {
    question: "Which Indian cricketer is known as the 'Master Blaster'?",
    options: ["Sourav Ganguly", "Virat Kohli", "Sachin Tendulkar", "MS Dhoni"],
    answer: "Sachin Tendulkar",
  },
  {
    question: "Who was the first Indian to win the Nobel Prize?",
    options: ["Mother Teresa", "C.V. Raman", "Rabindranath Tagore", "Amartya Sen"],
    answer: "Rabindranath Tagore",
  },
  {
    question: "What is the name of India's first indigenous aircraft carrier?",
    options: ["INS Vikramaditya", "INS Arihant", "INS Vikrant", "INS Chakra"],
    answer: "INS Vikrant",
  },
  {
    question: "Who is known as the Father of the Indian Space Program?",
    options: ["Dr. A.P.J. Abdul Kalam", "Dr. Vikram Sarabhai", "Dr. Homi Bhabha", "Dr. K. Sivan"],
    answer: "Dr. Vikram Sarabhai",
  },
  {
    question: "Which Indian city is known as the Silicon Valley of India?",
    options: ["Mumbai", "Hyderabad", "Bengaluru", "Chennai"],
    answer: "Bengaluru",
  },
  {
    question: "Which Indian scientist discovered the Raman Effect?",
    options: ["Srinivasa Ramanujan", "C.V. Raman", "Jagadish Chandra Bose", "Homi Bhabha"],
    answer: "C.V. Raman",
  },
  {
    question: "Who was the first woman Prime Minister of India?",
    options: ["Indira Gandhi", "Sarojini Naidu", "Pratibha Patil", "Sonia Gandhi"],
    answer: "Indira Gandhi",
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Tiger", "Elephant", "Peacock"],
    answer: "Tiger",
  },
  {
    question: "Who directed the movie '3 Idiots'?",
    options: ["Karan Johar", "Sanjay Leela Bhansali", "Rajkumar Hirani", "Anurag Kashyap"],
    answer: "Rajkumar Hirani",
  },
  {
    question: "What is the highest mountain peak in India?",
    options: ["Mount Everest", "Kanchenjunga", "Nanda Devi", "K2"],
    answer: "Kanchenjunga",
  },
  {
    question: "Which Indian state is known as the 'Land of Five Rivers'?",
    options: ["Punjab", "Uttar Pradesh", "Haryana", "Bihar"],
    answer: "Punjab",
  },
  {
    question: "What is the official language of the Indian government?",
    options: ["Hindi", "English", "Tamil", "Sanskrit"],
    answer: "Hindi",
  },
  {
    question: "Which festival is known as the Festival of Lights in India?",
    options: ["Holi", "Eid", "Diwali", "Navratri"],
    answer: "Diwali",
  },
  {
    question: "Which Indian state is famous for its backwaters?",
    options: ["Tamil Nadu", "Kerala", "Goa", "Karnataka"],
    answer: "Kerala",
  },
];

shuffleArray(quizData);

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `${currentQuestion + 1}. ${questionData.question}`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

displayQuestion();
