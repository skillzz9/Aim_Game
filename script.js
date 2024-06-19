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

    const timerGame = document.createElement('h2');
    timerGame.classList.add('timerGame');
    timerGame.textContent = '10'; // Create a new timer element with text content '10'

    timerGameContainer.appendChild(timerGame);
    document.body.appendChild(timerGameContainer);

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

}