document.addEventListener('DOMContentLoaded', () => {
  // editor code
  const submitBtn = document.querySelector('#submit-btn');


 // frogger code
 const squares = document.querySelectorAll('.grid div');
 const timeLeft = document.querySelector('#time-left');
 const result = document.querySelector('#result');
 const startBtn = document.querySelector('#button');
 const carsLeft = document.querySelectorAll('.car-left');
 const carsRight = document.querySelectorAll('.car-right');
 const logsLeft = document.querySelectorAll('.log-left')
 const logsRight = document.querySelectorAll('.log-right')
 const width = 9;
 let currentIndex = 76;
 let currentTime = 20;
 let timerId = null;
 let frogImage = null;
 let frogElement = null;
 // render frog on the starting block
 function swapFrogClasses() {
  const frogElements = document.querySelectorAll('.frog');
  frogElements.forEach((element) => {
    element.classList.remove('frog');
    element.classList.add('froggie');
  });

  const frogTextElements = document.querySelectorAll(':contains("frog")'); // Assuming you want to change text content as well
  frogTextElements.forEach((element) => {
    element.textContent = element.textContent.replace(/frog/g, 'froggie');
  });
}

 squares[currentIndex].classList.add('frog');

 //  choose and set icon
 function changeCharacter() {
   const characterRadio = document.querySelector('input[name="character"]:checked');
   if (characterRadio) {
     const characterId = characterRadio.value;
     if (characterId === 'froggie') {
       swapFrogClasses();
     }
     else if (characterId === 'monopoly') {
       frogImage = document.createElement('img');
       frogImage.src = '/media/monopoly-man1.png';
       frogImage.classList.add('frog-image');
       frogElement = document.querySelector('.frog');
       frogElement.appendChild(frogImage);
     }
     else {
       if (frogElement && frogImage) {
         frogElement.removeChild(frogImage);
         frogImage = null;
       }
     }
   }
 }

 // move frog - using up down arrows etc
 function moveFrog(e) {
   if(frogImage){
     frogImage = document.querySelector('.frog-image'); // Get the frog image element
     frogElement.removeChild(frogImage);
     squares[currentIndex].classList.remove('frog');
     switch (e.keyCode) {
       case 37:
         if(currentIndex % width !== 0) currentIndex -=1;
         break;
       case 38:
         if(currentIndex - width >= 0) currentIndex -= width
         break;
       case 39:
         if(currentIndex % width < width - 1) currentIndex +=1;
         break;
       case 40:
         if(currentIndex + width < width * width) currentIndex += width;
         break;
     }
     squares[currentIndex].classList.add('frog');
     frogElement = document.querySelector('.frog');
     frogElement.appendChild(frogImage);
     moveCharacterWithFrog();
     lose();
     win();
   }
   else
   {
     squares[currentIndex].classList.remove('frog');
     switch (e.keyCode) {
       case 37:
         if(currentIndex % width !== 0) currentIndex -=1;
         break;
       case 38:
         if(currentIndex - width >= 0) currentIndex -= width
         break;
       case 39:
         if(currentIndex % width < width - 1) currentIndex +=1;
         break;
       case 40:
         if(currentIndex + width < width * width) currentIndex += width;
         break;
     }
     squares[currentIndex].classList.add('frog');
     moveCharacterWithFrog();
     lose();
     win();
   }
 }

 let obs1Image = null;
 let backg1Image = null;

 // choose and set obstacle1
 function changeObstacle1() {
   const obstacle1Radio = document.querySelector('input[name="obstacle1"]:checked');
   if (obstacle1Radio) {
     const obstacle1Id = obstacle1Radio.value;
     if (obstacle1Id === 'car') {
       obs1Image = document.createElement('img');
       obs1Image.src = '/media/cars-1.png';
       obs1Image.classList.add('obs1-image');
       obs1Elements = document.querySelectorAll('.c1');
       obs1Elements.forEach(element => {
         let clonedImage = obs1Image.cloneNode(true);
         element.appendChild(clonedImage);
       })
     }
   }
 }

 // movecars
 function autoMoveCars() {
   carsLeft.forEach(carLeft => moveCarLeft(carLeft));
   carsRight.forEach(carRight => moveCarRight(carRight));

 }

 // move car left on time loop
 function moveCarLeft(carLeft) {
   switch (true) {
     case carLeft.classList.contains('c1'):
       carLeft.classList.remove('c1');
       carLeft.classList.add('c2');
       newIndex = currentIndex + 1;
       break;
     case carLeft.classList.contains('c2'):
       carLeft.classList.remove('c2');
       carLeft.classList.add('c3');
       newIndex = currentIndex + 1;
       break;
     case carLeft.classList.contains('c3'):
       carLeft.classList.remove('c3');
       carLeft.classList.add('c1');
       newIndex = currentIndex + 1;
       break;
     }
 }

 // move car right
 function moveCarRight(carRight) {
   switch (true) {
     case carRight.classList.contains('c1'):
       carRight.classList.remove('c1');
       carRight.classList.add('c3');
       break;
     case carRight.classList.contains('c2'):
       carRight.classList.remove('c2');
       carRight.classList.add('c1');
       break;
     case carRight.classList.contains('c3'):
       carRight.classList.remove('c3');
       carRight.classList.add('c2');
       break;
     }
   }

   // move logs
 function autoMoveLogs() {
   logsLeft.forEach(logLeft => moveLogLeft(logLeft));
   logsRight.forEach(logRight => moveLogRight(logRight));
 }

 // move logs left on time loop
 function moveLogLeft(logLeft) {
   switch (true) {
     case logLeft.classList.contains('l1'):
       logLeft.classList.remove('l1');
       logLeft.classList.add('l2');
       break;
     case logLeft.classList.contains('l2'):
       logLeft.classList.remove('l2');
       logLeft.classList.add('l3');
       break;
     case logLeft.classList.contains('l3'):
       logLeft.classList.remove('l3');
       logLeft.classList.add('l4');
       break;
     case logLeft.classList.contains('l4'):
       logLeft.classList.remove('l4');
       logLeft.classList.add('l5');
       break;
     case logLeft.classList.contains('l5'):
       logLeft.classList.remove('l5');
       logLeft.classList.add('l1');
       break;
   }
 }

 // move logs right
 function moveLogRight(logRight) {
   switch (true) {
     case logRight.classList.contains('l1'):
       logRight.classList.remove('l1');
       logRight.classList.add('l5');
       break;
     case logRight.classList.contains('l2'):
       logRight.classList.remove('l2');
       logRight.classList.add('l1');
       break;
     case logRight.classList.contains('l3'):
       logRight.classList.remove('l3');
       logRight.classList.add('l2');
       break;
     case logRight.classList.contains('l4'):
       logRight.classList.remove('l4');
       logRight.classList.add('l3');
       break;
     case logRight.classList.contains('l5'):
       logRight.classList.remove('l5');
       logRight.classList.add('l4');
       break;
     }
   }

 // ending game functions
 function win() {
   if (squares[4].classList.contains('frog'))
   {
     result.innerHTML = "You won!";
     squares[currentIndex].classList.remove('frog');
     clearInterval(timerId);
     document.removeEventListener('keyup', moveFrog)
   }
 }

 function lose() {
   if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1')) || (squares[currentIndex].classList.contains('l5')) || (squares[currentIndex].classList.contains('l4'))) {
     result.innerHTML = 'You lose';
     squares[currentIndex].classList.remove('frog');
     clearInterval(timerId);
     document.removeEventListener('keyup', moveFrog)
   }
 }

 // move character with green box
 let frogPosition = currentIndex;
 function moveCharacterWithFrog() {
   if (frogImage) {
     // Remove frog image from the previous square if it's a child
     let prevSquare = squares[currentIndex + 1];
     if (prevSquare.contains(frogImage)) {
       prevSquare.removeChild(frogImage);
     }
     // Add frog image to the current square
     squares[currentIndex].appendChild(frogImage);

     // Update the frog position
     frogPosition = currentIndex;
   }
 }

//move frog left with log
 function moveWithLogLeft() {
   if (currentIndex >= 27 && currentIndex < 35) {
     if(frogImage) {
       let prevSquare = squares[currentIndex + 1];
       if (prevSquare.contains(frogImage)) {
         prevSquare.removeChild(frogImage);
       }
       squares[currentIndex].classList.remove('frog');
       currentIndex += 1;
       squares[currentIndex].classList.add('frog');
       squares[currentIndex].appendChild(frogImage);
     }
     else
     {
       squares[currentIndex].classList.remove('frog');
       currentIndex += 1;
       squares[currentIndex].classList.add('frog');
       moveCharacterWithFrog();
     }
   }
 }

 // move frog right with log
 function moveWithLogRight() {
   if (currentIndex >= 18 && currentIndex < 26) {
     if(frogImage) {
       let prevSquare = squares[currentIndex + 1];
       if (prevSquare.contains(frogImage)) {
         prevSquare.removeChild(frogImage);
       }
       squares[currentIndex].classList.remove('frog');
       currentIndex += 1;
       squares[currentIndex].classList.add('frog');
       squares[currentIndex].appendChild(frogImage);
     }
     else
     {
       squares[currentIndex].classList.remove('frog');
       currentIndex -= 1;
       squares[currentIndex].classList.add('frog');
       moveCharacterWithFrog();
     }
   }
 }

 // initiate functions every second
 function movePieces() {
   currentTime --;
   timeLeft.textContent = currentTime;
   autoMoveLogs();
   autoMoveCars();
   moveCharacterWithFrog();
   moveWithLogLeft();
   moveWithLogRight();
   lose();
 }

 // timer start
 startBtn.addEventListener('click', startTimer);
 function startTimer() {
   if(timerId) {
     clearInterval(timerId);
   }
   else{
     timerId = setInterval(movePieces, 1000);
     document.addEventListener('keyup', moveFrog);
     autoMoveLogs();
   }
 }

 // change theme
  submitBtn.addEventListener('click', changeTheme);
  function changeTheme() {
    changeCharacter();
  }
});
