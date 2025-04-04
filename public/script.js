$(document).ready(function(){
    $("#brief").click(function(){
        $("#who-i-am").slideToggle(400, function(){
            $(this).is(":visible")?
                $("#brief").text("Do you want to know me?"):
                $("#brief").text("Do you want to know me?");
        });
    });
    let previosuSecond=null;
    function updateLocalTime(){
        let now=new Date();
        let currentSecond=now.getSeconds();
        $("#time-h").text(formatTime(now.getHours())+":");
        $("#time-m").text(formatTime(now.getMinutes())+":");
        $("#time-s").text(formatTime(now.getSeconds()));
        if (previosuSecond!==null&&previosuSecond!==currentSecond){
            $("#time-s").css("color", "#DE0000").delay(100).queue(function (next){
                $(this).css("color", "");
                next();
            });
        }
        previosuSecond=currentSecond;
        let offset=now.getTimezoneOffset();
        let absoluteOffset=Math.abs(offset);
        let oHours=Math.floor(absoluteOffset/60);
        let oMinutes=absoluteOffset%60;
        $("#time-zone").text(
            offset>0?
                ` (UTC-${formatTime(oHours)}:${formatTime(oMinutes)})`:
                ` (UTC+${formatTime(oHours)}:${formatTime(oMinutes)})`
        );
        let currentMs=now.getMilliseconds();
        setTimeout(updateLocalTime, 1000-currentMs);
    }
    function formatTime(time){
        return time<10?"0"+time:time;
    }
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
    let jokes=[];
    $.get("../memes_and_jokes.txt", function(data){
        jokes=data.split("\n").filter(joke=>joke.trim()!=="");
        showRandomJoke();
    }).fail(function(){
        $("#jokes-container").html("<p>Server busy. Please try again later.</p>")
    });
    function showRandomJoke(){
        if (jokes.length>0){
            let randomIndex=Math.floor(Math.random()*jokes.length);
            $("#jokes-container").html(`<p>${jokes[randomIndex]}</p>`)
        }
    }
    $("#show-another-joke").click(function(){
        $("#jokes-container").fadeOut(400, function(){
            showRandomJoke();
            $(this).fadeIn(400);
        });
    });
});