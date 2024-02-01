const pomodoro = document.querySelector('#pomodoro');
const short = document.querySelector('#short');
const long = document.querySelector('#long');
const countdown = document.querySelector('#countdown');

const reset = document.querySelector('#reset');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');

const image = document.querySelector('#image');


let timerId;



const timerObject = JSON.parse(localStorage.getItem('timerObject')) || {
    state: "stopped",
    initialTime: 1500,
    secondsLeft: 1500,
    lastUpdate: Date.now(),
};

function ajustTimer() {
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime -  timerObject.lastUpdate)/ 1000);

    if (timerObject.state === 'run'){
        
        timerObject.secondsLeft = Math.max(timerObject.secondsLeft - elapsed, 0);

        if(timerObject.secondsLeft === 0) {
            stopTimer();
        } else {
            
            startTimer();
        }
    }
}


function updateTimer(){
    let minutes = Math.floor(timerObject.secondsLeft/60) ;
    let seconds = timerObject.secondsLeft%60;
    if (seconds<10){
        seconds = '0' + seconds;
    }
    countdown.textContent = `${minutes} : ${seconds}`;   
}

function saveTimerState(){
    timerObject.lastUpdate = Date.now()
    localStorage.setItem('timerObject', JSON.stringify(timerObject));
}

ajustTimer();
updateTimer();


short.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 300;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/tea-tomato-cartoon-1.svg?v=1669576628580');
    saveTimerState();
})

long.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 900;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/chill-Tomato-cartoon-1.svg?v=1669576621824');
    saveTimerState();
})
pomodoro.addEventListener('click', function(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.initialTime = 1500;
    timerObject.secondsLeft = timerObject.initialTime;
    updateTimer();
    image.setAttribute('src', 'https://cdn.glitch.global/9af89f45-29c6-43a3-a0cb-e450d9fbcc77/tomato-cartoon-1.svg?v=1669576632248');
    saveTimerState();
})

function startTimer(){

    clearInterval(timerId);
    timerObject.state = 'run';
    saveTimerState();
    timerId = setInterval(function(){
        updateTimer();
            timerObject.secondsLeft--;

            if (timerObject.secondsLeft <= 0) {
                stopTimer();
                timerObject.secondsLeft = 0;
    }       
    }, 1000);
}


start.addEventListener('click', startTimer);

    
function stopTimer(){
    clearInterval(timerId);
    timerObject.state = 'stopped';
    timerObject.lastUpdate = Date.now();
    saveTimerState();
}
    

pause.addEventListener('click', function(){
    timerObject.state = 'stopped';
    clearInterval(timerId);
    saveTimerState();
    
})


reset.addEventListener('click', function(){
    timerObject.secondsLeft = timerObject.initialTime;
    timerObject.state = 'stopped';
    updateTimer();
    clearInterval(timerId);
    saveTimerState();
})   
    
    
// animation

gsap.fromTo('#image', 
    { scale: 0, opacity: 0 }, 
    {
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: "elastic.out(1, 0.3)", 
        onComplete: function() {
           
            gsap.to('#image', {
                scale: 1.05, 
                repeat: -1, 
                yoyo: true,
                duration: 1.5, 
                ease: "power1.inOut" 
            });
        }
    }
);
window.onload = function() {
    gsap.from('#header', {
        duration: 1,
        opacity: 0,
        y: -50,
        ease: 'power3.out'
    });

    gsap.from('#buttons button', {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('#pic', {
        duration: 1,
        opacity: 0,
        scale: 0.5,
        ease: 'power3.out',
        delay: 1.2
    });

    gsap.from('#countdown-container', {
        duration: 1,
        opacity: 0,
        x: -100,
        ease: 'power3.out',
        delay: 1.4
    });

    gsap.from('#btns button', {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 1.6
    });
}




