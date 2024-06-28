
let playersStep;
let firstPlayerCounter = 0
let secondPlayerCounter = 0
let player1 = document.querySelector(".player1__text")
let player2 = document.querySelector(".player2__text")
let currentStep = document.querySelector(".header__players-step")
let cols = 3;
let rows = 4;
const images = [];
const imagePaths = ['./images/apple.png', './images/banana.png', './images/cat.png', './images/fish.png', './images/monkey.png', './images/mushroom.png'];
let cards = [];
const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".modal__btn");
const modalInner = document.querySelector(".modal__inner");
const modalOverlay = document.querySelector(".modal__overlay");
let difficulty = "";
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const cardWidth = 100;
const cardHeight = 100;
const paddingX = 10;
const paddingY = 10;
modalBtn.addEventListener("click", () => {
    console.log("NUM")
    console.log(Math.floor(Math.random() * 2) + 1)
    playersStep = Math.floor(Math.random() * 2) + 1 == 1 ? true : false

    currentStep.textContent = playersStep == true ? `Player N${1} is currently playing` : `Player N${2} is currently playing`
    document.querySelector(".header__players-step").textContent = playersStep ? "Player N1 is currently playing" : "Player N2 is currently playing"

    modalInner.style.transform = "translateX(200%)";
    modalOverlay.style.opacity = "0";
    modal.style.zIndex = "-1";
    difficulty = document.querySelector(".modal__list").value;
    console.log(difficulty);
    if (difficulty == "easy") {
        cols = 3;
        rows = 4;
    }
    if (difficulty == "medium") {
        imagePaths.push("./images/lion.png")
        imagePaths.push("./images/bird.png")
        cols = 4;
        rows = 4;
    }
    if (difficulty == "difficult") {
        imagePaths.push("./images/lion.png")
        imagePaths.push("./images/bird.png")
        imagePaths.push("./images/dog.png")
        imagePaths.push("./images/watermelon.png")
        imagePaths.push("./images/mouse.png")
        cols = 4;
        rows = 5;
    }

    canvas.width = (cardWidth + paddingX) * cols - paddingX;
    canvas.height = (cardHeight + paddingY) * rows - paddingY;

    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
        images.push(img);
        images.push(img);
    });
    shuffle(images);
    cards = [];
    for (let i = 0; i < cols * rows; i++) {
        const x = (i % cols) * (cardWidth + paddingX);
        const y = Math.floor(i / cols) * (cardHeight + paddingY);
        cards.push({ x, y, flipped: false, image: images[i], id: i });
    }
    drawBoard();
});

let countOfSelectedImages = 0;
let selectedElements = {
    first: "",
    firstId: 0,
    second: "",
    secondId: 0
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cards.forEach((card, index) => {
        if (mouseX >= card.x && mouseX <= card.x + cardWidth &&
            mouseY >= card.y && mouseY <= card.y + cardHeight) {
            if (countOfSelectedImages < 2) {
                card.flipped = !card.flipped;
                countOfSelectedImages++;
                drawBoard();

                if (countOfSelectedImages == 1) {
                    selectedElements.first = card.image.src;
                    selectedElements.firstId = index;
                }
                if (countOfSelectedImages == 2) {
                    selectedElements.second = card.image.src;
                    selectedElements.secondId = index;
                }

                console.log(JSON.stringify(selectedElements));
                if (selectedElements.first == selectedElements.second) {
                    playersStep == true ? firstPlayerCounter++ : secondPlayerCounter++
                    playersStep == true ? player1.textContent = `Player 1: ${firstPlayerCounter}` : player2.textContent = `Player 2: ${secondPlayerCounter}`
                    selectedElements.first = "";
                    selectedElements.second = "";
                    countOfSelectedImages = 0;

                   
                    if (cards.every(item => item.flipped == true)) {
                       let winText = document.querySelector(".win-modal-title")
                       if(firstPlayerCounter>secondPlayerCounter) {
                        winText.textContent = "Player 1 win!"
                       } 
                       if(firstPlayerCounter<secondPlayerCounter) {
                        winText.textContent = "Player 2 win!"
                       } 
                       if(firstPlayerCounter==secondPlayerCounter) {
                         winText.textContent = "Draw!"
                       }
                        document.querySelector(".win-modal").style.transform = "translateX(0%)"
                        document.querySelector(".win-modal__overlay").style.opacity = "0.5"
                    }
                  
                }
            } else {
                playersStep = !playersStep
                currentStep.textContent = playersStep == true ? `Player N${1} is currently playing` : `Player N${2} is currently playing`
                cards.forEach((item, id) => {
                    if (item.id == selectedElements.firstId) {
                        item.flipped = false;
                    }
                    if (item.id == selectedElements.secondId) {
                        item.flipped = false;
                    }
                });
                selectedElements.first = "";
                selectedElements.second = "";
                countOfSelectedImages = 0;
                drawBoard();
            }
        }
    });

    drawBoard();
});

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cards.forEach(card => {
        if (!card.flipped) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(card.x, card.y, cardWidth, cardHeight);
        } else {
            ctx.drawImage(card.image, card.x, card.y, cardWidth, cardHeight);
        }
    });
}

