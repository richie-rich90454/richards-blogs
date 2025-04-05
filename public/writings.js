$(document).ready(function (){
    function loadTextFile(filePath, containerId, buttonId){
        let container=$("#" + containerId);
        $.get(filePath, function (data){
            let lines=data.split("\n").filter(line=>line.trim()!=="");
            let formattedContent="";
            lines.forEach(line =>{
                if (line.startsWith("#")){
                    formattedContent+=`<h2>${line.slice(1).trim()}</h2>`;
                }
                else if (line.trim()=="\\"){
                    formattedContent+="<br><br>";
                }
                else{
                    formattedContent+=`<p>${line.trim()}</p>`;
                }
            });

            container.hide().html(formattedContent).slideDown(400);
        }).fail(function (){
            container.html("<p>Server busy. Please try again later.</p>").slideDown(400);
        });
    }
    $("#poems").data("label", "Poems").click(function (){
        let container=$("#poem-container");
        if (container.is(":visible")){
            container.slideUp(400);
        }
        else{
            loadTextFile("poems.txt", "poem-container", "poems");
        }
    });
    $("#narratives").data("label", "Narratives").click(function (){
        let container=$("#narrative-container");
        if (container.is(":visible")){
            container.slideUp(400);
        }
        else{
            loadTextFile("narratives.txt", "narrative-container", "narratives");
        }
    });
    $("#poem-container, #narrative-container").hide();
});
