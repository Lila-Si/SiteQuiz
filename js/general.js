/* Pour le chemin de fonctionnement = event click button -> checkAnswer -> questionTimer (->questionPass si écoulé) et questionPass (-> showScore si plus de questions)*/


/* Initialisation (import, var, fonctions) */

import { questions } from './questions.js';

let indexQuestion = 0;
let score = 0;
let timerInterval = null;

const buttonElement = document.getElementById("btn");
const conteneurClass = document.getElementById("conteneur");
const formElement = document.getElementById("quiz_form");
const timerDisplay = document.getElementById("timer");

/* Fonctions de fin, montre les scores sur le nombre de questions ainsi qu'un message personnalisé selon ce dernier */
function showScore() {
    console.log("Fonction showScore bien appelée");

    let time = 30;
    timerDisplay.textContent = time;

    formElement.innerHTML = "";

    conteneurClass.classList.remove("conteneur");
    conteneurClass.classList.add("conteneur_intro");

    const titleElement = document.getElementById("title");
    const scorePara = document.createElement("p");
    const total = questions.length;

    buttonElement.remove();

    let messageTitle;
    let messageContenu;
    if (score === 0) {
        messageTitle = "T comme Troll";
        messageContenu = "Un exploit.";
    } else if (score >= 1 && score <= 4) {
        messageTitle = "D comme Désolant";
        messageContenu = "Tu devrais passer plus de temps à réviser.";
    } else if (score >= 5 && score <= 8) {
        messageTitle = "P comme Piètre";
        messageContenu = "C'est dommage, avec un peu plus d'effort tu aurais réussi.";
    } else if (score >= 9 && score <= 12) {
        messageTitle = "A comme Acceptable";
        messageContenu = "Ça passe, mais peux mieux faire.";
    } else if (score >= 13 && score <= 15) {
        messageTitle = "E comme Effort Exceptionnel";
        messageContenu = "Rien à redire, applaudissement du jury.";
    } else if (score === 16) {
        messageTitle = "O comme Optimal";
        messageContenu = "La perfection incarnée !";
    } else {
    console.log("Résultat anormal !");
};

    titleElement.textContent = messageTitle;
    scorePara.innerHTML = `Tu as eu ${score}/${total}. ${messageContenu}`;
    document.getElementById("para_score").appendChild(scorePara);
};

/* Fonction pour afficher les questions et donner la bonne mise en page au début (class) */
function questionPass() {
    console.log('Fonction questionPass bien appelée');

    clearInterval(timerInterval);

    if (indexQuestion >= questions.length) {
        showScore();
        return;
    }

    const actualQuestion = questions[indexQuestion];

    if (indexQuestion===0) {
        buttonElement.classList.remove("button_intro");
        buttonElement.textContent = "Suivant";
        conteneurClass.classList.remove("conteneur_intro");
        conteneurClass.classList.add("conteneur");
    };

    formElement.innerHTML = "";

    const fieldsetElement = document.createElement("fieldset");
    const legendElement = document.createElement("legend");
    legendElement.id = "questionTitle";
    legendElement.textContent = actualQuestion.question;
    fieldsetElement.appendChild(legendElement);

    actualQuestion.answers.forEach((answer, i) => {
        const divAnswers = document.createElement("div");
        divAnswers.classList.add("divTwo");

            const inputAnswers = document.createElement("input");
            inputAnswers.type = "radio";
            inputAnswers.id = `q${indexQuestion}_a${i}`;
            inputAnswers.name = "answer";
            inputAnswers.value = i;

            const labelAnswers = document.createElement("label");
            labelAnswers.htmlFor = inputAnswers.id;
            labelAnswers.textContent = answer;

            divAnswers.appendChild(inputAnswers);
            divAnswers.appendChild(labelAnswers);
            fieldsetElement.appendChild(divAnswers);
        });

        formElement.appendChild(fieldsetElement);
        questionTimer();
};

/* Pour lancer et afficher un timer */
function questionTimer() {
    console.log("Fonction questionTimer bien appelée");
    let time = 30;
    timerDisplay.textContent = time;

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = time;
        if (time <= 0) {
            clearInterval(timerInterval);
            indexQuestion++;
            questionPass();
        };
    }, 1000);
}

/* Checker si réponse bonne, puis appelle timer et prochaine question */
function checkAnswer() {
    console.log("Fonction checkAnswer bien appelée");

    if (indexQuestion===0 && formElement.querySelector("fieldset")===null) {
        questionPass();
        return;
    }

    const selectedChecked = document.querySelector('input[name="answer"]:checked')
    if (!selectedChecked) return;

    const idAnwser = parseInt(selectedChecked.value);
    const actualQuestion = questions[indexQuestion];

    if (idAnwser === actualQuestion.correct) {
        score++;
    };

        indexQuestion++;
        questionPass();
};




/* Event lanceur du programme */

buttonElement.addEventListener("click", () =>{
    console.log("Event bouton bien déclenché")
    checkAnswer();
});