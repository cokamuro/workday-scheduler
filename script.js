var elRoot = $("#root");
var elTable = $("#time-block")
var currentHour= (new Date()).getHours()

function applyClasses(){
    $('button').addClass("save-button");
    $('textarea').addClass("description");

    for(var i=9;i<=17;i++){
        var dispTime;
        if(i<12){
            dispTime=i+"AM"
        } else if(i==12) {
            dispTime=i+"PM"
        } else {
            dispTime=(i-12)+"PM"
        }
        if(i!=9){$('tr').first().clone().appendTo($('tbody'));}
        var thisRow=$('tr').last();
        if(i!=9){thisRow.removeClass("event-9");}
        thisRow.children().eq(0).text(dispTime);
        thisRow.attr("id","event-"+i);
        

        if(i<currentHour){
            thisRow.children().eq(1).addClass("past");
        } else if (i==currentHour) {
            thisRow.children().eq(1).addClass("present");
        } else {
            thisRow.children().eq(1).addClass("future");
        }
        thisRow.children().eq(0).addClass("hour");
    }
    
}



applyClasses();

$("button").on("click", function (event) {
    alert($(event.target).parent().attr("class"))
  });