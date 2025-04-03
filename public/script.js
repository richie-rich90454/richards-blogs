$(document).ready(function(){
    $("#brief").click(function(){
        $("#who-i-am").slideToggle(400, function(){
            $(this).is(":visible")?
                $("#breif").text("Hide"):
                $("#brief").text("Do you want to know me?");
        });
    });
});