//Backgrounds
var defaultBg = "#00aae4";
var redBg = "#820C0C";
var greenBg = "rgb(0, 165, 76)";

var transitionTime = 300;
var errorDelay = 1500;
var successDelay = 1000;

//Text colors
var defaultColor = "#f70079";
var greenColor = "#00F771";
var redColor = "#FF2b2b";

var highscoreColors=new Array("blue","yellow","lime","magenta","aqua","green","orange","crimson","royalblue","hotpink","indigo","dodgerblue","chartreuse","skyblue","red");

//Never lose focus (by drinking a lot of coffee)
$(function () {
    $("#rfid").focus();
});
$("#rfid").blur(function(){
    $("#rfid").focus();
});

$("#form").submit(function (event) {
    var rfid = parseInt($("#rfid").val());
    $("#rfid").prop('disabled', true);
    console.log("Sending blipp request for id: "+rfid);

    var request = $.ajax({
        url: "callback.php",
        method: "POST",
        data: { id : rfid },
        dataType: "json",
        success : successfulBlipp,
        error: failedBlipp
    });

    $("#rfid").val("");

    event.preventDefault();
});

function successfulBlipp(data, textStatus) {
    var balance = data["balance"];

    $("body").animate({backgroundColor: greenBg}, transitionTime)
        .delay(successDelay)
        .animate({backgroundColor: defaultBg}, transitionTime, function(){
            $("#rfid").prop('disabled', false);
            $("#rfid").focus();
        });

    $("#icon-success").fadeIn(transitionTime)
        .delay(successDelay)
        .fadeOut(transitionTime);

    $("h1").animate({color: greenColor}, transitionTime)
        .delay(successDelay)
        .animate({color: defaultColor}, transitionTime);

    if(!isNaN(balance)){
        $("#balance-message").text("Du har " + balance + " kr kvar att blippa för.")
            .fadeIn(transitionTime)
            .delay(successDelay)
            .fadeOut(transitionTime);
    }

    console.log("Successful blipp with status: " + textStatus);
};

function failedBlipp(data, textStatus){
    $("body").animate({backgroundColor: redBg}, transitionTime)
        .delay(errorDelay)
        .animate({backgroundColor: defaultBg}, transitionTime, function(){
            $("#rfid").prop('disabled', false);
            $("#rfid").focus();
        });

    $("h1").animate({color: redColor}, transitionTime)
        .delay(errorDelay)
        .animate({color: defaultColor}, transitionTime);

    $("#icon-failure").fadeIn(transitionTime)
        .delay(errorDelay)
        .fadeOut(transitionTime);

    console.log("Failed blipp with status: " + textStatus);
};

function animateHighscore(times){
  var newSize = Math.floor(Math.random()*50+50);
  setHighscoreSize(newSize);
  nextHighscoreColor();

  if(times-- > 0){
    setTimeout(function(){animateHighscore(times)}, 100);
  }
}

var highscoreColorI = 0;
function nextHighscoreColor(){
  var newColor = highscoreColors[highscoreColorI++ % highscoreColors.length];
  $("#highscore").css({color:newColor});
};

function setHighscoreSize(size){
  var fontSize = Math.floor(size);
  var margin = -Math.floor(size/2);
  $("#highscore").css({fontSize: fontSize+"px", marginTop: margin+"px"});
}
