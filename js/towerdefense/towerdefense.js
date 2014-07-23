var blinkit;
var playerHt = 0;
var aiHt = 0;

    $(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
//    blinkit = setInterval(blinker, 2000);
//    $('#startClicker').on('click', function () {
//        $('.gameTitle').fadeOut();
    $('.game-wrapper').fadeIn();
//        clearInterval(blinkit);
    initGame();
//    })


});

function blinker() {
    $('#startClicker').fadeOut(500, function () {
        $('#startClicker').fadeIn(500);
    });
}

function initGame() {
    setTower('player', game.startHeight);
    setTower('ai', game.startHeight + 18);
}

function setTower(team, delta) {

    var towerHt = (team == "player") ? playerHt : aiHt
    var teamTower = $('#' + team + '-tower');
    var newHt = Math.min(Math.max(towerHt + delta, 0), game.maxHeight * 10);
    var existingStoreys = Math.floor(towerHt / 10);
    var newStoreys = Math.floor(newHt / 10);

    var posx = 89;
    var posy = $('#' + team + '-tower .base').height() - 10;
    var wd = 84;
    var ht = 55;
    var i;

    teamTower.find('.broken').remove();
    teamTower.find('.cap').remove();

    if (existingStoreys > newStoreys) {
        teamTower.find('.tower-block').remove();
        existingStoreys = 0;
    }

    for (i = 1; i < newStoreys + 1; i++) {
        if (i > existingStoreys) {
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state10.png" id="' + team + '-towerblock-' + i + '" class="tower-block" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');

        }

        ht = theme.dropRatio * ht;
        wd = theme.dropRatio * wd;
        posx += (1 - theme.dropRatio) / 2 * wd;
        posy += ht;
    }

    setTowerTop(team, (newStoreys >= game.maxHeight), (newHt % 10), posx, posy, wd);

    return (team == "player") ? (playerHt = newHt) : (aiHt = newHt)
}

function setTowerTop(team, cap, top, posx, posy, wd) {
    var teamTower = $('#' + team + '-tower');

    if (cap) {
        teamTower.append('<img src="img/towerdefense/' + team + 'tower/top.png" id="' + team + '-cap" class="tower-block cap" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
            } else {
        if (top != 0) {
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state' + top + '.png" id="' + team + '-broken-towerblock" class="tower-block broken" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
        }
    }
}

function getQuestion() {
    var list = quiz.questions[Math.floor(Math.random() * 3)];
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var data = list[randomnum];
    setTimeout(function () {
        $('#qcard').fadeIn();
        $('#qquestion').html(data.name);
        $('#qid').html(data.id);
        $('#optax').html('<div class="answer-bullet" id="bulletA">A</div>' + data.opta);
        $('#optbx').html('<div class="answer-bullet" id="bulletB">B</div>' + data.optb);
        $('#optcx').html('<div class="answer-bullet" id="bulletC">C</div>' + data.optc);
        $('#optdx').html('<div class="answer-bullet" id="bulletD">D</div>' + data.optd);
        bindAnswers();
    }, 1000);
}

function bindAnswers() {
    $('.answer').on('click', function () {
        processAnswers($(this).attr("id").split("x")[0]);
    });
}

function processAnswers(answer) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = parseInt(data.split('||')[0]);
    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'>" + resultMsg + "<br/>The correct answer is: <h3 style='color:darkred;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();
    setTimeout(function () {
        $('#qquestion').fadeOut();
        $('#qprompt').fadeOut();
        $('#answerMsg').fadeOut();
        $('.continuer').on('click', function () {
            $('#qcard').fadeOut();
            $('#answerMsg').hide();
            $('#qquestion').show();
            $('#answerBlock').show();
            $('#qprompt').show();
            $('#sphinxpic').css({"width": "30%"});
            resetCampaigns();
            $('#stats').show();
            $('#city-card').show();
            $('#compass').fadeIn();
        })

    }, 3000);
}
