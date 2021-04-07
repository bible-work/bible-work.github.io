const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex, score;
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
finishButton.addEventListener("click", () => {
  clearStatusClass(document.body);
  questionContainerElement.classList.add("hide");
  finishButton.classList.add("hide");
  startButton.innerText = "התחל מחדש";
  startButton.classList.remove("hide");
  scoreElement.innerText = `ציון: ${score}/${questions.length}`;
  scoreElement.classList.remove("hide");
});

function startGame() {
  startButton.classList.add("hide");
  scoreElement.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) score++;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
    button.removeEventListener("click", selectAnswer);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    finishButton.classList.remove("hide");
    console.log(score);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "על שם מה נקראה העיר בבל?",
    answers: [
      { text: "על שם מתכנן הבניין, בבל", correct: false },
      { text: "ראשי תיבות של \"בהם בחרתי לשלוט\"", correct: false },
      { text: 'מן המילה הלועזית "Babylon"', correct: false },
      { text: "על שם בלילת השפות", correct: true }
    ]
  },
  {
    question: "כיצד העונש של שינוי השפות לכל אחד השפיע על בני האדם?",
    answers: [
      { text: "לא השפיע, מצאו דרכים להתגבר עליו והערימו על ה'", correct: false },
      { text: "לא הבינו אחד את השני, מה שגרם לבלבולים ולהפסקת הבנייה", correct: true },
      { text: "היו מיואשים מאי ההבנות ורבו המון", correct: false },
      { text: "כל התשובות נכונות", correct: false }
    ]
  },
  {
    question: "מה בנו בבבל?",
    answers: [
      { text: "חומה", correct: false },
      { text: "מגדל", correct: true },
      { text: "בית ספר תיכון", correct: false },
      { text: "מקדש", correct: false }
    ]
  },
  {
    question: "לאיזה מצב מוביל הסיפור?",
    answers: [
      { text: "אחדות בין כל בני האדם", correct: false },
      { text: "בני האדם מתחלקים לשני מחנות מרכזיים", correct: false },
      { text: "התפלגות גדולה, כל אחד לשפתו שלו", correct: true },
      { text: "המצב נשאר דומה לקדמותו", correct: false }
    ]
  },
  {
    question: "באיזו מדינה נמצאת בבל?",
    answers: [
      { text: "מצרים", correct: false },
      { text: "מרוקו", correct: false },
      { text: "פרס", correct: false },
      { text: "עיראק", correct: true }
    ]
  },
  {
    question: "מה היה חטאם של בוני מגדל בבל?",
    answers: [
      { text: "'קראו תיגר על ה", correct: true },
      { text: "חיפשו תחביב", correct: false },
      { text: "העריצו אלילים", correct: false },
      { text: "הם היו איטיים בבנייה", correct: false }
    ]
  },
  {
    question: "מה הדבר החיוני אותו לקח ה' מבוני המגדל?",
    answers: [
      { text: "שפה (בפה)", correct: false },
      { text: "יכולות בנייה", correct: false },
      { text: "את היכולת לתקשר", correct: true },
      { text: "את זכויות האדם שלהם", correct: false }
    ]
  },
  {
    question: "מה היה סופו של המגדל?",
    answers: [
      { text: "התפוצץ", correct: false },
      { text: "הופסקה בנייתו ומשם לא ידוע", correct: true },
      { text: "התמוטט", correct: false },
      { text: "הוקם במקומו קניון", correct: false }
    ]
  },
  {
    question: "איזה סוג של סיפור מתואר כאן?",
    answers: [
      { text: "עובדתי", correct: false },
      { text: "סיבתי", correct: false },
      { text: "אגדי", correct: false },
      { text: "אטיולוגי", correct: true }
    ]
  },
  {
    question: "אילו יסודות אטיולוגים מופיעים בפרק זה?",
    answers: [
      { text: "מקור השם בבל", correct: false },
      { text: "שני התשובות נכונות", correct: true },
      { text: "תופעת השפות השונות", correct: false }
    ]
  },
  {
    question: "מהו הקושי התיאולוגי בביטוי :\"וירד ה'\"",
    answers: [
      { text: "ה' הוא אל מופשט", correct: false },
      { text: "הופך את ה' לאל מוחשי", correct: false },
      { text: "מוריד מערכו של ה'", correct: false },
      { text: "ה' לא צריך לרדת כדי לראות את מעשי בני האדם", correct: true }
    ]
  },
  {
    question: "ביטוי \"מגדל בבל\" לא מופיע במקרא, אלא נגזר מן הסיפור על אנשי בבל",
    answers: [
      { text: "נכון", correct: true },
      { text: "לא נכון", correct: false }
    ]
  },
  {
    question: "מה משמעות הביטוי \"הָבָה, נֵרְדָה, וְנָבְלָה שָׁם, שְׂפָתָם\"?",
    answers: [
      { text: "לרדת לעיר לבלות", correct: false },
      { text: "לרדת לעיר ולבלבל את השפה של האנשים", correct: true },
      { text: "לרדת לעיר ולדבר לא יפה", correct: false },
      { text: "לגרום לאנשי העיר לנבול", correct: false }
      
    ]
  },
];
