// rock, paper, scissor -- game logic

const game = () => {
    let playerScore = 0;
 
    const playGame = () => {
        // Select html elements
        const rockBtn = document.querySelector('.rock'); 
        const paperBtn = document.querySelector('.paper');
        const scissorBtn = document.querySelector('.scissor');
        // define player moves
        const playerOptions = [rockBtn,paperBtn,scissorBtn];
        const cpuOptions = ['rock','paper','scissors']
         
        // Function to start playing game
        playerOptions.forEach(option => {
            option.addEventListener('click',function(){ // for each button wait for click
                //random roll for
                const n = Math.floor(Math.random() * 3);
                const cpuChoice = cpuOptions[n];
 
                // Function to check who wins, passes player as text content of btn
                player = (this.innerText).toLowerCase();
                winner(player,cpuChoice)
            })
        })
         
    }
 
    // Function to decide winner
    const winner = (player,cpu) => {
        const pChoice = document.querySelector('.pChoice');
        const cpuChoice = document.querySelector('.cpuChoice');
        const result = document.querySelector('.result');
        const pScore = document.querySelector('.p-count');


        if(player == cpu){
            pChoice.textContent = 'you: ' + player
            cpuChoice.textContent = 'cpu: ' + cpu
            result.textContent = 'Tie'
        }
        else if(player == 'rock'){
            if(cpu == 'paper'){
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Lost';
            }else{
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Won!'
                playerScore++;
                pScore.textContent = playerScore;
            }
        }
        else if(player == 'scissors'){
            if(cpu == 'rock'){
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Lost';
            }else{
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Won!';
                playerScore++;
                pScore.textContent = playerScore;
            }
        }
        else if(player == 'paper'){
            if(cpu == 'scissors'){
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Lost';
            }else{
                pChoice.textContent = 'you: ' + player
                cpuChoice.textContent = 'cpu: ' + cpu
                result.textContent = 'You Won!';
                playerScore++;
                pScore.textContent = playerScore;
            }
        }
    }
 
    // play game infinitely
    playGame();
     
}
 
// start game
game();