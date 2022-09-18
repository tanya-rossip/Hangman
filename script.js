(function(){
  'use strict'

  const btnStart = document.getElementById('btn-start')
  const btnRestart = document.getElementById('btn-restart')
  const canvas = document.getElementById('canvas');
  const heading = document.getElementById('heading')
  const words = ['through', 'door', 'cold', 'something', 'home', 'somehow', 'scarf', 'sister', 'house', 'drawer', 'sweet', 'disposition', 'singing', 'car', 'upstate', 'autumn', 'leaves', 'falling', 'pieces', 'picture', 'magic', 'little', 'town', 'street', 'almost', 'red', 'wind', 'hair', 'remember', 'well', 'photo', 'album', 'counter', 'cheeks', 'kid', 'glasses', 'twin', 'bed', 'mother', 'stories', 'tea', 'ball', 'team', 'past', 'future', 'nothing', 'forget', 'enough', 'middle', 'night', 'dancing', 'kitchen', 'refrigerator', 'light', 'stairs', 'maybe', 'translation', 'thing', 'masterpiece', 'running', 'scared', 'call', 'break', 'promise', 'casually', 'cruel', 'honest', 'piece', 'paper', 'lying', 'time', 'fly', 'old', 'trying', 'find', 'shirt', 'mail', 'back', 'walk', 'alone', 'first', 'week', 'innocence', 'smells', 'before', 'one', 'real', 'ever', 'rare'];
  const letters = document.getElementById('letters');
 

  btnRestart.addEventListener('click', function() {
    window.location.reload();
  })

  //game starts
  btnStart.addEventListener('click', function() {
  heading.style.visibility = 'initial';
  letters.style.display = 'flex';
  btnStart.style.display = 'none';
  btnRestart.style.display = 'initial';

  // return random word
  let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  let answerArray = [];
  let remainingLetters = word.length;
  let livesLeft = 10;

  // return anwer array
  let setupAnswerArray = function (word) {
    for (var i = 0; i < word.length; i++) {
      answerArray[i] = '_';
      letters.innerHTML =  `Hidden word: ${answerArray.join(' ')}`;
      letters.style.visibility = 'initial';
    }
    return answerArray;
  };
  console.log(setupAnswerArray(word), word)

  
  // drawing of a hangman
  const drawing = function() {
    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;

    switch (livesLeft) {
    case 9:
      ctx.moveTo(85, 125); 
      ctx.lineTo(180, 125);
      ctx.stroke();    
      break;
    case 8:
      ctx.beginPath();
      ctx.moveTo(100, 125); 
      ctx.lineTo(100, 52);
      ctx.stroke();    
      break;
    case 7:
      ctx.beginPath();
      ctx.moveTo(160, 53);  
      ctx.lineTo(85, 53);
      ctx.stroke();    
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(150, 63); 
      ctx.lineTo(150, 53);
      ctx.stroke();    
      break;
    case 5:
      ctx.beginPath();
      ctx.arc(150, 70, 7, 0, Math.PI * 2, false);
      ctx.stroke()
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(150, 77); 
      ctx.lineTo(150, 100);
      ctx.stroke()
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(150, 80);
      ctx.lineTo(140, 90);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(160, 90);
      ctx.lineTo(150, 80);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(140, 115);
      ctx.stroke();  
      break; 
      case 0:
        ctx.beginPath();
        ctx.moveTo(160, 115); 
        ctx.lineTo(150, 100);
        ctx.stroke();
        letters.innerHTML = `Hidden word was: ${word}`;
        heading.innerHTML = 'Game over!';
      break;        
    }
  }

     
  // letters that've been pressed + checking them for correct guess
  document.addEventListener('keyup', function(event) {
  heading.style.visibility = 'initial';
  let guess = event.code.slice(3);
    for (let j = 0; j < word.length; j++) {
      if (guess === word[j] && answerArray[j] === '_') {
        answerArray[j] = guess;
        remainingLetters--;
        livesLeft++;
        letters.innerHTML = `Hidden word: ${answerArray.join(' ')}`;
      }
    }
    for (let ind = 0; ind < word.length; ind++)
   if (guess.length > 1 || guess !== word[ind]) {
      livesLeft--;
      break;
    }
    if (remainingLetters === 0) {
      letters.innerHTML = `Congrats! ${answerArray.join('')} is correct!`;   
      heading.innerHTML = 'You win!'  ;
    } 
    drawing();
  })

  })

   
})()
