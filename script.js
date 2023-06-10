document.addEventListener("DOMContentLoaded", function() {
    const welcomeScreen = document.getElementById("welcome-screen");
    const questionBank = document.getElementById("question-title");
    const timer = document.getElementById("timer");
    let currentQuestionNumber = 0;
    let score = 0;
    let timeRemaining = 60;
    const answers = document.getElementById("answer-section");
    const answerButton1 = document.getElementById("a");
    const answerButton2 = document.getElementById("b");
    const answerButton3 = document.getElementById("c");
    const startButton = document.getElementById("start");
    let timerInterval;
    
    function saveHighScore(event) {
      event.preventDefault();
    
      const initialsInput = document.getElementById("initials");
      const initials = initialsInput.value.trim();
      
      if (initials !== "") {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
        const newScore = {
          initials: initials,
          score: score
        };
    
        highScores.push(newScore);
    
        localStorage.setItem("highScores", JSON.stringify(highScores));
    
      }
    }
    
    // Attach the event listener to the score form
    const scoreForm = document.getElementById("score-form");
    scoreForm.addEventListener("submit", saveHighScore);
  
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
  // Display high scores
  const highScoresContainer = document.getElementById("high-scores-container");
  highScores.forEach((score, index) => {
    const scoreItem = document.createElement("li");
    scoreItem.textContent = `${index + 1}. ${score.initials} - ${score.score}`;
    highScoresContainer.appendChild(scoreItem);
  });
    
  
    function startGame() {
        welcomeScreen.style.display = "none";
        questionBank.style.display = "block";
        timer.style.display = "block";
        startTimer();
        showNextQuestion();
    }
  
    function startTimer() {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    }
  
    function updateTimer() {
        timeRemaining--;
        timer.textContent = `Time Remaining: ${timeRemaining} seconds`;
  
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }
  
    startButton.addEventListener("click", function() {
        startGame();
    });
  
    // List of questions
    const questions = [
        {
            qText: "What does JS stand for?",
            answers: {
                a: "JavaScript",
                b: "html",
                c: "css",
            },
            correct: "JavaScript",
        },
        {
            qText: "Which is an example of a semantic HTML element?",
            answers: {
                a: "div",
                b: "section",
                c: "id=cars",
            },
            correct: "section",
        },
        {
            qText: "How many items can we have within an array?",
            answers: {
                a: "4",
                b: "6",
                c: "unlimited",
            },
            correct: "unlimited",
        },
    ];
  
    // Event listener for answer buttons
    answers.addEventListener("click", function(event) {
        if (event.target.classList.contains("answer-button")) {
            const selectedAnswer = event.target.textContent;
            checkAnswer(selectedAnswer);
            currentQuestionNumber++;
            if (currentQuestionNumber < questions.length) {
                showNextQuestion();
            } else {
                endQuiz();
            }
        }
    });
  
    // Function to check the selected answer
    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionNumber];
        if (selectedAnswer === currentQuestion.correct) {
            score++;
        } else {
            alert("Incorrect answer!");
        }
    }
  
    // Function to show the next question
    function showNextQuestion() {
        const currentQuestion = questions[currentQuestionNumber];
  
        // Clear the answer section
        answers.innerHTML = '';
  
        // Create buttons for each answer option
        for (const option in currentQuestion.answers) {
            const answerButton = document.createElement('button');
            answerButton.classList.add('answer-button');
            answerButton.textContent = currentQuestion.answers[option];
            answers.appendChild(answerButton);
        }
    }
  
    function endQuiz() {
      clearInterval(timerInterval);
      questionBank.innerHTML = `Quiz Ended. Your score: ${score}`;
    
      questionBank.innerHTML += "<p>High score saved!</p>";
    }
  });