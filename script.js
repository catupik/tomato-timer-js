const pomodoro = document.querySelector('#pomodoro');
const short = document.querySelector('#short');
const long = document.querySelector('#long');
const countdown = document.querySelector('#countdown');

const reset = document.querySelector('#reset');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');

const image = document.querySelector('#image');


let timerId;

const timerObject = {
    state: "stopped",
    initialTime: 1500,
    secondsLeft: 1500,
    
}

short.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 300;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/tea-tomato-cartoon-1.svg?v=1669576628580');
})

long.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 900;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/chill-Tomato-cartoon-1.svg?v=1669576621824');
})
pomodoro.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 1500;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/tomato-cartoon-1.svg?v=1669576632248');
})

function updateTimer(){
    let minutes = Math.floor(timerObject.secondsLeft/60) ;
    let seconds = timerObject.secondsLeft%60;
    if (seconds<10){
        seconds = '0' + seconds;
    }
    countdown.textContent = `${minutes} : ${seconds}`;
    
}
updateTimer();

start.addEventListener('click', function func(){
    if (timerObject.state === 'run') return;
    timerObject.state = 'run';
    
    timerId = setInterval(function(){
    updateTimer();
    timerObject.secondsLeft--;
    if (timerObject.secondsLeft <= 0) {
        stopTimer();
        timerObject.secondsLeft = 0;
    }   
    
        function stopTimer(){
        clearInterval(timerId);
    }


    }, 1000)
})
    
    

pause.addEventListener('click', function(){
    timerObject.state = 'stopped';
    clearInterval(timerId);
    
})


reset.addEventListener('click', function(){
    timerObject.secondsLeft = timerObject.initialTime;
    timerObject.state = 'stopped';
    updateTimer();
    clearInterval(timerId);
    
})   
    
    


