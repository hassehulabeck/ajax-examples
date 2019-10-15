    var url = "https://opentdb.com/api.php?amount=3&category=14&difficulty=medium&type=multiple";
    let questions;
    let correct_answer;

    document.addEventListener("DOMContentLoaded", function () {

        let questionArea = document.getElementById("question");
        let answersArea = document.getElementById("answers");

        let xhr = new XMLHttpRequest;

        xhr.onreadystatechange = function () {
            if ((xhr.readyState == 4) && (xhr.status == 200)) {
                questions = xhr.response.results;
                render();
            }
        }

        xhr.open("GET", url);
        xhr.responseType = "json";
        xhr.send();

        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        function render() {

            // Skriv ut första frågan.
            questionArea.innerHTML = questions[0].question;

            // Skapa knappar för svarsalternativen
            let answers = [questions[0].correct_answer, ...questions[0].incorrect_answers];

            // Blanda svaren.
            shuffle(answers);

            // Få index för det rätta svaret.
            correct_answer = answers.indexOf(questions[0].correct_answer);

            answers.forEach(function (answer, index) {
                let button = document.createElement("button");
                button.innerText = answer;
                button.value = index;
                answersArea.appendChild(button);
            })
        }

        // Lyssna på knapparna.
        answersArea.addEventListener("click", function (e) {
            console.log(e);
            if (e.target.value == correct_answer) {
                console.log("Correct");
                e.target.classList.add("correct");
            }
        })
    })