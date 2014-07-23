window.quiz = {};
quiz.questions = [
    [
        {id: 1, difficulty: "Easy", name: "In which city is the annual Running of the Bulls festival held?", opta: "Pamplona", optb: "Madrid", optc: "Valencia", optd: "Bunol" }
    ],
    [
        {id: 2, difficulty: "Normal", name: "The Guindy National Park is located within the urban limits of which state capital in India?", opta: "Mumbai", optb: "Hyderabad", optc: "Chennai", optd: "Cochin" }
    ],
    [
        {id: 3, difficulty: "Difficult", name: "In which country can you see the Catatumbo Lightning, a spectacular natural phenomenon?", opta: "India", optb: "Russia", optc: "Venezuela", optd: "USA" }
    ]
];

quiz.answers = [
    {id: 1, correct: "opta", payoff: 5, correct_answer: "Pamplona"},
    {id: 2, correct: "optc", payoff: 10, correct_answer: "Chennai"},
    {id: 3, correct: "optc", payoff: 20, correct_answer: "Venezuela"}
];

function getAnswer(id, answer) {
    var result = $.grep(quiz.answers, function (e) {
        return e.id == id;
    });
    if (result.length == 0) {
        alert("Error");
    } else {
        if (answer == result[0].correct) {
            return result[0].payoff + "|| Awesome! That's right ||" + result[0].correct_answer;
        } else {
            return "0|| Uh-oh, that's wrong! ||" + result[0].correct_answer;
        }
    }
}