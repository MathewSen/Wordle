const dictionary = ["naval", "crane", "strip", "boxer", "outer", "trout", "fjord", "brown", "blaze", "ghoul", "house", "Amber", "water", "clock", "ocean", "pizza", "music", "smile", "apple", "happy", "shoes", "light", "dance", "beach", "jelly", "mango", "quiet", "honey", "sunny", "grape", "cloud", "chair", "dream", "lunch", "fetch", "salsa", "ivory", "frost", "knock", "plump", "shirt", "wreck", "abuse", "logic", "fairy", "bonus", "swirl", "sharp", "puppy", "yacht", "judge", "sugar", "beard", "kitty", "toxic", "thorn", "globe", "fudge", "blush", "frost", "daisy", "coral", "jumbo", "hatch", "dwarf", "lemon", "spear", "frown", "quake", "quack", "waltz", "crisp", "scare", "fancy", "joker", "flame", "swamp", "crown", "tweet", "vital", "poker", "sweep", "pasta", "peace", "punch", "sushi", "scoop", "hinge", "fairy", "glide", "vivid", "jumbo", "flash", "tiger", "roast", "leash", "shade", "awake", "scone", "mirth", "waist", "grasp", "lunge"];

const newGame = (dictionary) => {
    startGame(dictionary);
};

function startGame(data) {
    let dictionary = data;
    let goalWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    let currentWord = '';
    let currentAttempt = 0;
    const keys = [].slice.call(document.querySelectorAll('.key'));
    const attempts = [].slice.call(document.querySelectorAll('.attempt'));
    const letters = 'qwertyuiopasdfghjklzxcvbnm';

    const keyClick = (e) => {
        let letter = true;

        if (e.target.innerHTML === 'BACKSPACE' || e.target.innerHTML === 'ENTER') {
            letter = false;
        }

        if (e.target.innerHTML === 'ENTER') {
            enterWord(goalWord, currentWord);
        }

        if (currentWord.length < 5 && letter) {  
            currentWord += e.target.innerHTML;
        }

        if (e.target.innerHTML === 'BACKSPACE') {  
            currentWord = currentWord.slice(0, -1);
        }
        
        let attempt = [].slice.call(attempts[currentAttempt].querySelectorAll('.letter'));
        
        attempt.forEach(key => { key.innerHTML = ''; });

        for (let i = 0; i < currentWord.length; i++) {
            attempt[i].innerHTML = currentWord[i];
        }
    };

    keys.forEach(key => {
        key.addEventListener('click', keyClick);
    });

    const enterWord = (word, guess) => {
        if (guess.length < 5) {
            showMessage('The word must contain 5 letters', '#3a3a3c', 'white');
            return;
        }

        if (guess.length === 5) {
            matchWord(word, guess);
            currentAttempt++;

            if (currentAttempt === 6) {
                showMessage(`You've lost. The word was: ${goalWord}`, '#3a3a3c', 'white');
                setTimeout(function() {
                    location.reload();
                }, 3000);
                return;
            }

            currentWord = '';
        }
    };

    const matchWord = (goalWord, playerWord) => {
        let won = false;
        if (goalWord.toLowerCase() === playerWord.toLowerCase()) {
          won = true;
        }
      
        let goal = goalWord.toLowerCase().split('');
        let guess = playerWord.toLowerCase().split('');
      
        let toRender = [];
      
        for (let i = 0; i < 5; i++) {
          let status = '';
      
          if (!goal.includes(guess[i])) {
            status = 'grey';
          } else {
            if (guess[i] === goal[i]) {
              status = 'green';
            } else {
              status = 'yellow';
              // Set the background color of the letter on the keyboard to yellow
              const letterKey = document.querySelector(`[data-letter=${guess[i]}]`);
              letterKey.classList.add('yellow');
            }
            delete goal[goal.indexOf(guess[i])];
          }
      
          toRender.push({ letter: guess[i], status: status });
        }
      
        render(toRender, won);
      };
      

    const render = (word, won) => {
        const attemptElements = [].slice.call(attempts[currentAttempt].querySelectorAll('.letter'));
        let knownKeys = [];

        for (let i = 0; i < 5; i++) {
            setTimeout(renderLetter, 300 * i, attemptElements[i], word[i].status);

            knownKeys.push({ key: document.querySelector(`[data-letter=${word[i].letter}]`), status: word[i].status });
        }

        knownKeys.forEach(letter => {
            if (letter.status !== 'yellow') {
                setTimeout(function() { letter.key.classList.add(letter.status); }, 300 * 5);
            }
        });

        if (won) {
            showMessage("You've won!", '#3a3a3c', 'white');
            setTimeout(function() {
                location.reload();
            }, 3000);
            return;
        }
    };

    const renderLetter = (cell, status) => {
        cell.classList.add(status);
    };

    const keyPress = (e) => {
        let key = e.key.toLowerCase();
        if (letters.includes(key) || e.keyCode === 13 || e.keyCode === 8) {
            document.querySelector(`[data-letter=${key}`).click();
        }
    };

    const showMessage = (message, backgroundColor, textColor) => {
        const messageContainer = document.getElementById('message-container');
        const messageText = document.createElement('p');
        messageText.innerText = message;
        messageText.style.margin = '10px'; // Add margin to the text
        messageContainer.innerHTML = ''; // Clear any previous content
        messageContainer.appendChild(messageText);
        messageContainer.style.backgroundColor = backgroundColor;
        messageContainer.style.color = textColor;
        messageContainer.style.display = 'block';
        messageContainer.style.borderRadius = '5px';
        messageContainer.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        messageContainer.style.maxWidth = '500px';
        messageContainer.style.position = 'fixed';
        messageContainer.style.top = '50px';
        messageContainer.style.left = '50%';
        messageContainer.style.transform = 'translate(-50%, -50%)';
        messageContainer.style.fontSize = '20px'
    
        setTimeout(function() {
            messageContainer.style.display = 'none';
        }, 3000);
    };
    

    window.addEventListener('keydown', keyPress);
}

newGame(dictionary);
