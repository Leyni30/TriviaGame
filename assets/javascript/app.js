var quizData = [
	{
        question: "When did Bill Watterson first draw the strip?",
        options: ["1985", "2001", "1998", "1978"],
        answer: "1985"
    },
    {
        question: "Who is Calvin named after?",
        options: ["Bill Watterson's son", "Bill Watterson's favorite toy from childhood", "A sixteenth-century theologian who believed in predestination"],
        answer: "A sixteenth-century theologian who believed in predestination"
    },
    {
        question: "Who is Hobbes named after?",
        options: ["The author's best friend from childhood", "The author's dear uncle", "No one in particular", "A seventeenth-century philosopher who had a dim view of human nature"],
        answer: "A seventeenth-century philosopher who had a dim view of human nature"
    },
    {
        question: "How does Hobbes greet Calvin when he comes back from school?",
        options: ["He kisses him on his left cheek", "He bites him", "He hides", "In midair at high velocity"],
        answer: "In midair at high velocity"
    }, 
    {
        question: "What is Hobbes' favorite food?",
        options: ["Calvin's food", "Baklava", "Cat's food", "Tuna Fish Sandwich"],
        answer: "Tuna Fish Sandwich"
    },
    {
        question: "How much does Elena like this comic?",
        options: ["She doesn't", "Very much so", "It's one of her favorites", "Elena loves this comic"],
        answer: "Elena loves this comic"
    }
]

var correct = 0;
var incorrect = 0;
var currentRound = 0;

function counter() {
    gameTimer = setInterval(decrement, 1000);
}

var number = 1030;

function decrement() {
    console.log(number);
    number--;
    $("#timer").text("remaining time: " + number);

    if (number === 0) {
        clearInterval(gameTimer);

        setTimeout(function() {
            console.log("Time Up!");
            $("#main-content").empty();

            var answered = currentRound + "/" + quizData.length;

            $("#done").remove();

            $("#main-content").empty();


            var mssg = $("<h1>");
            mssg.text("Thanks For Playing!");

            var gameStats = $("<p>");
            gameStats.text("completed: " + answered);

            $("#main-content").append(mssg, gameStats);


        }, 1000);
    }
}




$(document).ready(function() {
    $("#correct").text("correct: " + correct);
    $("#incorrect").text("incorrect: " + incorrect);
    $("#timer").text("remaining time: " + number);



    $("#start-game").on("click", function() {

        $("#timer, #correct, #incorrect").removeClass("hide");
        $("#main-content").empty();


        counter();

        $("#done").html("<button id='stop-game'>DONE</button>");



        for (var i = 0; i < quizData.length; i++) {


            var questionElem = $("<h2>");

            questionElem.addClass("question");
            questionElem.text(quizData[i].question);
            questionElem.attr("id", "q-" + i);

            $("#main-content").append(questionElem);


            var bttnGroup = $("<div>");
            bttnGroup.addClass("btn-group");
            bttnGroup.attr("role", "group");
            bttnGroup.attr("id", "bg-" + i);
            bttnGroup.attr("aria-label", "First group");
            $("#main-content").append(bttnGroup);


            for (var j = 0; j < quizData[i].options.length; j++) {
                var optionsBtn = $("<button>");
                optionsBtn.addClass("options btn btn-secondary");
                optionsBtn.attr("type", "button");
                optionsBtn.attr("name", i);
                optionsBtn.attr("id", "o-" + j);
                optionsBtn.text(quizData[i].options[j]);
                $("#bg-"+i).append(optionsBtn);
			}

        }
	});


	$("#main-content").on("click", ".options", function(){


		if(currentRound < quizData.length){

			currentRound++;

			var btnName = $(this).attr("name");

			var bttnList = $(".btn[name=" +"'"+ +btnName+"'"+"]");




			for (var i = 0; i<bttnList.length; i++){

				bttnList[i].classList.remove("selected");

				bttnList[i].setAttribute("disabled", true);
			}

			$(this).addClass("selected");

			var selectedBtnText = $(this).text();

			var selectedBtnQuestionIndex = parseInt($(this).attr("name"));



			if (selectedBtnText === quizData[selectedBtnQuestionIndex].answer){
				console.log("you are right");
				correct++
				$("#correct").text("correct: "+correct);
			} else {
				console.log("you are wrong");
				incorrect++
				$("#incorrect").text("incorrect: "+incorrect);


			}
		}
	});

	$("#done").on("click", "#stop-game", function(){

		clearInterval(gameTimer);

		var answered = currentRound + "/" + quizData.length;

		$("#done").remove();

		$("#main-content").empty();

		var mssg = $("<h1>");
		mssg.text("Thanks For Playing");


		var gameStats = $("<p>");
		gameStats.text("completed: "+answered);

		$("#main-content").append(mssg, gameStats);

	});
});