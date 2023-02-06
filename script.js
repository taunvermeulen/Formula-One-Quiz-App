// Create a quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

// Creat Question Class
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

// Display Question
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // Show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// Guess function
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

// Show quiz progress
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = 
    `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

//Show score
function showScores() {
    let quizEndHTML =
        `
           <h1>Quiz Completed</h1>
           <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
           <div class="quiz-repeat">
                <a href="index.html">Take Quiz Again</a>
           </div>
        `;
        let quizElement = document.getElementById("quiz");
        quizElement.innerHTML = quizEndHTML;   
}

// Create Quiz Questions
let questions = [
    new Question(
        "In which country was the term ‘Grand Prix’ first used for a motor race?",["Spain", "France", "England", "Austria"], "France"
    ),
    new Question(
        "The oldest World Drivers’ Championship winner to date is Juan Manuel Fangio. How many years old was he when he achieved this in 1957?",["46", "51", "38", "37"], "46"
    ),
    new Question(
        "Which racing team has the nickname ‘The Prancing Horse’?",["Redbull", "Aston Martin", "Mercedes", "Ferrari"], "Ferrari"
    ),
    new Question(
        "“The Iceman” is the nickname given to which Finnish Formula 1 World Champion?",["Kimi Raikkonen", "Sebastian Vettel", "Lewis Hamilton", "Max Verstappen"], "Kimi Raikkonen"
    ),
    new Question(
        "What is the name of the youngest F1 driver to win a race?",["Lewis Hamilton", "Michael Schumacher", "Max Verstappen", "Ayrton Senna"], "Max Verstappen"
    ),
    new Question(
        "Team Haas competed in the F1 for which country?",["Germany", "The United States", "England", "Russia"], "The United States"
    ),
    new Question(
        "Who holds the title for most F1 Grand Prix races won?",["Michael Schumaker", "Max Verstappen", "Ayrton Senna", "Lewis Hamilton"], "Lewis Hamilton"
    ),
    new Question(
        "At the 2005 United States Grand Prix, how many cars lined up on the grid?",["6", "20", "18", "12"], "6"
    ),
    new Question(
        "Jenson Button won the 2009 Formula One World Championship driving for which team?",["Brawn Racing", "RedBull", "Renault", "Williams"], "Brawn Racing"
    ),
    new Question(
        "Fernando Alonso won the F1 World Drivers’ Championship in 2005 and 2006. Which team was he driving for?",["Ferrari", "McLaren", "Renault", "Aston Martin"], "Renault"
    ),

];

let quiz = new Quiz(questions);

// Display Question
displayQuestion();

// Add a Count Down
let time = 3;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountDown() {
    let quizTimer = setInterval(function () {
        if(quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();

        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor((quizTime / 60) % 60);
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountDown();