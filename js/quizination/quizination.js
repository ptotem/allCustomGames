var blinkit;
var allCountries = [];
var strengths = [];
var playerCountries = [];
var aiCountries = [];
var cardpick, toss, roll;
var counter;
var messaging = true;
var gamestart = true;
var playerTurn = true;
var war = false;
var threatReduction = 0;
var threat = 0;
var roundnum = 1;
var attackCount = 0;


$(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
    $('#map-wrapper').css('background-image', "url(" + theme.mapImg + ")");
    blinkit = setInterval(blinker, 2000);
    $('#startClicker').on('click', function () {
        $('.gameTitle').fadeOut();
        $('.game-wrapper').fadeIn();
        clearInterval(blinkit);
        initGame();
    })


});

function blinker() {
    $('#startClicker').fadeOut(500, function () {
        $('#startClicker').fadeIn(500);
    });
}

function resetMap() {
    evaluateThreat();
    $('#diceBox').fadeOut(function(){
        $('.playerTurn').fadeOut(function(){
            setTimeout(function(){
                $('#logger').fadeIn();
            },500)
        });
    });
    $('.country').css('opacity', 0.6).show();
    $('.targetable').removeClass('targetable');
    var $this = $('.selected').first();
    $this.removeClass('selected');
    $('#qcard').fadeOut();
    $('#message').show();
    $('#btnBank').show();
}

function evaluateThreat() {
    threat = 0;
    $.each(playerCountries, function (index, elm) {
        threat += strengths[theme.countries.indexOf(elm)]
    });
//    console.log("Threat (" + threat + ") - Reduction (" + threatReduction + ") + Roundnum (" + roundnum + "x2)" + "+ AttackCount (" + attackCount + "*3) = " + Math.min(Math.max((threat - threatReduction + (roundnum * 2) + (attackCount * 2)), 0), 30));

    threat = Math.min(Math.max((threat - threatReduction + (roundnum * 2) + (attackCount * 3)), 0), 30);
    var threatPercentage = Math.ceil(100 * threat / 30);
    $('#threat').animate({
        height: threatPercentage + "%"
    });
    $('#threat-value').html(threatPercentage);
    return threatPercentage;
}

function launchAttackFrom(countryName, team) {
    var $this = $("#" + countryName);

    $('.playerTurn').fadeOut(function () {
        if (playerTurn) {
            $('.canceler').fadeIn();
        }
    });

    $('.country').hide();
    $this.show();
    if (playerTurn) {
        var neighbourhood = theme.neighbors[theme.countries.indexOf(countryName)];
        var attackPoint = false;
        $.each(neighbourhood, function (index, elm) {
            var $neighbour = $('#' + elm);
            if (team == "blue" && $neighbour.hasClass("redCountry")) {
                $neighbour.addClass("targetable").css({
                    'opacity': 1
                }).show();
                attackPoint = true;
            } else {
                if (team == "red" && $neighbour.hasClass("blueCountry")) {
                    $neighbour.addClass("targetable").css({
                        'opacity': 1
                    }).show();
                }
            }
        });
        if (attackPoint) {
            showMessage("Click on a neighboring red country to attack", 750);
        } else {
            showMessage("Nowhere to attack from here", 750);
        }
    }
    $this.addClass('selected');
}

function fortify(countryName) {
    $('.playerTurn').fadeOut();
    $('#logger').fadeOut(function(){
        setTimeout(function(){
            $('#diceBox').fadeIn();
            if (done == true) {
                done = false;
                hideFace(faceOne, faceTwo);

                showAngle();
                setTimeout(function () {
                    hideAngle();
                }, 750);
                setTimeout(function () {
                    var hit = finalRoll();
                    var defense = strengths[theme.countries.indexOf(countryName)];
                    if (hit > defense) {
                        strengths[theme.countries.indexOf(countryName)] = Math.min(hit, 9);
                        showSplash("DEFENSE INCREASED");
                        showMessage("The round is over. End your turn", 750);
                        logIt('Blue fortified '+ toTitleCase(countryName.replace("-", " ")));
                        endTurn();
                    } else {
                        showSplash("DEFENSE UNCHANGED");
                        logIt('Fortification of '+toTitleCase(countryName.replace("-", " "))+' failed ');
                        showMessage("The round is over. End your turn", 750);
                        endTurn();
                    }
                }, 751);

            }
        },500)
    });

}
function attackCountry(countryName, team) {
    var $this = $("#" + countryName);
    attackCount += 1;
    $('#diceBox').fadeIn();
    $('#'+countryName).fadeIn();
    if (done == true) {
        done = false;
        hideFace(faceOne, faceTwo);

        showAngle();
        setTimeout(function () {
            hideAngle();
        }, 750);
        setTimeout(function () {
            var hit = finalRoll();
            var defense = strengths[theme.countries.indexOf(countryName)];
            if (hit > defense) {
                conquer(countryName, team);
                showSplash("VICTORY");
                logIt(toTitleCase(team) + ' conquered '+ toTitleCase(countryName.replace("-", " ")));
                if (playerTurn) {
                    showMessage("You can attack again. Click on a blue country.", 750);
                } else {
                    endTurn();
                }
            } else {
                logIt(toTitleCase(countryName.replace("-", " "))+" resisted "+ team+ " invasion");
                if (playerTurn) {
                    showSplash("DEFEAT");
                    showMessage("You were defeated. End your turn", 750);
                    endTurn();
                } else {
                    playerTurn = true;
                    showSplash("DEFEAT");
                    showMessage("The enemy player was defeated. It is now your turn", 750);
                    setTimeout(function () {
                        yourTurn();
                    }, 2500);
                }
            }
        }, 751);

    }
}

function aiTurn() {
    playerTurn = false;
    if (!war && evaluateThreat() == 100) {
        war = true;
        showSplash("RED DECLARES WAR");
        logIt("RED DECLARES WAR");
    }
    if (war) {
        aiSearchLaunchCountry(0);
    } else {
        playerTurn = true;
        logIt("Red did not react");
        evaluateThreat();
        showMessage("Red player did not react. It is now your turn again.", 750);
        yourTurn();
    }
}

function aiSearchLaunchCountry(arrayIndex) {
    var neighbourhood = theme.neighbors[theme.countries.indexOf(aiCountries[arrayIndex])];
    var launchCountry = aiCountries[arrayIndex];
    var targetCountry = "";

    $.each(neighbourhood, function (index, elm) {
        var $neighbour = $('#' + elm);
        if ($neighbour.hasClass("blueCountry")) {
            targetCountry = elm;
        }
    });

    if (targetCountry == "") {
        aiSearchLaunchCountry(arrayIndex + 1);
    } else {
        $('.country').hide();
        $('#' + launchCountry).addClass('selected').show();
        $('#' + targetCountry).show();

        showMessage("Red Player's "+toTitleCase(launchCountry.replace("-", " ")) + " attacks " + toTitleCase(targetCountry.replace("-", " ")));
        setTimeout(function () {
//            launchAttackFrom(launchCountry, "red");
            setTimeout(function () {
                attackCountry(targetCountry, "red");
            }, 3000);
        }, 1000);
    }
}

function yourTurn() {
    $('#map-wrapper').css('pointer-events','auto');
    $('.country').unbind('click').on('click', function () {
        $('#logger').hide();
        var $this = $(this);
        var countryName = $this.attr("id");
        if (playerTurn) {
            if ($this.hasClass('selected')) {
                resetMap();
            } else {
                if ($this.hasClass('targetable')) {
                    attackCountry(countryName, "blue");
                } else {
                    if ($this.hasClass("blueCountry")) {
                        showMessage("What action do you want to take from here?", 750);
                        $('.playerTurn').not('#endBtn').fadeIn();
                        $('#btnBank').fadeIn();
                        $('.country').hide();
                        $this.show();
                        $('#attackBtn').unbind('click').on("click", function () {
                            launchAttackFrom(countryName, "blue");
                        });
                        $('#fortifyBtn').unbind('click').on("click", function () {
                            fortify(countryName);
                        });
                        $('#diplomacyBtn').unbind('click').on("click", function () {
                            startQuiz();
                        });
                        $('#cancelBtn').on("click", function () {
                            resetMap();
                        });

                    } else {
                        showMessage("You cannot start from an enemy territory", 750);
                    }
                }
            }
        } else {
            showMessage("Wait! It is the red player's turn.", 750);
        }
        $this.trigger('mouseleave').trigger('mouseenter');
    });
}

function initGame() {

    initCountries();
    allocateCountries();
    resetMap();
    yourTurn();
}

function showMessage(msg, duration) {
    if (messaging) {
        $('#message').html(msg).fadeIn()
    }
}

function showSplash(msg) {
    $('#splasher').html(msg).show().delay(1200).animate({
        fontSize: "6em",
        opacity: 0,
        marginLeft: "1em",
        marginTop: "-0.5em"
    }, 100, function () {
        $('#splasher').hide().css({
            fontSize: "3em",
            opacity: 1,
            marginLeft: 0,
            marginTop: 0
        });
        resetMap();
    });
}

function initCountries() {
    $.each($('.country'), function (index, elm) {
        allCountries.push($(elm).attr("id"));
        strengths.push(Math.floor(Math.random() * game.startPower) + 1);
    });
}
function allocateCountries() {

    for (counter = 0; counter < 1; counter++) {
        cardpick = Math.floor(Math.random() * allCountries.length);
        conquer(allCountries[cardpick], "blue");
    }
    for (counter = 0; counter < 41; counter++) {
        cardpick = Math.floor(Math.random() * allCountries.length);
        conquer(allCountries[cardpick], "red");
    }
    showMessage("Click on a blue country to launch your campaign", 2500);
    gamestart=false;
}

function conquer(country, team) {
    var $activeCountry = $('#' + country);
    if (team == "red") {
        aiCountries.push(country);
        if (playerCountries.indexOf(country) == -1) {
            allCountries.splice(allCountries.indexOf(country), 1);
        } else {
            playerCountries.splice(playerCountries.indexOf(country), 1);
        }
        $activeCountry.attr("src", $activeCountry.attr("src").replace("countries-gray", "countries-red").replace("countries-blue", "countries-red")).css('opacity', 0.6).addClass("redCountry").removeClass("blueCountry");
    } else {
        playerCountries.push(country);
        if (aiCountries.indexOf(country) == -1) {
            allCountries.splice(allCountries.indexOf(country), 1);
        } else {
            aiCountries.splice(aiCountries.indexOf(country), 1);
        }
        $activeCountry.attr("src", $activeCountry.attr("src").replace("countries-gray", "countries-blue").replace("countries-red", "countries-blue")).css('opacity', 0.6).addClass("blueCountry").removeClass("redCountry");
    }
    strengths[theme.countries.indexOf(country)] = Math.min(strengths[theme.countries.indexOf(country)] + 1, 9);

    $activeCountry.hover(
        function () {
            if (playerTurn || $(this).hasClass('targetable')) {
                $(this).css('opacity', 1);
                var $this = $(this);
                var countryName = $this.attr("id");
                $('#hover-name').html("<div style='display: table;height: 100%;width:100%;text-align: center;'><div style='width:50px;font-size: 1.6em;margin-right: 10px;display: table-cell'><img src='img/quizination/defense.png' style='width:20px;display: inline'/><span> " + strengths[theme.countries.indexOf(countryName)] + "</span></div><div style='display: table-cell;line-height: 1em;height: 100%;vertical-align: middle;font-size: 1em;width:60px;'>" + toTitleCase(countryName.replace("-", " ")) + "</div></div>");
            }
        },
        function () {
            if (!$(this).hasClass('targetable')) {
                $(this).css('opacity', 0.6);
            }
            $('#hover-name').html('<h1 style="margin: 0;padding: 0;margin-top: -5px;">Round ' + roundnum + '</h1>');
        }
    )

}

function newAlly() {
    cardpick = Math.floor(Math.random() * aiCountries.length);
    var ally = aiCountries[cardpick];
    threatReduction += (strengths[theme.countries.indexOf(ally)] + 1);
    conquer(ally, "blue");
    $('.country').hide();
    $('#' + ally).fadeIn('slow', function () {
        showSplash("YOU HAVE A NEW ALLY");
        logIt(ally+' joined the blue player');
        showMessage("The round is over. End your turn", 750);
        endTurn();
    });

}

function startQuiz() {
    $('#btnBank').fadeOut();
    getQuestion();
}

function getQuestion() {
    var list = quiz.questions[Math.floor(Math.random() * 3)];
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var data = list[randomnum];
    setTimeout(function () {
        $('#qcard').fadeIn();
        $('#answerBlock').fadeIn();
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
    $('.answer').unbind('click').on('click', function () {
        processAnswers($(this).attr("id").split("x")[0]);
    });
}

function processAnswers(answer) {
    data = getAnswer($('#qid').html(), answer);
    var resultMsg = data.split('||')[1];
    var correctAnswer = data.split('||')[2];
    var answerPayoff = parseInt(data.split('||')[0]);
    $('#answerBlock').hide();
    $('#answerMsg').html("<div class='scribble'>" + resultMsg + "<br/>The correct answer is: <h3 style='color:gold;margin:0;padding:3px;'>" + correctAnswer + "</h3></div> ").fadeIn();
    setTimeout(function () {
        $('#answerMsg').html("");
        if (answerPayoff > 0) {
            toss = Math.floor(Math.random() * 3);
            if (toss != 0) {
                threatReduction = Math.min(threatReduction + Math.ceil(0.25 * threat), 100);
                if (threatReduction == 100) {
                    newAlly();
                } else {
                    showSplash("THREAT REDUCED");
                    logIt('Threat reduced');
                    showMessage("The round is over. End your turn", 750);
                    endTurn();
                }
            } else {
                newAlly();
            }
        } else {
            showSplash("DIPLOMACY FAILED");
            logIt('Diplomatic efforts failed');
            showMessage("The round is over. End your turn", 750);
            endTurn();
        }
    }, 3000);
}

function endTurn() {
    $('#map-wrapper').css('pointer-events','none');
    setTimeout(function(){
        $('.playerTurn').fadeOut(function () {
            if (playerTurn){
                $('#endBtn').unbind('click').fadeIn().on('click',function(){
                    playerTurn = false;
                    roundnum += 1;
                    showMessage("It is now the Red Player's turn.", 750);
                    $('#endBtn').fadeOut();
                    logIt('Round '+ roundnum+ ' starts');
                    $('#hover-name').html('<h1 style="margin: 0;padding: 0;margin-top: -5px;">Round ' + roundnum + '</h1>');
                    aiTurn();
                });
            }else{
                aiTurn();
            }
        });
    },2000);
}

function logIt(msg){
    $('#logger .content').append(msg+'<br/>');
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}