$(document).ready(function(){
    $("#brief").click(function(){
        $("#who-i-am").slideToggle(400, function(){
            $(this).is(":visible")?
                $("#brief").text("Do you want to know me?"):
                $("#brief").text("Do you want to know me?");
        });
    });
    function updateLocalTime(){
        let now=new Date();
        $("#time-h").text(formatTime(now.getHours())+":");
        $("#time-m").text(formatTime(now.getMinutes())+":");
        $("#time-s").text(formatTime(now.getSeconds()));
        let offset=now.getTimezoneOffset();
        $("#time-zone").text(
            offset>0?
                ` (UTC-${Math.abs(offset/60)})`:
                ` (UTC+${Math.abs(offset/60)})`
        );
    }
    function formatTime(time){
        return time<10?"0"+time:time;
    }
    updateLocalTime();
    setInterval(updateLocalTime, 1000);
});