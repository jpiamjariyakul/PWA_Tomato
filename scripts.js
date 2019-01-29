var boolWorking = true; // boolean for checking if clock is on timer for working (25 min) or break (5 min)
var countWork = 0; // total number of pomodoros done

const timeWork = 25 * 60; // total number of minutes for working
const timeBreakShort = 5 * 60; // total number minutes of short break
const timeBreakLong = 30 * 60; // total number of minutes of long break

var boolRunning = false; // bool for checking if clock is running

document.getElementById("state").innerHTML = "Get Productive";

timeCurrent = timeWork;
timeCurrent = displayTime(timeCurrent);

var textClock = document.getElementById("clock");
textClock.style.display = "none";

function startTimer()
{
    // Hides button on click
    var button = document.getElementById("buttonStart");
    textClock.style.display = "block";
    button.style.display = "none";
    
    var timeCurrent = 0; // total current time
    if (boolWorking) {
        timeCurrent = timeWork;
        document.getElementById("state").innerHTML = "Working...";
        
        var x = window.setInterval(function ()
        {
            timeCurrent = displayTime(timeCurrent);
            
            if (timeCurrent < 0) {
                window.clearInterval(x);
                button.style.display = "inline-block";
                boolWorking = false;
                countWork++;
                document.getElementById("state").innerHTML = "Break Time";
            }
        }, 1000);
    }
    else
    {
        if (countWork < 4) {
            timeCurrent = timeBreakShort;
            document.getElementById("state").innerHTML = "Taking a short break...";
        }
        else {
            timeCurrent = timeBreakLong;
            document.getElementById("state").innerHTML = "Taking a long break...";
        }
        
        
        var x = window.setInterval(function ()
        {
            timeCurrent = displayTime(timeCurrent);

            if (timeCurrent < 0) {
                window.clearInterval(x);
                button.style.display = "inline-block";
                boolWorking = true;
                if (countWork >= 4) {
                    countWork = 0;
                }
                document.getElementById("state").innerHTML = "Get Productive";
            }
        }, 1000);
    }
        
            //document.getElementById("state").innerHTML = "Break Time";    
}

function displayTime(timeCurrent)
{
    var zeroPadMinute = "0", zeroPadSecond = "0";
    if (((timeCurrent - (timeCurrent % 60)) / 60) >= 10)
    {
        zeroPadMinute = "";
    }
    
    if ((timeCurrent % 60) >= 10) {
        zeroPadSecond = "";
    }
    
    document.getElementById("clock").innerHTML = zeroPadMinute + ((timeCurrent - (timeCurrent % 60)) / 60) + ":" + zeroPadSecond + (timeCurrent % 60);
    console.log(timeCurrent);
    return (timeCurrent -= 1);
}