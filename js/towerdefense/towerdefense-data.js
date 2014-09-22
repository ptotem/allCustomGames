window.user = {};

window.theme = {};
theme.background = "img/towerdefense/background.jpg";
theme.dropRatio = 0.93;

window.game = {};
game.startHeight = 50;
game.maxHeight = 5;

var myCards = [
    {
        "card1": {"type": "attack", "id": "1", "red": "6", "blue": "0", "green": "0", "attack": "-4", "build": "0", "image": "img/towerdefense/cardred.png"},
        "card2": {"type": "build", "id": "2", "red": "0", "blue": "10", "green": "0", "attack": "0", "build": "10", "image": "img/towerdefense/cardblue.png"},
        "card3": {"type": "green", "id": "3", "red": "6", "blue": "0", "green": "5", "attack": "-10", "build": "0", "image": "img/towerdefense/cardgreen.png"},
        "card4": {"type": "green", "id": "4", "red": "0", "blue": "10", "green": "5", "attack": "0", "build": "14", "image": "img/towerdefense/cardgreen.png"},
        "card5": {"type": "resource", "id": "5", "red": "0", "blue": "0", "green": "0", "attack": "0", "build": "0", "image": "img/towerdefense/cardres.png"},

        "card6": {"type": "attack", "id": "6", "red": "10", "blue": "0", "green": "0", "attack": "-8", "build": "0", "image": "img/towerdefense/cardred.png"},
        "card7": {"type": "build", "id": "7", "red": "0", "blue": "14", "green": "0", "attack": "0", "build": "14", "image": "img/towerdefense/cardblue.png"},
        "card8": {"type": "green", "id": "8", "red": "10", "blue": "0", "green": "10", "attack": "-20", "build": "0", "image": "img/towerdefense/cardgreen.png"},
        "card9": {"type": "green", "id": "9", "red": "0", "blue": "14", "green": "10", "attack": "0", "build": "24", "image": "img/towerdefense/cardgreen.png"},
        "card10": {"type": "resource", "id": "10", "red": "0", "blue": "0", "green": "0", "attack": "0", "build": "0", "image": "img/towerdefense/cardres.png"}

    }
];
//var theImages = [myCards[0].card1.image, myCards[0].card2.image, myCards[0].card3.image];


var theImages =  ["card1","card2","card3","card4","card5","card6","card7","card8","card9", "card10"];
function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

$(function () {
    keyArray = shuffle(theImages);

    var red_val, blue_val, green_val, attack_val, build_val, card_type, card_image;
    $.each(keyArray, function (index, value) {
        red_val = eval("myCards[0]." + value + ".red");
        blue_val = eval("myCards[0]." + value + ".blue");
        green_val = eval("myCards[0]." + value + ".green");
        attack_val = eval("myCards[0]." + value + ".attack");
        build_val = eval("myCards[0]." + value + ".build");
        card_type = eval("myCards[0]." + value + ".type");
        card_image = eval("myCards[0]." + value + ".image");

//      $('.card-container').find('.cards').eq(index).append('<img data-val-type="' + card_type + '" data-val-green="' + green_val + '" data-val-build="' + build_val + '" data-val-blue="' + blue_val + '" data-val-red="' + red_val + '" src="' + value + '" data-val-attack="' + attack_val + '">');
        $('.card-container').find('.cards').eq(index).append('<img data-val-type="'+card_type +'" data-val-green="'+green_val+'"data-val-build="'+ build_val +'" data-val-blue="'+blue_val+'" data-val-red="'+red_val+'" data-val-attack="'+attack_val+'" src="'+card_image+'" class="card-image"/>');

    });
});










