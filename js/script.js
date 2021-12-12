//  New document elements 
let input        = document.querySelector('.userAnswer');
let errorMessage = document.querySelector('.error');
let btn          = document.querySelector('.btnSubmit');
let btnRestart   = document.querySelector('.btnRestart');
let infoList     = document.querySelector('.infoList');

let userChoice     = 0;
let randomNumber   = randomInt(1000);
let attemptCounter = 0;


//  hidde error 
errorMessage.style.display = 'none';


//  Gerenate random number
function randomInt(max) {
    return Math.floor(Math.random() * max);
}


//  verify if user input is number
function checkInput() {
    if ( !(isNaN(input.value)) ) {

        errorMessage.style.display = 'none';
        userChoice = input.value;    
        
    
    } else {

        errorMessage.style.display = '';
        input.style.border = "red"

    }
}


//  Verify numbers and add new elements

function checkNumbersAndAddElements() {


    let element       = document.createElement('article');
    let icon          = document.createElement('span');
    let attempt       = document.createElement('p');
    let p             = document.createElement('p');

    icon.className    = 'material-icons';

    attempt.className = 'attempt'

    attempt.textContent = `#${attemptCounter}`;

    if ( randomNumber - userChoice == 0 ) {

        element.className = 'infoTextVictory';
        icon.innerText    = 'check';
        p.textContent     = `Félicitation, ${userChoice} est bien le nombre mystère !`;

        element.append(icon, attempt, p);
        infoList.prepend(element);

        btn.style.display = 'none';
        btnRestart.style.display = 'inline';

        input.disabled = true;
        attemptCounter = 0;

    }  
    else {

        element.className = 'infoText';
        icon.innerText    = 'do_disturb';

        if ( userChoice < randomNumber ) {
            p.textContent     = `Le nombre ${userChoice} est plus petit que le nombre mystère !`;
        } else {
            p.textContent     = `Le nombre ${userChoice} est plus grand que le nombre mystère !`;
        }
        
        element.append(icon, attempt, p);
        infoList.prepend(element);

    }

}

function restart() {

    infoList.innerHTML = '';

    attemptCounter = 0;
    randomNumber   = randomInt(1000);
    userChoice     = 0;

    input.disabled = false;

    btnRestart.style.display = 'none';
    btn.style.display = 'inline';

}

//  Form Action button and input 
document.querySelector('form').addEventListener('submit', (e) => {

    e.preventDefault();

    if(isNaN(input.value) || input.value == ''){
        
        input.style.backgroundColor = 'rgba(255, 55, 55, 0.5)';
        
        setTimeout(() => {input.style.backgroundColor = 'white'}, 500);
        
     }
     else {
       input.style.backgroundColor = 'white';
       attemptCounter++;
       userChoice = input.value;
       input.value = '';
       checkNumbersAndAddElements();
     }





});


// Event on key up to check input data
input.addEventListener('keyup', () => {

    checkInput();
    
});

input.addEventListener('focusin', () => {

    input.placeholder = '';
    
});

input.addEventListener('focusout', () => {

    input.placeholder = 'Choisissez un nombre entre 0 et 1000, puis saisissez le ici.';
    
});

//  Button restart Action.
btnRestart.addEventListener('click', () => {

    restart();

});