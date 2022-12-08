// rock, paper, scissor -- game logic

const pScoreText = document.querySelector('.p-count');
const cScoreText = document.querySelector('.c-count');
const pChoiceText = document.querySelector('.pChoice');
const cChoiceText = document.querySelector('.cpuChoice');
const resultText = document.querySelector('.result');
const update = document.querySelector('.post_score');

update.textContent = "post your score ";
pScoreText.textContent = "Your Score: " + currUserScore;
cScoreText.textContent = "CPU Score: " + currCompScore;

function game() {
    function playGame() {
        // Select html elements
        const rockBtn = document.querySelector('.rock'); 
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        // define player moves
        const playerOptions = [rockBtn, paperBtn, scissorBtn];
        const cpuOptions = ['rock','paper','scissors']
        
        // Function to start playing game
        playerOptions.forEach(option => { option.addEventListener('click',function() { // for each button wait for click
                //random roll for cpu's choice
                const n = Math.floor(Math.random() * 3);
                const cpuChoice = cpuOptions[n];

                // Function to check who wins, passes player as text content of btn
                playerChoice = (this.innerText).toLowerCase();
                let playerScore = winner(playerChoice,cpuChoice);

                pChoiceText.textContent = 'you: ' + playerChoice
                cChoiceText.textContent = 'cpu: ' + cpuChoice
                pScoreText.textContent = "Your Score: " + playerScore;
                cScoreText.textContent = "CPU Score: " + currCompScore;
                playGame();
            })
        })
        update.addEventListener('click',() => {
            window.location.reload();
        })
         
    }
 
    // Function to decide winner
    function winner(player,cpu) {

        if(player == cpu){
            resultText.textContent = 'Tie'
            return currUserScore;
        }
        else if(player == 'rock'){
            if(cpu == 'paper'){
                resultText.textContent = 'You Lost';
                currCompScore++;
                return currUserScore;
            }else{
                resultText.textContent = 'You Won!'
                currUserScore++;
                return currUserScore;
            }
        }
        else if(player == 'scissors'){
            if(cpu == 'rock'){
                resultText.textContent = 'You Lost';
                currCompScore++;
                return currUserScore;
            }else{
                resultText.textContent = 'You Won!';
                currUserScore++;
                return currUserScore;
            }
        }
        else if(player == 'paper'){
            if(cpu == 'scissors'){
                resultText.textContent = 'You Lost';
                currCompScore++;
                return currUserScore;
            }else{
                resultText.textContent = 'You Won!';
                currUserScore++;
                return currUserScore;
            }
        }
    } 
}
 
// start game
game();