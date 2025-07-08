document.addEventListener('DOMContentLoaded', () =>{

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');

    const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      score: 3,
      status: false
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      score: 2,
      status: false
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      score: 1,
      status: false
    },
  ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', showNextQuestion);

    restartBtn.addEventListener('click', restartQuiz);

    function startQuiz(){
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        nextBtn.classList.add('hidden');

        showQuestion();
    }


    function showQuestion(){

        questionText.textContent = `${questions[currentQuestionIndex].question} [${questions[currentQuestionIndex].score} marks]`;

        questions[currentQuestionIndex].choices.forEach(choice => {

            const li = document.createElement('li');

            li.innerHTML = `${choice}`;

            choicesList.appendChild(li);

            li.addEventListener('click', (e) => selectAnswer(choice,e.target));

        });

        nextBtn.classList.add('hidden');

    }

    function showNextQuestion(){
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length){
            questionText.textContent = "";
            choicesList.innerHTML = "";

            
            showQuestion();

        }else{
            questionText.textContent = "";
            choicesList.innerHTML = "";


            nextBtn.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            restartBtn.classList.remove('hidden');

            let totalScore = questions.reduce((sum, question) => sum + question.score,0);

            scoreDisplay.textContent = `${score}/${totalScore}`;
        }

    }


    function selectAnswer(choice,li){
        const correctAnswer = questions[currentQuestionIndex].answer;
        const status = questions[currentQuestionIndex].status;

        if(status) return;

        if(choice === correctAnswer && !status){
            score += questions[currentQuestionIndex].score;
            li.classList.add('correct');
        }
        else{
            li.classList.add('incorrect');
        }

        console.log(li.textContent);

        questions[currentQuestionIndex].status = !status;

        nextBtn.classList.remove('hidden');
        const choices = [...choicesList.children];
        choices.forEach(option => {
          if(option.textContent !== li.textContent){
            option.classList.add('disabled');
            
          }
        })
    }

    function restartQuiz(){
        resultContainer.classList.add('hidden');
        restartBtn.classList.add('hidden');

        currentQuestionIndex = 0;
        score = 0;
        questions.forEach(question =>{
          question.status = false;
        })
        
        startQuiz();
    }
});