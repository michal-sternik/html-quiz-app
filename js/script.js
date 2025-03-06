

const quiz_text = document.querySelector("#quiz_text")
const answer_container = document.querySelector("#answers")
const quiz_button = document.querySelector("#quiz_button")


function createAnswerButtons() {
    for (let index = 0; index < 4; index++) {
        const createdAnswer = document.createElement("div")
        createdAnswer.classList.add("answer")
        answer_container.appendChild(createdAnswer)
        createdAnswer.addEventListener('click', game.handleChooseAnswer)

    }
}
function prepareQuizButton() {
    quiz_button.addEventListener('click', () => game.handleButtonClick())
}



class Game {

    constructor() {
        this.currentGameQuestions = Array.from(questions)
        this.correctAnswer = undefined
        this.score = 0;

        this.handleButtonClick.bind(this)
        this.quizLoop.bind(this)
    }

    startGame() {
        createAnswerButtons()
        prepareQuizButton()
        this.quizLoop()
    }

    quizLoop() {
        quiz_button.textContent = "Submit"

        if (this.currentGameQuestions.length > 0) {
            const currentQuestion = this.getRandomQuestion(this.currentGameQuestions)
            console.log(this.currentGameQuestions)
            this.fillQuestion(currentQuestion.question)
            this.fillAnswers(currentQuestion.answers)

        }
        else {
            console.log("koniec gry!")
            //todo redirect and display score
        }

    }

    getRandomQuestion() {

        const indexToPop = Math.floor(Math.random() * this.currentGameQuestions.length)
        return this.currentGameQuestions.splice(indexToPop, 1)[0]
    }

    fillQuestion(question) {

        quiz_text.textContent = question
    }

    fillAnswers(answers) {
        Array.from(answer_container.children).forEach((button, index) => {
            button.classList.remove('selected', 'correct', 'disabled', 'wrong')
            button.textContent = answers[index].answer
            answers[index].correct ? this.correctAnswer = button : null
        });
        quiz_button.classList.remove('ready')

    }
    handleChooseAnswer() {
        for (const elem of answer_container.children) {
            elem.classList.remove('selected')
        }
        this.classList.add('selected')
        quiz_button.classList.add('ready')

    }

    handleButtonClick() {
        if (quiz_button.textContent === "Submit") {
            this.handleConfirmAnswer()
        } else if (quiz_button.textContent === "Next") {
            this.quizLoop()
        }
    }

    handleConfirmAnswer() {

        const pickedAnswer = document.querySelector("#answers > .selected")
        this.correctAnswer.classList.add('correct')

        if (pickedAnswer !== this.correctAnswer) {
            pickedAnswer.classList.add('wrong')
        }
        else {
            this.score++;
        }

        quiz_button.textContent = "Next"

        Array.from(answer_container.children).forEach(button => {
            button.classList.add('disabled')
        })


    }

}


const game = new Game()
game.startGame()










