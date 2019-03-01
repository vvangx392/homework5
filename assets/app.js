
$( document ).ready(function() {


	var game = {
		questions: [
		{
	   		question: "How many Grand Slam titles does Roger Federer hold currently?",
	   		possibles: ["2", "5", "10", "20"],
	   		id: 'question_one',
	   		answer: 3
		}, {
			question: "Which fruit is on top of the Wimbeldon Trophy?",
			possibles: ["apple", "pineapple", "watermelon", "raspberry"],
			id: 'question_two',
			answer: 1
		}, {
			question: "Where is The US Open played?",
			possibles: ["California", "Texas", "Florida", "New York", "Las Vegas"],
			id: 'question-three',
			answer: 4
		}, {
			question: "What country does Roger Federer play for?",
			possibles: ["Spain", "US", "Australia", "Switzerland"],
			id: 'question-four',
			answer: 3
		}, {
			question: "What part of the human body contain five metacarpal bones?",
			possibles: ['Montgomery', 'Birmingham', 'Mobile', 'Tuscaloosa', 'Gulf Shores'],
			id: 'question-five',
			answer: 0
		}, {
			question: "what country did Roger Federer meet his wife?",
			possibles: ["US", "Australia", "Egypt", "Canada", "Thailand"],
			id: 'question-six',
			answer: 1

		}, {
			question: "Roger Federer's first Grand Slam Championship win was?",
			possibles: ["US open", "French Open", "Wimbeldon", "Australian open"],
			id: 'question-seven',
			answer: 2
		}, {
			question: "Which brand of racket does Roger Federer use?",
			possibles: ["Babolat", "Nike", "Dunlop", "Prince", "Wilson"],
			id: 'question-eight',
			answer: 4
		}, {
			question: "Who is one of Roger Federer's Idol growing up?",
			possibles: ["Andy Roddick", "Kei Nishikori", "Novak Djokovic", "Pete Sampras"],
			id: 'question-nine',
			answer: 3
		}, 
		]}

	
	var message = "Game Over!";
	

    $(".startGame").on("click", function (){

		$(".wrapper").show();
		console.log("hello");

		$(this).hide();
	});

    
    var number = 40;
    $('#timeLeft').on('click', run);

	
    function decrement(){
       
        number--;
        
        $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
         
        if (number === 0){
       
        stop();
       
        $('#message').html('time up!');
        checkAnswers();
        }
    }

    function run(){
        counter = setInterval(decrement, 1000);
    }
    
    function stop(){
    
        clearInterval(counter);
    }


    run();


function formTemplate(data) {

	var qString = "<form id='questionOne'>"+ data.question +"<br>";

	var possibles = data.possibles;

	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;


function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}


function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}


buildQuestions();


function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}


function checkAnswers (){

	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0


	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {

			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}

	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}


function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');

	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}

	return anyAnswered;

}


	$('#doneButton').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Game Over!");
	})
});