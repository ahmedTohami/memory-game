# memory game
this project is a simple javascript game that uses DOM interface, query selectors and Event Listeners

---
## Used External Libraries
1. [jquery](https://jquery.com/)
2. [jquery-ui](https://jqueryui.com/)
3. [bootstrap](https://getbootstrap.com/)
---
### Below Are Code I Copied from CodePen To handle Clock
```javascript
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

```
---
### I also used my own modal
	<div id="clockdiv">
                <span class="minutes"></span>
                <span >minutes</span>
                <span class="seconds"></span>
                <span >seconds</span>
    </div>
---
	
### setInterval 
I used it to keep tracking the clock each 0.5 second if the time ended and the player did not finish then he loses 
```
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
```
---




 