var activeMap = "1,1";
var currentDstn = "";
var currentCityName = "";
var oldlife = 0;
var life = 100;
var oldgold = 0;
var gold = 500 + game.travelcost;
var blinkit;

$(function () {
    $('body').css('background-image', "url(" + theme.background + ")");
    blinkit=setInterval(blinker, 2000);
    $('#startClicker').on('click',function(){
        $('.gameTitle').fadeOut();
        $('.game-wrapper').fadeIn();
        clearInterval(blinkit);
        initGame();
    })


});

function blinker() {
    $('#startClicker').fadeOut(500, function(){
        $('#startClicker').fadeIn(500);
    });
}

function initGame(){
    initializeTheme();
    initializeDirections();
    createDestinations();
    setParams();
    setGrail();
    console.log(game.grail,game.xcell,game.ycell);
}

function setParams() {
    if (oldlife != life) {
        $('#life').countTo({
            from: oldlife,
            to: life,
            speed: 1000,
            refreshInterval: 10
        });
    }
    if (oldgold != gold) {
        $('#gold').countTo({
            from: oldgold,
            to: gold,
            speed: 1000,
            refreshInterval: 10
        });
    }
    oldlife = life;
    oldgold = gold;
}

function initializeTheme() {
    $('#sphinxpic').attr("src", theme.sphinx);
    moveMap(1, 1);
    $('.map-wrapper').animate({opacity: 1}, function () {
        setTimeout(function () {
            $('.stats-wrapper').css('background-image', "url(" + theme.diaryback + ")").fadeIn(function(){
                $('#compass').fadeIn();
            });
        }, 500);
    });
}

function initializeDirections() {
    $('#N').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(-1, 0)
        }
    });
    $('#NE').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(-1, 1)
        }
    });
    $('#E').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(0, 1)
        }
    });
    $('#SE').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(1, 1)
        }
    });
    $('#S').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(1, 0)
        }
    });
    $('#SW').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(1, -1)
        }
    });
    $('#W').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(0, -1)
        }
    });
    $('#NW').on('click', function () {
        if (gold > game.travelcost - 1) {
            moveMap(-1, -1)
        }
    });
}

function moveMap(dy, dx) {
    oldgold = gold;
    gold -= game.travelcost;
    setParams();
    var py = parseInt(activeMap.split(",")[0]) + dy;
    var px = parseInt(activeMap.split(",")[1]) + dx;

    switch (py) {
        case 1:
            $('.N').hide();
            break;
        case 3:
            $('.S').hide();
            break;
        case 2:
            $('.N').show();
            $('.S').show();
            break;
    }
    switch (px) {
        case 1:
            $('.W').hide();
            break;
        case 3:
            $('.E').hide();
            break;
        case 2:
            $('.W').show();
            $('.E').show();
            break;
    }
    switch (py) {
        case 1:
            $('.N').hide();
            break;
        case 3:
            $('.S').hide();
            break;
    }
    activeMap = py + "," + px;
    var activeId = 3 * (py - 1) + px;
    var $mapWrap = $('.map-wrapper');
    var $mapName = $('#map-name');
    var $destinations = $('#destinations');
    $mapName.fadeOut();
    $destinations.fadeOut();
    $mapWrap.slideUp(function () {
        $mapWrap.css('background-image', "url(" + theme.mapsrc + "map" + getMap(activeId) + ".png)");
        $mapName.html(getMapName(activeId));
        $mapWrap.slideDown(function () {
            $mapName.fadeIn();
        });
        $destinations.empty().fadeIn();
        var destinations = getDestination(activeId);
        $.each(destinations, function (index, elm) {
            $('#destinations').append("<img id='city_" + activeId + "_" + index + "' class='dstn' title='" + elm.name + "' src='" + theme.iconsrc + elm.icon + "' style='left:" + elm.posx + "%;top:" + elm.posy + "%'>");
        });
        $('.dstn').on('click', function () {
            $mapWrap.css('pointer-events', 'none');
            $this = $(this);
            currentDstn = $this.attr("id");
            var activeDstn = getDestination($this.attr("id").split('_')[1])[$this.attr("id").split('_')[2]];
            $('#baseprompter').hide();
            $('#citypic').html("<img src='" + theme.iconsrc + activeDstn.icon + "'/>");
            currentCityName=activeDstn.name;
            $('#cityname').html(activeDstn.name + " <small>" + activeDstn.icon.split(".png")[0] + "</small>");
            $('#prompter').show();
            $('#city-card').fadeIn();
            for (var i = 0; i < activeDstn.dtype; i++) {
                var clist = game.campaigns;
                var celemlength = clist.length;
                var crandomnum = Math.floor(Math.random() * celemlength);
                var cdata = clist[crandomnum];
                $('#campaigns').append('<li onclick="playCampaign(' + cdata.id + ')">' + cdata.name + '<div class="comm">' + cdata.desc + '</div></li>');
            }
            $('#campaigns').append("<li><a href='#' class='grailer splash'>Grail Expedition</a><div class='comm'>Pay 500 Gold to mount the expedition</div></li>");
            $('#campaigns').append("<li><a href='#' class='continuer splash'>Leave the City</a></li>")
            $('.continuer').on('click', function () {
                resetCampaigns();
            });
            $('.grailer').on('click', function () {
                grailCampaign();
            });

        });
    });

}

function resetCampaigns() {
    $('#' + currentDstn).remove();
    $('.map-wrapper').css('pointer-events', 'auto');
    $('#citypic').empty();
    $('#cityname').empty();
    $('#campaigns').empty();
    $('.splash').remove();
    $('#baseprompter').show();
    $('#prompter').hide();
    if($('.dstn').length==0 && gold<100){
        $('.game-wrapper').fadeOut();
        $('#gamename').html("<img src='img/treasureroad/broke.png' style='margin-top: -10%'/>");
        $('#startClicker').hide();
        $('.gameTitle').fadeIn();
        setTimeout(function(){
            $('.gameTitle').fadeOut();
            $('#gamename').html("Nowhere left to go");
            $('.gameTitle').fadeIn(function(){
                $('#startClicker').html("Click to play again").fadeIn();
                $('#startClicker').unbind().click(function(){
                    window.location.reload(false);
                })
            });
        },2000);
    }
}

function grailCampaign(){
    oldgold = gold;
    var $campaign = $('#campaigns');
    if (gold < 499) {
        $campaign.html("You can't afford that!");
        $('#choice-list').append("<a href='#' class='continuer splash'>Leave the City</a>");
        $('.continuer').on('click', function () {
            resetCampaigns();
        });
    } else {
        gold -= 500;
        if (currentCityName == game.grail) {
            $('.game-wrapper').fadeOut();
            $('#gamename').html("<img src='img/treasureroad/grail.png' style='margin-top: -10%'/>");
            $('#startClicker').hide();
            $('.gameTitle').fadeIn();
            setTimeout(function(){
                $('.gameTitle').fadeOut();
                $('#gamename').html("You found the Grail");
                $('.gameTitle').fadeIn(function(){
                    $('#startClicker').html("Click to play again").fadeIn();
                    $('#startClicker').unbind().click(function(){
                        window.location.reload(false);
                    })
                });
            },2500);
        } else {
            $('#prompter').hide();
            $campaign.html("That was a waste of money!!!<br/>");
            $('#choice-list').append("<a href='#' class='continuer splash'><br/>Leave the City</a>");
            $('.continuer').on('click', function () {
                resetCampaigns();
            });
        }
    }
    setParams();
}

function playCampaign(id) {
    var $campaign = $('#campaigns');
    var activeCampaign = game.campaigns[id - 1];
    var costCcy = activeCampaign.cost.currency;
    var payoffCcy = activeCampaign.payoff.currency;
    var valid = true;
    oldgold = gold;
    oldlife = life;
    $campaign.empty();
    $('#prompter').hide();
    if (costCcy != "Question") {
        var cost = Math.floor(Math.random() * (activeCampaign.cost.maximum - activeCampaign.cost.minimum)) + activeCampaign.cost.minimum;
        var payoff = Math.floor(Math.random() * (activeCampaign.payoff.maximum - activeCampaign.payoff.minimum)) + activeCampaign.payoff.minimum;
        if (costCcy == "Gold") {
            if (gold < activeCampaign.cost.maximum) {
                $campaign.html("You can't afford that!<br/>");
                valid = false;
            } else {
                gold -= cost;
                if (payoffCcy == "Gold") {
                    gold += payoff;
                } else {
                    life += payoff;
                }
            }
        } else {
            if (life < activeCampaign.cost.maximum) {
                $campaign.html("You can't afford that!<br/>");
                valid = false;
            } else {
                life -= cost;
                if (payoffCcy == "Gold") {
                    gold += payoff;
                } else {
                    life += payoff;
                }
            }
        }
        if (valid) {
            $('#choice-list').append("<div class='cresult splash'>You spent " + cost + " " + costCcy + " to gain " + payoff + " " + payoffCcy + "</div><img src='" + activeCampaign.campicon + "' class='campaign-icon splash'/><a href='#' class='continuer splash'><br/>Continue</a>");
        } else {
            $('#choice-list').append("<a href='#' class='continuer splash'><br/>Leave the City</a>");
        }

        setParams();

        $('.continuer').on('click', function () {
            resetCampaigns();
        });
    } else {
        getQuestion();
    }

}

function getQuestion() {
    var list = quiz.questions[Math.floor(Math.random() * 3)];
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var data = list[randomnum];
    $('#stats').hide();
    $('#city-card').hide();
    $('#compass').fadeOut();
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
        $('#sphinxpic').animate({width: "100%"}, function () {
            if (answerPayoff > 0) {
                var cpy = parseInt(activeMap.split(",")[0]);
                var cpx = parseInt(activeMap.split(",")[1]);
                var toss = Math.floor(Math.random() * 2);
                if (toss>0){
                    if (cpx == game.xcell) {
                        if (cpy == game.ycell) {
                            $('#answerMsg').html("The wise man knows when to stop looking and start digging").fadeIn();
                        } else {
                            if (cpy > game.ycell) {
                                $('#answerMsg').html("Head North to find the Grail").fadeIn();
                            } else {
                                $('#answerMsg').html("Head South to find the Grail").fadeIn();
                            }
                        }
                    } else {
                        if (cpx > game.xcell) {
                            $('#answerMsg').html("Head West to find the Grail").fadeIn();
                        } else {
                            $('#answerMsg').html("Head East to find the Grail").fadeIn();
                        }
                    }
                }else{
                    if (cpy == game.ycell) {
                        if (cpx == game.xcell) {
                            $('#answerMsg').html("The wise man knows when to stop looking and start digging").fadeIn();
                        } else {
                            if (cpx > game.xcell) {
                                $('#answerMsg').html("Head West to find the Grail").fadeIn();
                            } else {
                                $('#answerMsg').html("Head East to find the Grail").fadeIn();
                            }
                        }
                    } else {
                        if (cpy > game.ycell) {
                            $('#answerMsg').html("Head North to find the Grail").fadeIn();
                        } else {
                            $('#answerMsg').html("Head South to find the Grail").fadeIn();
                        }
                    }
                }
            } else {
                $('#answerMsg').html("You are not worthy of finding the grail").fadeIn();
            }
            $('#answerMsg').append("<br/><br/><a href='#' class='continuer splash'>Leave the City</a>");
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
        });

    }, 3000);
}
