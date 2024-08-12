const wordsGame = [
    { word: "apple", hint: "A fruit that keeps the doctor away", letter: '5' },
    { word: "elephant", hint: "The largest land animal", letter: '8' },
    { word: "guitar", hint: "A string instrument often used in rock music", letter: '6' },
    { word: "computer", hint: "An electronic device for storing and processing data", letter: '8' },
    { word: "ocean", hint: "A large body of salt water", letter: '5' },
    { word: "pyramid", hint: "A triangular structure in Egypt", letter: '7' },
    { word: "jazz", hint: "A music genre that originated in the African-American communities", letter: '4' },
    { word: "basketball", hint: "A sport played with a round ball and hoop", letter: '10' },
    { word: "mountain", hint: "A large natural elevation of the Earth's surface", letter: '8' },
    { word: "rainbow", hint: "A spectrum of light appearing in the sky after rain", letter: '7' }
];

let blocks = document.querySelector(".letterBlocks");
let prevBlock = document.querySelector(".prevblock");
let letters = document.querySelectorAll(".letter");
let time = document.querySelector(".timeBlock span");
let scoreNumber = document.querySelector(".scoreNumber");
let start = document.querySelector(".start");
let nextWordButton = document.querySelector('.nextWord');
let hintButton = document.querySelector(".hint");
let hintDisplayed = document.querySelector('.hintShow');

let remainingTime = 30; 
let timer; 
let blockIndex = 0; 
let score = 0;
let randomNumber;

function timeCounter() {
    if (remainingTime > 0) {
        remainingTime--; 
        time.innerText = remainingTime; 
    } else {
        clearInterval(timer); 
        alert("Time's up!"); 
        endGame();
    }
}

start.addEventListener("click", () => {
    clearInterval(timer); 
    remainingTime = 30; 
    time.innerText = remainingTime; 
    timer = setInterval(timeCounter, 1000); 

    randomNumber = Math.floor(Math.random() * wordsGame.length); 
    blockCreator(); 
    setupLetterClickEvents(); 
});


function blockCreator() {
    prevBlock.style.display = "none";
    blocks.innerHTML = ''; 
    let currentWord = wordsGame[randomNumber].word;
    let currentWordLength = currentWord.length;

    for (let i = 0; i < currentWordLength; i++) {
        let block = document.createElement("div");
        block.classList.add("block");
        blocks.appendChild(block);
    }

    blockIndex = 0; 
    prevBlock.innerText = wordsGame[randomNumber].word;
    prevBlock.style.display = "block";
}

function setupLetterClickEvents() {
    letters = document.querySelectorAll(".letter"); 

    letters.forEach(l => {
        l.addEventListener("click", () => {
            let blockElements = document.querySelectorAll(".block");
            if (blockIndex < blockElements.length) {
                blockElements[blockIndex].innerText = l.textContent;
                matchingLetters(blockIndex); 
                blockIndex++;                
            }
        });
    });
}


function matchingLetters(index) {
    let blocks = document.querySelectorAll(".block");
    let currentWord = wordsGame[randomNumber].word;
    console.log(currentWord);
    
    if (blocks[index]) {
        let enteredLetter = blocks[index].textContent.toLowerCase();
        let correctLetter = currentWord[index];
              
        
        if (enteredLetter === correctLetter) {
            blocks[index].style.backgroundColor = "green";
            score += 10;
            scoreNumber.innerHTML=`${score}`
        } else {
            blocks[index].style.backgroundColor = "red";
             score -= 10;
            scoreNumber.innerHTML=`${score}`
        }

        let allCorrect = true;
        blocks.forEach((block, i) => {
            if (block.textContent.toLowerCase() !== currentWord[i]) {
                allCorrect = false;
            }
        });
        
        if (allCorrect) {
            alert(`Congratulations! You guessed the word "${currentWord}" correctly!`);   
            endGame();
        }
    }
    }



hintButton.addEventListener("click", () => {
    hintDisplayed.innerText = wordsGame[randomNumber].hint;
    hintDisplayed.style.display = 'flex';
});

nextWordButton.addEventListener("click", () => {
    clearInterval(timer); 
    remainingTime = 30; 
    time.innerText = remainingTime; 
    timer = setInterval(timeCounter, 1000); 

    randomNumber = Math.floor(Math.random() * wordsGame.length); 
    blockCreator(); 
    setupLetterClickEvents(); 
    hintDisplayed.style.display="none"
});

function endGame() {
    clearInterval(timer);
    
    score = 0;
    scoreNumber.innerHTML = `0`;
    
    blocks.innerHTML = '';
    prevBlock.style.display = "none";
    
    remainingTime = 30;
    time.innerText = remainingTime;
    
    alert(`Game over! Your final score is ${score}`);
    
}