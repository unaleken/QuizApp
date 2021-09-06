function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//Qustion answer
Question.prototype.CheckAnswer = function(answer){
    return this.answer === answer;
}
//Quiz constructor
function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
// Quiz Prototype
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}
//Quiz is Finish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}
//Quiz guess
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.CheckAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

var q1 =new Question("When is my birthday?",["18 September","12 September","3 July","23 February"],"18 September");

var q2 = new Question("My fav sport",["Baseball","Football","Golf","Basketball"],"Basketball");

var q3 = new Question("Where am i from",["Izmir","Ankara","Sakarya","Istanbul"],"Izmir");

var questions = [q1,q2,q3];

// Start Quiz
 var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion(){
    if(quiz.isFinish()){
        showScore();
    }else{
        var question = quiz.getQuestion();
        var choices = question.choices;
        //console.log(choices);
        document.querySelector('#quesiton').textContent = question.text;

        for(var i = 0;i<choices.length;i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];

            guess('btn'+i),choices[i];
        }
        showProgress();
    }
}
function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}
function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    
    document.querySelector('.card-body').innerHTML = html;
}
function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML = 'Question '+ questionNumber + ' of ' + totalQuestion; 
}