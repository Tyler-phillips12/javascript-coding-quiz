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
        {
            qText: "What does HTML stand for?",
            answers: {
              a: "Hyper Text Markup Language",
              b: "Home Tool Markup Language",
              c: "Hyperlinks and Text Markup Language",
            },
            correct: "Hyper Text Markup Language",
          },
          {
            qText: "Which tag is used to define an unordered list in HTML?",
            answers: {
              a: "<ul>",
              b: "<ol>",
              c: "<li>",
            },
            correct: "<ul>",
          },
          {
            qText: "Which CSS property is used to change the text color of an element?",
            answers: {
              a: "color",
              b: "background-color",
              c: "font-size",
            },
            correct: "color",
          },
          {
            qText: "Which JavaScript method is used to add a new element to an array?",
            answers: {
              a: "push()",
              b: "concat()",
              c: "slice()",
            },
            correct: "push()",
          },
          {
            qText: "What is the purpose of the CSS box-sizing property?",
            answers: {
              a: "To control the visibility of an element",
              b: "To specify the order of flexible items",
              c: "To include/exclude the padding and border in the total width/height of an element",
            },
            correct: "To include/exclude the padding and border in the total width/height of an element",
          },
          {
            qText: "What is the correct syntax to comment out a line of CSS code?",
            answers: {
              a: "// This is a comment",
              b: "/* This is a comment */",
              c: "<!-- This is a comment -->",
            },
            correct: "/* This is a comment */",
          },
          {
            qText: "Which JavaScript keyword is used to declare a variable?",
            answers: {
              a: "variable",
              b: "let",
              c: "var",
            },
            correct: "var",
          },
          {
            qText: "Which HTML tag is used to link an external JavaScript file?",
            answers: {
              a: "<script>",
              b: "<style>",
              c: "<link>",
            },
            correct: "<script>",
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
            timeRemaining -= 3;
            if (timeRemaining < 0) {
                timeRemaining = 0;
            }
        }
    }
  
    // Function to show the next question
    function showNextQuestion() {
        const currentQuestion = questions[currentQuestionNumber];

        questionBank.textContent = currentQuestion.qText
  
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
        const totalPossibleScore = questions.length;
        const scoreText = `Your score: ${score} out of ${totalPossibleScore}`;
        questionBank.innerHTML = `Quiz Ended. ${scoreText}`;
        questionBank.innerHTML += "<p>High score saved!</p>";
      }
    });