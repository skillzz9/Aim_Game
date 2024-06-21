function game_innit(){
    // getting the container element
    const container = document.querySelector('.container');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('back-button');
    document.body.appendChild(backButton);

    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');
    const timer = document.createElement('h2');

    timer.textContent = '3';
    timer.classList.add('timer');
    document.body.appendChild(timer);

    timerContainer.appendChild(timer); // Append the timer to the timer container
    document.body.appendChild(timerContainer);

    let countdown = 3;
    const countDownInterval = setInterval(()=>{
        countdown--;
        timer.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countDownInterval);
            timerContainer.removeChild(timer);
            document.body.removeChild(timerContainer);
            document.body.removeChild(backButton);
            game_start();

        }
    }, 1000);

    backButton.addEventListener('click', () =>{
        document.body.removeChild(backButton);
        if(countdown !== 0){
            timerContainer.removeChild(timer);
            document.body.removeChild(timerContainer);

        }
        homepage();
    });





}

function homepage(){
    const container = document.querySelector('.container');
    const originalContent = `
                <h1>THE AIM GAME</h1>
                <div class="minibox">
                    <h2>Personal Best</h2>
                    <div class="personalBest">
                        <p> 0 <img src="images/target.png" alt="" style="width: 30px; height: 30px;"></p>
                        <button onclick="game_innit()" class="Play">Play</button>
                        <button class="Settings">Settings</button>
                    </div>
                </div>
            `;
    container.innerHTML = originalContent;
}

function game_start(){
    const timerGameContainer = document.createElement('div');
    timerGameContainer.classList.add('timerGameDiv');

    // creating the main timer 
    const timerGame = document.createElement('h2');
    timerGame.classList.add('timerGame');
    timerGame.textContent = '10';

    // creating the score with the score number that changes every click
    const scoreObj = { score: 0 }; // Use an object to wrap score
    const scoreTitle = document.createElement('h2');
    scoreTitle.classList.add('score');
    scoreTitle.textContent = 'Score: ' + scoreObj.score;

    // appending all the nessecarry things to the container and then adding that to the body
    timerGameContainer.appendChild(timerGame);
    timerGameContainer.appendChild(scoreTitle);
    document.body.appendChild(timerGameContainer);

    // main timer logic 
    let timerGameCountdown = 10;
    const timerGameCountdownInterval = setInterval(()=>{
        timerGameCountdown--;
        if(timerGameCountdown === 0){
            document.body.removeChild(backButton);
            clearInterval(timerGameCountdownInterval);
            timerGameContainer.removeChild(timerGame);
            document.body.removeChild(timerGameContainer);
            game_end(scoreObj.score);
        }

        timerGame.textContent = timerGameCountdown;

    }, 1000); 

    // create a new back button that goes back to the home page (maybe make a function for it)
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('back-button');
    document.body.appendChild(backButton);

    backButton.addEventListener('click', () =>{
        document.body.removeChild(backButton);
        timerGameContainer.removeChild(timerGame);
        document.body.removeChild(timerGameContainer);
        homepage();
    });

    spawn_target(scoreObj, scoreTitle);

}

function game_end(score){
    const endTextContainer = document.createElement("div");
    endTextContainer.classList.add('endGameContainer');
    const endText = document.createElement("h2");
    endText.classList.add('endGameText');
    endText.textContent = "Game Over";

    const scoreEndText = document.createElement("h2");
    scoreEndText.classList.add('scoreNumber');
    scoreEndText.textContent = "Score: " + score;

    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.classList.add('playAgain');

    endTextContainer.appendChild(endText);
    endTextContainer.appendChild(scoreEndText);
    endTextContainer.appendChild(playAgain);
    document.body.appendChild(endTextContainer);

    playAgain.addEventListener('click', () =>{
        document.body.removeChild(backButton);
        endTextContainer.removeChild(endText);
        document.body.removeChild(endTextContainer);
        game_innit();
    });

    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.classList.add('back-button');
    document.body.appendChild(backButton);

    backButton.addEventListener('click', () =>{
        document.body.removeChild(backButton);
        endTextContainer.removeChild(endText);
        document.body.removeChild(endTextContainer);
        homepage();
    });
}

function spawn_target(scoreObj, scoreTitle){
    const target = document.createElement('button');
    const img = document.createElement('img');
    img.src = 'images/target.png'; // Replace with your image path
    img.style.width = '50px';
    img.style.height = '50px';

    target.style.border = 'none'; // Remove border
    target.style.padding = '0'; // Remove padding
    target.style.background = 'none'; // Remove background

    target.appendChild(img);

    const mainContainer = document.querySelector('.container');

    const containerWidth = mainContainer.clientWidth;
    const containerHeight = mainContainer.clientHeight;

    const randomTop = Math.random() * (containerHeight - 150);
    const randomLeft = Math.random() * (containerWidth - 400);

    target.style.position = 'absolute';
    target.style.top = randomTop + 'px';
    target.style.left = randomLeft + 'px';


    document.body.appendChild(target);

    target.addEventListener('click', () => {
        scoreObj.score++;
        scoreTitle.textContent = 'Score: ' + scoreObj.score;
        document.body.removeChild(target);
        spawn_target(scoreObj, scoreTitle);
    });

}