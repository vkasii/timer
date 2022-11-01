const sel = selector => document.querySelector(selector);
setInterval(() => {
   const dateBox = sel('.date-box');
   const date = new Date();
   
   let day = date.getDate();
   let month = date.getMonth() + 1;
   let year = date.getFullYear();

   if(day < 10) day = 0 + '' + day;
   if(month < 10) month = 0 + '' + month;

   dateBox.innerHTML = `${day} . ${month} . ${year}`;

   const timeBox = sel('.time-box');
   const time = new Date();

   let hour = time.getHours(),
       minutes = time.getMinutes(),
       seconds = time.getSeconds();

   if(hour < 10){
      hour = 0 + '' + hour;
   }

   if(minutes < 10){
      minutes = 0 + '' + minutes;
   }

   if(seconds < 10){
      seconds = 0 + '' + seconds;     
   }

   timeBox.innerHTML = hour + ':' + minutes + ':' + seconds;
   
}, 1000 );

let swHour = 0,
    swMinutes = 0,
    swSeconds = 0,
    swMs = 0,
    stopwatchInterval;

function stopwatch(){
   stopwatchInterval = setInterval(() => {
      swMs++;
      if(swMs > 99){
         swSeconds++;
         swMs = 0;

         if(swSeconds > 59){
            swMinutes++;
            swSeconds = 0;

            if(swMinutes > 59){
               swHour++;
               swMinutes = 0;

               if(swHour < 10) stopwatchHours.textContent = '0' + swHour;
               else stopwatchHours.textContent = swHour;
            }

            if(swMinutes < 10) stopwatchMinutes.textContent = '0' + swMinutes;
            else stopwatchMinutes.textContent = swMinutes;
         }

         if(swSeconds < 10) stopwatchSeconds.textContent = '0' + swSeconds;
         else stopwatchSeconds.textContent = swSeconds;
      }

      if(swMs < 10) stopwatchMiliseconds.textContent = '0' + swMs;
      else stopwatchMiliseconds.textContent = swMs;
   }, 10)
}

const stopwatchHours = sel('.hours');
const stopwatchMinutes = sel('.minutes');
const stopwatchSeconds = sel('.seconds');
const stopwatchMiliseconds = sel('.ms');
const stopwatchScreen = sel('.textarea');

const stopwatchButtonStart = sel('.stopwatch__btn-start');
const stopwatchButtonLoop = sel('.stopwatch__btn-loop');
const stopwatchButtonStop = sel('.stopwatch__btn-stop');
const stopwatchButtonReset = sel('.stopwatch__btn-reset');

sel('.stopwatch__btn-start').addEventListener('click', () => {
   stopwatch();
   stopwatchButtonStart.disabled = true;
   stopwatchButtonLoop .disabled = false;
   stopwatchButtonStop.disabled = false;
})

stopwatchButtonLoop.addEventListener('click', () => {
   let loopScreen = document.createElement('h2');
   loopScreen.textContent = `${stopwatchHours.textContent} : ${stopwatchMinutes.textContent} : ${stopwatchSeconds.textContent} : ${stopwatchMiliseconds.textContent}`;
   stopwatchScreen.append(loopScreen);
})

stopwatchButtonStop.addEventListener('click', () => {
   
   clearInterval(stopwatchInterval);
   stopwatchButtonStart.disabled = false;
   stopwatchButtonLoop.disabled = false;
   stopwatchButtonStop.disabled = true;
   stopwatchButtonReset.disabled = false;
})

stopwatchButtonReset.addEventListener('click', () => {
   swHour = 0;
   swMinutes = 0;
   swSeconds = 0;
   swMs = 0;
   
   stopwatchHours.textContent = '00';
   stopwatchMinutes.textContent = '00';
   stopwatchSeconds.textContent = '00';
   stopwatchMiliseconds.textContent = '00';
   stopwatchScreen.textContent = '';
})

let setTimer = sel('.timer__minutes');
setTimer.innerHTML = '25';

let timerInterval,    
    timerSeconds = sel('.timer-seconds'),
    timerMinutes = sel('.timer-minutes'),
    timerSettingSeconds = 0,
    timerSettingMinutes = 0;

timerSeconds.innerHTML = '00';
timerMinutes.innerHTML = '00';

const timerIncrease = sel('.timer__plus-minute');

timerIncrease.addEventListener('click', () => {
   setTimer.innerHTML++;
})

const timerDecrease = sel('.timer__minus-minute');

timerDecrease.addEventListener('click', () => {
   if(setTimer.innerHTML > 0) setTimer.innerHTML--;
})

const startTimer = sel('.timer__btn-start'),
      stopTimer = sel('.timer__btn-stop'),
      resetTimer = sel('.timer__btn-reset');

startTimer.addEventListener('click', () => {
   startTimer.disabled = true;
   stopTimer.disabled = false;
   resetTimer.disabled = true;
   timer();
})

stopTimer.addEventListener('click', () => {
   startTimer.disabled = false;
   stopTimer.disabled = true;
   resetTimer.disabled = false;
   clearInterval(timerInterval);
})

resetTimer.addEventListener('click', () =>{
   timerSettingMinutes = 0;
   timerSettingSeconds = 0;
   timerSeconds.innerHTML = '00';
   timerMinutes.innerHTML = '00';

   startTimer.disabled = false;
   stopTimer.disabled = false;
})

function timer(){
   timerSettingMinutes = setTimer.innerHTML;
   timerSettingSeconds = 0;
   
   timerInterval = setInterval(() => {
      if(timerSettingSeconds > 0){
         timerSettingSeconds--;         
      }

      if(timerSettingMinutes < 10) timerMinutes.innerHTML = '0' + timerSettingMinutes;
      else timerMinutes.innerHTML = timerSettingMinutes;

      if(timerSettingSeconds < 10) timerSeconds.innerHTML = '0' + timerSettingSeconds;
      else timerSeconds.innerHTML = timerSettingSeconds;

      if(timerSettingSeconds == 0 && timerSettingMinutes > 0){
         timerSettingSeconds = 60
         timerSettingMinutes--;
      }  
   }, 1000)
}