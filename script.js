let username = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let difficulty = "";
let userAnswers = []; // Array to store user's answers



let questionsEasy = [
    { question: "Sarah has 58 apples and buys 24 more. How many does she have?", answers: ["82", "78", "84", "80"], correct: 0, image: 'Assets/apple.jpg' },
    { question: "John was reading a book with 120 pages. He has read 37. How many pages left?", answers: ["83", "80", "75", "79"], correct: 0, image: 'Assets/book.jpg'  },
    { question: "Convert 7/10 into a decimal.", answers: ["0.7", "0.07", "7.1", "0.77"], correct: 0, image: 'Assets/decimal.png'  },
    { question: "Lisa scored 85 out of 100. What percentage is that?", answers: ["85%", "80%", "75%", "90%"], correct: 0, image: 'Assets/percent.jpg'  },
    { question: "A recipe calls for 3/4 cup of sugar. How many times will you fill a 1/4 cup?", answers: ["3", "2", "4", "3.5"], correct: 0, image: 'Assets/cup.jpg'  },
    { question: "In a game of basketball, your team scores 87 points, and the opposing team scores 65 points. What is the point difference?", answers: ["22", "15", "25", "20"], correct: 0, image: 'Assets/ball.jpg'  },
    { question: "The price of a mango is ₱15. How much would 6 mangoes cost?", answers: ["₱90", "₱100", "₱85", "₱95"], correct: 0, image: 'Assets/mango.jpg'  },
    { question: "A jeepney carries 20 passengers. If 5 jeepneys are full, how many passengers are there in total?", answers: ["100", "95", "110", "105"], correct: 0, image: 'Assets/Jeep.jpg'  },
    { question: "If a barangay has 500 families and 200 families have children, what percentage of families have children?", answers: ["40%", "30%", "50%", "60%"], correct: 0, image: 'Assets/children.jpg'  },
    { question: "A rice field measures 100 square meters. If a farmer plants rice in 4 such fields, what is the total area planted?", answers: ["400 square meters", "350 square meters", "450 square meters", "500 square meters"], correct: 0, image: 'Assets/rice.jpg'  },
];

let questionsHard = [
    { question: "If 3/4 of a chocolate bar weighs 100 grams, how much does the whole bar weigh?", answers: ["133.33 grams", "125 grams", "120 grams", "150 grams"], correct: 0, image: 'Assets/choco.jpg' },
    { question: "If a tree grows 2.5 meters every year, how many meters will it grow in 8 years?", answers: ["20 meters", "18 meters", "22 meters", "16 meters"], correct: 0, image: 'Assets/tree.jpg' },
    { question: "A bakery sells 20 cupcakes for ₱150. How much does one cupcake cost?", answers: ["₱7.50", "₱8", "₱9", "₱10"], correct: 0, image: 'Assets/cupcake.jpg' },
    { question: "If a jeepney travels 40 kilometers per hour, how long will it take to travel 150 kilometers?", answers: ["3.75 hours", "4 hours", "3 hours", "5 hours"], correct: 0, image: 'Assets/Jeep2.jpg' },
    { question: "A farmer harvested 350 mangoes. He sold 40%. How many mangoes did he sell?", answers: ["140", "150", "130", "120"], correct: 0, image: 'Assets/mango2.jpg' },
    { question: "Tom has ₱250. He buys 5 packs of candy costing ₱45 each. How much money does he have left?", answers: ["₱25", "₱50", "₱30", "₱35"], correct: 0, image: 'Assets/candy.jpg' },
    { question: "A bus travels 150 kilometers in 3 hours. What is its average speed?", answers: ["50 km/h", "60 km/h", "55 km/h", "45 km/h"], correct: 1, image: 'Assets/bus.jpg' },
    { question: "A bookstore receives 200 books, and sells 75% of them. How many books are left?", answers: ["50", "40", "45", "35"], correct: 0, image: 'Assets/bookstore.jpg' },
    { question: "If you have 2/3 of a cake and give 1/6 of it to your friend, how much cake is left?", answers: ["1/2", "2/3", "1/3", "1/4"], correct: 0, image: 'Assets/cake.jpg' },
    { question: "A farmer plants 150 plants per hectare. How many plants will he plant in 5 hectares?", answers: ["750", "800", "700", "900"], correct: 0, image: 'Assets/plants.jpg' },
];

function selectDifficulty() {
    username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter your username.");
        return;
    }
    document.getElementById('username-entry').classList.add('hidden');
    document.getElementById('difficulty-selection').classList.remove('hidden');
}

let timeLimit;

function startQuiz(level) {
    difficulty = level;
    // Set time limit based on the difficulty level
    if (difficulty === "easy") {
        timeLimit = 300; // 5 minutes for easy
    } else if (difficulty === "hard") {
        timeLimit = 150; // 10 minutes for hard
    }

    document.getElementById('difficulty-selection').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    userAnswers = []; // Reset user answers
    timeLeft = timeLimit;  // Use the dynamic time limit
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("question-number").innerText = currentQuestion + 1;
    loadQuestion();
    startTimer();  // Start the timer with the dynamic time limit
}

function loadQuestion() {
    let questionData = (difficulty === "easy") ? questionsEasy : questionsHard;
    let question = questionData[currentQuestion];
    document.getElementById('question-text').innerText = question.question;
    let options = shuffleArray([...question.answers]);
    let optionsHTML = options.map((opt, index) => ` 
        <button onclick="checkAnswer(${index})" class="bg-green-300 p-3 rounded-2xl">${opt}</button>
    `).join('');
    document.getElementById('options').innerHTML = optionsHTML;
    document.getElementById('question-image').src = question.image;  // Set the image dynamically
}

function checkAnswer(selected) {
    let questionData = (difficulty === "easy") ? questionsEasy : questionsHard;
    let correctIndex = questionData[currentQuestion].correct;
    
    // Store the user's answer
    userAnswers[currentQuestion] = selected;

    if (selected === correctIndex) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < 10) {
        document.getElementById("question-number").innerText = currentQuestion + 1;
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);  // Clear the existing timer
    document.getElementById("quiz").classList.add('hidden');
    document.getElementById("results").classList.remove('hidden');
    // showConfetti();
    document.getElementById("score").innerText = `${score}/10`;
    // displayAnswers(); // Call the function to display correct and incorrect answers
    saveScore();

    const end = Date.now() + 15 * 3000;

// go Buckeyes!
const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();

const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

// function displayAnswers() {
//     let questionData = (difficulty === "easy") ? questionsEasy : questionsHard;
//     let resultsHTML = "";

//     questionData.forEach((question, index) => {
//         const userAnswer = question.answers[userAnswers[index]];
//         const correctAnswer = question.answers[question.correct];
//         const isCorrect = userAnswers[index] === question.correct;

//         resultsHTML += `
//             <li class="p-4 border rounded-lg shadow-md bg-gray-100">
//                 <p class="font-medium">Q${index + 1}: ${question.question}</p>
//                 <p class="text-gray-600">Your Answer: <span class="font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}">${userAnswer}</span></p>
//                 <p class="text-gray-600">Correct Answer: <span class="font-bold text-green-500">${correctAnswer}</span></p>
//             </li>
//         `;
//     });

//     document.getElementById("user-answers").innerHTML = resultsHTML; // Populate the answers
// }
function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score, difficulty });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function viewLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let easyLeaderboard = leaderboard.filter(entry => entry.difficulty === 'easy');
    let hardLeaderboard = leaderboard.filter(entry => entry.difficulty === 'hard');
    let easyHTML = easyLeaderboard.map(entry => `<li class="text-lg">${entry.username} - ${entry.score}</li>`).join('');
    let hardHTML = hardLeaderboard.map(entry => `<li class="text-lg">${entry.username} - ${entry.score}</li>`).join('');
    document.getElementById('easy-leaderboard').innerHTML = easyHTML;
    document.getElementById('hard-leaderboard').innerHTML = hardHTML;
    document.getElementById("results").classList.add('hidden');
    document.getElementById("leaderboard").classList.remove('hidden');
}

function goBackToResults() {
    document.getElementById("leaderboard").classList.add('hidden');
    document.getElementById("results").classList.remove('hidden');
}

function restartQuiz() {
    clearInterval(timerInterval);  // Clear the existing timer

    // Reset timeLeft based on the current difficulty
    if (difficulty === "easy") {
        timeLeft = 300; // 5 minutes for easy
    } else if (difficulty === "hard") {
        timeLeft = 600; // 10 minutes for hard
    }

    document.getElementById("results").classList.add('hidden');
    document.getElementById("quiz").classList.remove('hidden');
    currentQuestion = 0;
    score = 0;
    userAnswers = []; // Reset user answers
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("question-number").innerText = currentQuestion + 1;
    loadQuestion();  // Load the first question
    startTimer();    // Start the timer again with the correct time limit
}

function pauseGame() {
    gamePaused = true;
    clearInterval(timerInterval);
    document.getElementById("pause-screen").classList.remove('hidden');
}

function resumeGame() {
    gamePaused = false;
    document.getElementById("pause-screen").classList.add('hidden');
    startTimer();
}

function exitGame() {
    clearInterval(timerInterval);
    document.getElementById("pause-screen").classList.add('hidden'); // Hide pause screen on exit
    document.getElementById("quiz").classList.add('hidden');
    document.getElementById("results").classList.add('hidden');
    document.getElementById("leaderboard").classList.add('hidden');
    document.getElementById('username-entry').classList.remove('hidden'); // Show username entry screen
    document.getElementById("username").value = '';
    gamePaused = false;
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        
        // Calculate minutes and seconds
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        // Format the time as MM:SS
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        document.getElementById('time').innerText = formattedTime;

        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}