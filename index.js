/*
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const cardWidth = 100;
const cardHeight = 100;
const paddingX = 10;
const paddingY = 10;
const cols = 4;
const rows = 3;

canvas.width = (cardWidth + paddingX) * cols - paddingX;
canvas.height = (cardHeight + paddingY) * rows - paddingY;

const cards = [];

const images = [];
const items = []
const imagePaths = ['./images/apple.png', './images/banana.png', './images/cat.png', './images/fish.png', './images/monkey.png', './images/mushroom.png'];

imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;

  const item =   Object.create({
firstImage: img,
firstId: "",
secondImage: img, 
secondId: ""
    })
items.push(item)
  //  images
    images.push(img);
    images.push(img);  
});
 
function shuffle(array) {
  
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
      //  images[]
       [array[i], array[j]] = [array[j], array[i]];
    }
   for(let i=0; i< array.length; i++) {
    
   }
}

shuffle(images);
console.log( images)
const frontImage = new Image();
frontImage.src = './images/1.jpg';

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cards.forEach(card => {
        if (mouseX >= card.x && mouseX <= card.x + cardWidth &&
            mouseY >= card.y && mouseY <= card.y + cardHeight) {
            card.flipped = !card.flipped;
        }
    });

    drawBoard();
});

for (let i = 0; i < cols * rows; i++) {
    const x = (i % cols) * (cardWidth + paddingX);
    const y = Math.floor(i / cols) * (cardHeight + paddingY);
    cards.push({ x, y, flipped: false, image: images[i] });
}

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

drawBoard();
*/


/*
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const cardWidth = 100;
const cardHeight = 100;
const paddingX = 10;
const paddingY = 10;
const cols = 4;
const rows = 3;

canvas.width = (cardWidth + paddingX) * cols - paddingX;
canvas.height = (cardHeight + paddingY) * rows - paddingY;

const cards = [];

const images = [];
const imagePaths = ['./images/apple.png', './images/banana.png', './images/cat.png', './images/fish.png', './images/monkey.png', './images/mushroom.png'];

imagePaths.forEach(path => {
   const img = new Image();
   img.src = path;

 const item =   Object.create({
//firstImage: img,

   })
   images.push(img);
   images.push(img);  
});
 
function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
   }
}

shuffle(images);

const frontImage = new Image();
frontImage.src = './images/1.jpg';

canvas.addEventListener('click', function (event) {
   const rect = canvas.getBoundingClientRect();
   const mouseX = event.clientX - rect.left;
   const mouseY = event.clientY - rect.top;

   cards.forEach(card => {
       if (mouseX >= card.x && mouseX <= card.x + cardWidth &&
           mouseY >= card.y && mouseY <= card.y + cardHeight) {
           card.flipped = !card.flipped;
       }
   });

   drawBoard();
});

for (let i = 0; i < cols * rows; i++) {
   const x = (i % cols) * (cardWidth + paddingX);
   const y = Math.floor(i / cols) * (cardHeight + paddingY);
   cards.push({ x, y, flipped: false, image: images[i] });
}

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

drawBoard();







*/















const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const cardWidth = 100;
const cardHeight = 100;
const paddingX = 10;
const paddingY = 10;
const cols = 4;
const rows = 3;
let countOfSelectedImages = 0
canvas.width = (cardWidth + paddingX) * cols - paddingX;
canvas.height = (cardHeight + paddingY) * rows - paddingY;

let cards = [];

const images = [];
const imagePaths = ['./images/apple.png', './images/banana.png', './images/cat.png', './images/fish.png', './images/monkey.png', './images/mushroom.png'];
 
let selectedElements = {
    first: "",
    firstId: 0,
    second: "",
    secondId: 0
}
imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
    images.push(img);
    images.push(img);
});

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(images);
 

canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    cards.forEach((card, index) => {
        if (mouseX >= card.x && mouseX <= card.x + cardWidth &&
            mouseY >= card.y && mouseY <= card.y + cardHeight) {
                if (countOfSelectedImages < 2) {
                    card.flipped = !card.flipped;
                    countOfSelectedImages++
                    drawBoard();
                    
              //  selectedElements.push(card)
              if(countOfSelectedImages==1) {
                selectedElements.first=card.image.src
                selectedElements.firstId= index
              }
              if(countOfSelectedImages==2) {
                selectedElements.second=card.image.src
                selectedElements.secondId= index
              }
              
             
               console.log(JSON.stringify(selectedElements))
               if(selectedElements.first== selectedElements.second) {
                alert(1)
                selectedElements.first=""
                selectedElements.second=""
                countOfSelectedImages = 0
               }
            } else {
                console.log("failure")
                cards.forEach((item, id) => {
                    if(item.id==selectedElements.firstId) {
                       item.flipped = false
                    }

                    if(item.id==selectedElements.secondId) {
                        item.flipped = false
                     }
                }) 
                  selectedElements.first=""
                selectedElements.second=""
                countOfSelectedImages = 0
                drawBoard();

 
    
            }
             
        }
    });

    drawBoard();
});

for (let i = 0; i < cols * rows; i++) {
    const x = (i % cols) * (cardWidth + paddingX);
    const y = Math.floor(i / cols) * (cardHeight + paddingY);
    cards.push({ x, y, flipped: false, image: images[i], id: i });
}

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

drawBoard();

/*
*/


