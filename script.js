var elRoot = $("#root");
var elTable = $("#time-block")
var currentHour= (new Date()).getHours()

function applyClasses(){
    //set classes for all buttons and textareas
    $('button').addClass("save-button");
    $('textarea').addClass("description");

    //loop through hours 9 to 17
    for(var i=9;i<=17;i++){
        //get nice text for y-axis time
        var dispTime=moment(moment("1980-01-01").add(i,"hours")).format("hA");
        //clone generic tr block, and append it to tbody
        if(i!=9){$('tr').first().clone().appendTo($('tbody'));}
        //get the new tr block
        var thisRow=$('tr').last();
        //remove the duplicated class
        if(i!=9){thisRow.removeClass("event-9");}
        //set the time on the first td and the class
        thisRow.children().eq(0).text(dispTime);
        thisRow.children().eq(0).addClass("hour");
        //change the id to the correct hour
        thisRow.attr("id","event-"+i);
        
        //set the past/present/future classes
        if(i<currentHour){
            thisRow.children().eq(1).addClass("past");
        } else if (i==currentHour) {
            thisRow.children().eq(1).addClass("present");
        } else {
            thisRow.children().eq(1).addClass("future");
        }       
    }
}

function loadEvents() {
    //load events into the textareas from localstorage
    for(var i=9;i<=17;i++){$("#event-"+i).children().eq(1).children().eq(0).val(localStorage.getItem("event-"+i))};
}

function saveEvent(hourIn) {
    //save textarea contents into localstorage
    localStorage.setItem("event-"+hourIn,$("#event-"+hourIn).children().eq(1).children().eq(0).val().trim());
}

function init(){
    $("#currentDay").text(moment().format("LL"))
    applyClasses();
    loadEvents();
}

init();

// add event handler for button clicks
$("button").on("click", function (event) {
    var parentIDstring=$(event.target).parent().parent().attr("id");
    var hyphenPos=parentIDstring.indexOf("-");

    if(hyphenPos>0){
        //valid event ID, get hour number
        var buttonHour=parentIDstring.substring(hyphenPos+1);
        saveEvent(buttonHour);
    }
  });