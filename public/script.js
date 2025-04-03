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
});