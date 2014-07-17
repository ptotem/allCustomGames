var blinkit;
var playerHt = game.startHeight;
var aiHt = game.startHeight;

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
    setTower('player', 0);
//    setTower('ai', aiHt);
}

function setTower(team, delta) {

    var teamTower = $('#' + team + '-tower');
    var newHt = playerHt + delta;
    var existingStoreys = Math.floor(playerHt / 10);
    var newStoreys = Math.floor(newHt / 10);

    if (playerHt % 10 != 0) {
        teamTower.find('.broken').remove();
    }

    if (existingStoreys > newStoreys) {

        for (var j = existingStoreys; j > newStoreys; j--) {
            $('#' + team + '-towerblock-' + i).remove();
        }

    } else {
        if (existingStoreys < newStoreys) {
            var posx = 89;
            var posy = $('#' + team + '-tower .base').height() - 10;
            var wd = 84;

            for (var i = 0; i < newStoreys; i++) {
                if (i > existingStoreys) {
                    teamTower.append('<img src="img/towerdefense/' + team + 'tower/state10.png" id="' + team + '-towerblock-' + i + '" class="tower-block" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
                }
                posy += $('#' + team + '-towerblock-' + i).height() - 10;
                wd = theme.dropRatio * wd;
                posx += (1 - theme.dropRatio) / 2 * wd;
            }
        }
    }


    var brokenTop = newHt - (10 * newStoreys);

    if (newStoreys == game.maxHeight) {
        teamTower.append('<img src="img/towerdefense/' + team + 'tower/top.png" id="' + team + '-towerblock-' + i + '" class="tower-block" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
    } else {
        if (brokenTop > 0) {
            teamTower.append('<img src="img/towerdefense/' + team + 'tower/state' + brokenTop + '.png" id="' + team + '-broken-towerblock-' + i + '" class="tower-block broken" style="' + ((team == "ai") ? "right" : "left") + ':' + posx + 'px;bottom:' + posy + 'px;width:' + wd + 'px;"/>');
        }
    }

    playerHt = newHt;

    return playerHt;
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
