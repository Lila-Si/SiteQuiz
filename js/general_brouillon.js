/* Pour le chemin de fonctionnement = event click button -> checkAnswer -> questionTimer (->questionPass si écoulé) et questionPass (-> showScore si plus de questions)*/


/* Initialisation (import, var, fonctions) */

import { questions } from './question.js';

let indexQuestion = 0;
let score = 0;
const buttonElement = document.getElementById("btn");
const conteneurClass = document.getElementById("conteneur");
const actualQuestion = questions[indexQuestion];

/* Fonctions de fin, montre les scores sur le nombre de questions ainsi qu'un message personnalisé selon ce dernier */
function showScore() {
    console.log("Fonction showScore bien appelée");

    conteneurClass.classList.remove("conteneur");
    conteneurClass.classList.add("conteneur_intro");

    const titleElement = document.getElementById("title");
    const scorePara = document.createElement("p");

    buttonElement.remove();

    switch (score) {
        case 0:
            titleElement.innerHTML = "T comme Troll";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". Un exploit.";
            document.getElementById("para_score").appendChild(scorePara);
            break;
        case 1:
        case 2:
        case 3:
        case 4:
            titleElement.innerHTML = "D comme Désolant";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". Tu devrais passer plus de temps à réviser.";
            document.getElementById("para_score").appendChild(scorePara);
            break
        case 5:
        case 6:
        case 7:
        case 8:
            titleElement.innerHTML = "P comme Piètre";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". C'est dommage, avec un peu plus d'effort tu aurais réussi.";
            document.getElementById("para_score").appendChild(scorePara);
            break
        case 9:
        case 10:
        case 11:
        case 12:
            titleElement.innerHTML = "A comme Acceptable";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". Ça passe, mais peux mieux faire.";
            document.getElementById("para_score").appendChild(scorePara);
            break
        case 13:
        case 14:
        case 15:
            titleElement.innerHTML = "E comme Effort Exceptionnel";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". Rien à redire, applaudissement du juri.";
            document.getElementById("para_score").appendChild(scorePara);
            break
        case 16:
            titleElement.innerHTML = "O comme Optimal";
            scorePara.innerHTML = "Tu as eu", score, "/", indexQuestion, ". La perfection incarnée";
            document.getElementById("para_score").appendChild(scorePara);
            break
        default:
            console.log('Resultat score anormal !');
            break
    };
};

/* Fonction pour afficher les questions et donner la bonne mise en page au début (class) */
function questionPass() {
    console.log('Fonction questionPass bien appelée');

    if (indexQuestion > questions.lenght) {
        showScore();
    } else {
        if (indexQuestion===0) {
            buttonElement.classList.remove("button_intro");
            buttonElement.innerHTML = "Suivant";
            conteneurClass.classList.remove("conteneur_intro");
            conteneurClass.classList.add("conteneur");
        };

        let titleQuestion = `<fieldset><legend id='questionTitle'></legend></fieldset>`;
        document.getElementById("quiz_form").appendChild(titleQuestion);

        const legendElement = document.getElementById("questionTitle");
        legendElement.innerHTML = actualQuestion.question;

        actualQuestion.answers.forEach(() => {
            const idQuestion = `q${indexQuestion}_a${i}`;
            questions.answers.innerHTML += `
              <div class="divTwo">
                <input type="radio" id="${idQuestion}" name="answer" value"${i}"/>
                <label for="${idQuestion}">${answer}</label>
              </div>
            `;
        });

        indexQuestion+=1
    };
};

/* Pour lancer et afficher un timer */
function questionTimer() {
    console.log("Fonction questionTimer bien appelée");
    let time = 30;
    const timer = document.getElementById("timer");
    const affichageTimer = setInterval(() => {
        time--;
        timer.textContent = time;
        if (time <= 0) {
            clearInterval(affichageTimer);
            questionPass();
        };
    }, 1000);
}

/* Checker si réponse bonne, puis appelle timer et prochaine question */
function checkAnswer() {
    console.log("Fonction checkAnswer bien appelée");
    if (indexQuestion===0) {
        questionTimer();
        questionPass();
    } else {
        const selectedChecked = document.querySelector('input[name="answer"]:checked')
        if (!selectedChecked) return;

        const idAnwser = parseInt(selected.value);
        if (idAnwser === actualQuestion.correct) {
            score++;
            questionTimer();
            questionPass();
        };
    };
};




/* Event lanceur du programme */

buttonElement.addEventListener("click", () =>{
    console.log("Event bouton bien déclenché")
    checkAnswer();
    console.log("Appel checkAnswer fait")
});