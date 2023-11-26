// Sample Questions and Answers
const questions = [
    { question: "What is the capital of Brazil?", answer: "Brasília" },
    { question: "Which planet is known as the Red Planet?", answer: "Mars" },
    { question: "Who is the author of 'To Kill a Mockingbird'?", answer: "Harper Lee" },
    { question: "What is the largest mammal on Earth?", answer: "Blue Whale" },
    { question: "In which year did World War II end?", answer: "1945" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What is the currency of Japan?", answer: "Yen" },
    { question: "Who wrote 'Pride and Prejudice'?", answer: "Jane Austen" },
    { question: "Which element has the chemical symbol 'O'?", answer: "Oxygen" },
    { question: "What is the largest ocean on Earth?", answer: "Pacific Ocean" },
];

let username = "";

function startQuiz() {
    // Get username
    username = document.getElementById("username").value;
    // Hide username screen, show quiz
    document.getElementById("usernameScreen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
}

function submitQuiz() {
    // Collect user answers
    const userAnswers = [];
    for (let i = 0; i < questions.length; i++) {
        const questionNumber = i + 1;
        const selectedAnswer = document.querySelector(`input[name="q${questionNumber}"]:checked`);
        if (selectedAnswer) {
            userAnswers.push(selectedAnswer.value);
        }
    }

    // Calculate and display the score
    const score = calculateScore(userAnswers);
    alert(`Your Score: ${score}`);

    // Add score to the local storage leaderboard
    addToLeaderboard(username, score);

    // Redirect to the leaderboard page
    window.location.href = "leaderboard.html";
}

function calculateScore(userAnswers) {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    return score;
}

function addToLeaderboard(username, score) {
    let leaderboard = getLeaderboardFromStorage();
    if (!leaderboard) {
        leaderboard = [];
    }
    leaderboard.push({ username, score });
    setLeaderboardToStorage(leaderboard);
}

function getLeaderboardFromStorage() {
    const leaderboardJSON = localStorage.getItem("leaderboard");
    return leaderboardJSON ? JSON.parse(leaderboardJSON) : null;
}

function setLeaderboardToStorage(leaderboard) {
    const leaderboardJSON = JSON.stringify(leaderboard);
    localStorage.setItem("leaderboard", leaderboardJSON);
}

function displayLeaderboard() {
    const leaderboard = getLeaderboardFromStorage();
    const scoreList = document.getElementById("scoreList");

    if (leaderboard) {
        leaderboard.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.username}: ${entry.score} points`;
            scoreList.appendChild(listItem);
        });
    }
}

function goToQuizPage() {
    window.location.href = "index.html";
}
