/*
 * Create a list that holds all of your cards
 */
var cards =[
    'fa-diamond','fa-diamond',
    'fa-paper-plane-o','fa-paper-plane-o',
    'fa-anchor','fa-anchor',
    'fa-bolt','fa-bolt',
    'fa-cube','fa-cube',
    'fa-anchor','fa-anchor',
    'fa-leaf','fa-leaf',
    'fa-bicycle','fa-bicycle',
];

function generateCard(card) {
    return  `<li class="card" data-card=${card}>
                <i class="fa ${card}"></i>
            </li>`;
}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//=================timer from https://codepen.io/SitePoint/pen/MwNPVq?editors=0010 ==========

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  var timeinterval =0;

  function initializeClock(id, endtime) {
   var clock = document.getElementById(id);

    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
  }





  //==========================================================
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 function showWinningModal() {

    document.querySelector('body').style.overflow='hidden';
    document.querySelector('html').style.overflow='hidden';


    var clock = document.querySelector('#clockdiv');
    var minutes =clock.querySelector('.minutes').innerText;
    var seconds = clock.querySelector('.seconds').innerText;
    var winnerModal= document.querySelector('#winner-modal');
    var winnerModalContent= document.querySelector('#winner-modal').querySelector('.modal-content');

    winnerModal.querySelector('.modal-data').textContent=`your rating is ${stars<0 ?0:stars} starts and your time is ${2-minutes} minutes and ${seconds} seconds`;
   
   //stop timer
    clearInterval(timeinterval);


    winnerModal.querySelector('.modal-close').addEventListener('click',function (e) {
        e.preventDefault();

       winnerModal.classList.remove('modal-open');
       winnerModalContent.classList.remove('modal-open');
    });

    winnerModal.classList.add('modal-open');
    winnerModalContent.classList.add('modal-open');
   
    winnerModalContent.querySelector('button').addEventListener('click',function name(params) {
        winnerModal.classList.remove('modal-open');
        winnerModalContent.classList.remove('modal-open');
        initGame();
    });

   
 }



 var clockTracker = window.setInterval(function timeTrackerCallBack() {
    var clock = document.querySelector('#clockdiv');
    var minutes =clock.querySelector('.minutes').innerText;
    var seconds = clock.querySelector('.seconds').innerText;

    if(numberOfMatches < 8 && Number(minutes)<= 0 && Number(seconds)<=0){
      alert('sorry you lost time out');
       clearInterval(timeinterval);
       clearInterval(clockTracker);
    }
  }, 500);





function initGame(){
    document.querySelector('body').style.overflow='scroll';
    document.querySelector('html').style.overflow='scroll';
   clearInterval(timeinterval);
  [...document.querySelector('.stars').querySelectorAll('.fa')] .forEach(element => {
    element.remove();
  });   
      //reset stars
       for (let index = 0; index < 4; index++) {
        document.querySelector('.stars').innerHTML+=`<li><i class="fa fa-star"></i></li>`;
       }
       

      
  
       
  var deck =document.querySelector('.deck');
  var cardHTML =shuffle(cards).map(function (card) {
     return generateCard(card);
  });

  moves=0;

  movesCounter.innerText =moves;
  deck.innerHTML= cardHTML.join('');

  let allCards =document.querySelectorAll('.card');
  allCards.forEach(card => {
     card.addEventListener("click", cardClickCallBack, false);
  });

  var deadline = new Date(Date.parse(new Date()) + 2*60 * 1000);
  initializeClock('clockdiv', deadline);
}

let openCards = [];
var moves=0;
var stars=0;
var numberOfMatches =0;
var elapsedTime =0;
var movesCounter =document.querySelector('.moves');
initGame();



 function cardClickCallBack(e ) {

    if(!this.classList.contains('open')&& !this.classList.contains('show')&& !this.classList.contains('match')){
        openCards.push(this);
        this.classList.add('open','show');

    if(openCards.length == 2){
       //if they match
        if(openCards[0].dataset.card == openCards[1].dataset.card){
            numberOfMatches++;
            openCards[0].classList.add('match','open','show');
            openCards[1].classList.add('match','open','show');
            $( openCards[0] ).toggle( "bounce", { times: 3 }, "slow" );
            $( openCards[1] ).toggle( "bounce", { times: 3 }, "slow" );

            var clock = document.querySelector('#clockdiv');
            var minutes =clock.querySelector('.minutes').innerText;
            var seconds = clock.querySelector('.seconds').innerText;

            if(numberOfMatches == 8 && (Number(minutes)> 0 || Number(seconds)>0)){
                showWinningModal();
                clearInterval(timeinterval);
            }
            openCards = [];
        }
       else{
            //if cards doesnot match go away
        setTimeout(() => {
            openCards.forEach(card => {
                $( card ).effect( "shake" );
                card.classList.remove('open','show');
            });

         openCards =[];

         }, 1000);
       }
       moves++;
       if(moves%4 == 0){
           stars--;
           document.querySelector('.stars').querySelector('.fa-star').remove();
       }
       movesCounter.innerText =moves;

     }
    }
 }

 let allCards =document.querySelectorAll('.card');
 allCards.forEach(card => {
    card.addEventListener("click", cardClickCallBack, false);
 });


 //handle restart button
var restart =document.querySelector('.restart');
 restart.addEventListener('click',function () {
    moves=0;
    initGame();
   
});