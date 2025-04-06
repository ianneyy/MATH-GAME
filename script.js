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
//load questions
function loadQuestion() {
    let questionData = (difficulty === "easy") ? questionsEasy : questionsHard;
    let question = questionData[currentQuestion];
    document.getElementById('question-text').innerText = question.question;
    let options = shuffleArray([...question.answers]);
    let optionsHTML = options
      .map(
        (opt, index) => ` 
        <button onclick="checkAnswer(${index})" class="opt-btn full-rounded relative w-full ">
         <span>${opt}</span>
          <div class="border full-border-rounded absolute inset-0"></div>
        </button>
    `
      )
      .join("");
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
function viewOverview(){


    document.getElementById("overview").classList.remove('hidden');
    document.getElementById("results").classList.add('hidden');
    displayAnswers();

}

function endQuiz() {
    
    clearInterval(timerInterval);  // Clear the existing timer
    document.getElementById("quiz").classList.add('hidden');
    document.getElementById("results").classList.remove('hidden');

    // showConfetti();
    document.getElementById("score").innerText = `${score}/10`;
    document.getElementById("score2").innerText = `${score}/10`;
    

    // displayAnswers(); // Call the function to display correct and incorrect answers
    saveScore();

    displayResult();
    const end = Date.now() + 15 * 500;

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

function displayAnswers() {
    let questionData = (difficulty === "easy") ? questionsEasy : questionsHard;
    let resultsHTML = "";

    questionData.forEach((question, index) => {
        const userAnswer = question.answers[userAnswers[index]];
        const correctAnswer = question.answers[question.correct];
        const isCorrect = userAnswers[index] === question.correct;

        let userAnswerHTML = "";
         if (isCorrect) {
            userAnswerHTML = `
                <div class="text-gray-300 p-2 rounded-xl flex items-center w-52">
                    <span class="text-sm">Your answer: <span>${userAnswer}</span></span>
                </div>
            `;
        } else {
            userAnswerHTML = `
                <div class="bg-red-300 p-2 rounded-xl text-left w-52">
                    <i class="ri-close-circle-fill text-red-600"></i>
                    <span class="text-sm">Your answer: <span>${userAnswer}</span></span>
                </div>
            `;
        }
        resultsHTML += `
                <div class="bg-gray-600 rounded-xl px-8 py-4 mt-2">
                <span class="text-gray-200">${question.question}</span>
                <div class="flex justify-between mt-2">
                    <div class="bg-green-200 text-black p-2 rounded-xl flex items-center correct-answer w-52">
                        <i class="ri-checkbox-circle-fill text-green-600 mr-2"></i>
                            <span>${correctAnswer}</span>
                    </div>
                    ${userAnswerHTML}
                </div>
                 </div>
        `;
    });

    document.getElementById("user-answers").innerHTML = resultsHTML; // Populate the answers
}
function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    leaderboard.push({username, score, difficulty });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);

    leaderboard = leaderboard.map((entry, index) => ({
      id: index + 1,
      ...entry,
    }));
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

    let recentScore = {
      username,
      score,
      difficulty
    };
    localStorage.setItem("recentScore", JSON.stringify(recentScore));
}

function viewLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let easyLeaderboard = leaderboard.filter(entry => entry.difficulty === 'easy');
    let hardLeaderboard = leaderboard.filter(entry => entry.difficulty === 'hard');
    let hardHTML = hardLeaderboard
      .map((entry, index) => {
        let medalImg = "";
        let crownImg = "";
        if (index === 0) {
          medalImg = "medal/goldMedal.png";
          crownImg = "Assets/boywcrown.png";
        } else if (index === 1) {
          medalImg = "medal/silverMedal.png";
          
        } else if (index === 2) {
          medalImg = "medal/bronzeMedal.png";
        }

        return `
        
        <div class="flex justify-between mb-7">
        <div class="flex">
                <div
                  class="w-8 h-8 rounded-full bg-green-500 text-white flex overflow-hidden"
                  style="background-color: #e1b3de"
                >
                  ${
                    crownImg
                      ? `<img src="${crownImg}" class="object-cover"/>`
                      : `<img src="Assets/boy.png" class="object-cover"/>`
                  }
                
                </div>
                <div class="mx-3 text-left">
                  <p class="ml-3">${entry.username}</p>
                  <div
                    class="px-3 rounded-full"
                    style="background-color: #00ff4d"
                  >
                    <p class="text-xs">1080 pts</p>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex items-center text-center">
                  <p class="text-xs">35s</p>
                </div>
                <div class="relative flex items-center justify-center">
            ${
              medalImg
                ? `<img src="${medalImg}" class="h-6 w-6" alt="Medal" />`
                : ""
            }
          </div>
              </div>
             </div>
        `;
      })
      .join("");
    let easyHTML = easyLeaderboard
      .map(
        (entry, index) =>{
          let medalImg = "";
          if (index === 0) {
            medalImg = "medal/goldMedal.png";
          } else if (index === 1) {
            medalImg = "medal/silverMedal.png";
          } else if (index === 2) {
            medalImg = "medal/bronzeMedal.png";
          }

          return `
        
        <div class="flex justify-between mb-7">
        <div class="flex">
                <div
                  class="w-8 h-8 rounded-full bg-green-500 text-white flex overflow-hidden"
                  style="background-color: #e1b3de"
                >
                  <img src="Assets/boywcrown.png" alt="" class="object-cover" />
                </div>
                <div class="mx-3 text-left">
                  <p class="ml-3">${entry.username}</p>
                  <div
                    class="px-3 rounded-full"
                    style="background-color: #00ff4d"
                  >
                    <p class="text-xs">1080 pts</p>
                  </div>
                </div>
              </div>

              <div class="flex gap-2">
                <div class="flex items-center text-center">
                  <p class="text-xs">35s</p>
                </div>
                <div class="relative flex items-center justify-center">
            ${medalImg? `<img src="${medalImg}" class="h-6 w-6" alt="Medal" />`: ""}
          </div>
              </div>
             </div>
        `;
        })
      .join("");

  
    // let hardHTML = hardLeaderboard.map(entry => `<li class="text-lg">${entry.username} - ${entry.score}</li>`).join('');
    document.getElementById('easy-leaderboard').innerHTML = easyHTML;
    document.getElementById('hard-leaderboard').innerHTML = hardHTML;
    document.getElementById("results").classList.add('hidden');
    document.getElementById("leaderboard").classList.remove('hidden');
}
function displayResult(){
  let recent = JSON.parse(localStorage.getItem("recentScore"));
  const namePlaceholder = document.getElementById("name-placeholder");
  

  namePlaceholder.innerHTML = `
     <div 
      class="w-24 h-24 rounded-full text-white flex overflow-hidden mx-auto"
      style="background-color: #e1b3de"
      >
      <img src="Assets/boy.png" alt="" class="object-cover" />
      </div>
      <div class="text-center text-gray-200">${recent.username}</div>
  `;

}
function displayRecentScore() {
  let recent = JSON.parse(localStorage.getItem("recentScore"));
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  if (!recent) return;

  // Find the rank of the recent user
  const userIndex = leaderboard.findIndex(
    (entry) =>
      entry.username === recent.username &&
      entry.score === recent.score &&
      entry.difficulty === recent.difficulty
  );
  const rank = userIndex >= 0 ? userIndex + 1 : null;

  // Select DOM elements inside your #recent container
  const recentContainer = document.getElementById("recent");
  if (!recentContainer) return;

  // Replace contents
  recentContainer.innerHTML = `
    <div class="mx-auto">
      <div
        class="w-24 h-24 rounded-full text-white flex overflow-hidden mx-auto"
        style="background-color: #e1b3de"
      >
        <img src="Assets/girl.png" alt="" class="object-cover" />
      </div>
      <div class="text-center text-gray-900">${recent.username}</div>
    </div>
    <div class="text-center flex flex-col mt-5">
      <div class="flex text-center mx-auto items-center">
        ${
          rank === 1
            ? '<img src="medal/goldMedal.png" alt="" class="h-10 w-10" />'
            : rank === 2
            ? '<img src="medal/silverMedal.png" alt="" class="h-10 w-10" />'
            : rank === 3
            ? '<img src="medal/bronzeMedal.png" alt="" class="h-10 w-10" />'
            : ""
        }
        <span class="text-6xl font-semibold text-yellow-400 font-sans">
          ${rank ? `${rank}${getOrdinalSuffix(rank)}` : "N/A"}
        </span>
      </div>
      <span class="text-gray-700">Your Rank</span>
    </div>
    <div class="flex flex-col mt-10 gap-4">
      <div class="flex justify-between">
        <span>Total Points:</span>
        <span class="bg-green-300 px-4 rounded-full">${recent.score}pts</span>
      </div>
      <div class="flex justify-between">
        <span>Total Score:</span>
        <span class="px-4">${recent.correct || "N/A"}</span>
      </div>
      <div class="flex justify-between">
        <span>Total Spent:</span>
        <span class="px-4">${recent.time || "N/A"}</span>
      </div>
    </div>
  `;
}

// Helper to get ordinal suffix (e.g. 1st, 2nd, 3rd)
function getOrdinalSuffix(i) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) return "st";
  if (j == 2 && k != 12) return "nd";
  if (j == 3 && k != 13) return "rd";
  return "th";
}

// Call this when your page loads or after saving the score



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

function returnResult(){
    document.getElementById("overview").classList.add('hidden');
    document.getElementById("results").classList.remove('hidden');
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