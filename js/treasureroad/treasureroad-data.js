window.user = {};
user.credits = 205;

window.theme = {};
theme.background = "img/treasureroad/background.jpg";
theme.sphinx = "img/treasureroad/campaigns/sphinx.png";
theme.diaryback = "img/treasureroad/diarytexture.jpg";
theme.mapsrc = "img/treasureroad/maps/";
theme.iconsrc = "img/treasureroad/icons/";
theme.icons = ["HillTown.png", "Castle.png", "Necropolis.png", "Citadel.png", "Stronghold.png"];
theme.credits_name = "Geocoins";
theme.cities = ['Rayris', 'Dowor', 'Slale', 'Kalist', 'Ightdton', 'Stycha', 'Tregha', 'Rying', 'Aughgha', 'Garghae', 'Kelash', 'Lir', 'Dendela', 'Ildyrt', 'Morrage', 'Lyesdra', 'Omsul', 'Irrode', 'Polburu', 'Aleeph', 'Burunt', 'Aleuch', 'Reough', 'Rodid', 'Issaz', 'Crykim', 'Nalyv', 'Whean', 'Schaem', 'Kimwor', 'Tinul', 'Hiril', 'Kallori', 'Tasrane', 'Hinkalo', 'Cyer', 'Echtai', 'Rothziss', 'Slikin', 'Ightas', 'Ashis', 'Isoz', 'Delkimi', 'Honril', 'Darjper', 'Quidel', 'Oldyrt', 'Delhund', 'Osach', 'Athaq', 'Anrili', 'Oughyer', 'Woren', 'Shyight', 'Schoqua', 'Hitur', 'Anglery', 'Issey', 'Radum', 'Ialde', 'Radlest', 'Garbque', 'Athpolo', 'Cerkal', 'Aleser', 'Rhas', 'Shyuch', 'Inapina', 'Queust', 'Leden', 'Quatori', 'Duton', 'Hinkaw', 'Ildight', 'Turdund', 'Burxeng', 'Rothid', 'Enthyt', 'Belessa', 'Atbaugh', 'Arding', 'Rothom', 'Theras', 'Tasbura', 'Mosesti', 'Lytur', 'Aroth', 'Hatynt', 'Rodhat', 'Honlgha', 'Zitan', 'Emeta', 'Bias', 'Nalbyer', 'Vesorm', 'Perut', 'Radworu', 'Denat', 'Danbhon', 'Athsqua', 'Garilt', 'Kelen', 'Skelton', 'Imppol', 'Dynok', 'Omdang', 'Issemo', 'Whaim', 'Roas', 'Aleit', 'Oughelm', 'Kimrod'];

window.game = {};
game.level = 2;
game.travelcost = 100;
game.mapMatrix = [
    {id: 1, lx: 1, ly: 1, name: "Erindor", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 2, lx: 2, ly: 1, name: "Mithkoti", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 3, lx: 3, ly: 1, name: "Gragoo", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 4, lx: 1, ly: 2, name: "Ux", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 5, lx: 2, ly: 2, name: "Florifort", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 6, lx: 3, ly: 2, name: "Lorilia", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 7, lx: 1, ly: 3, name: "Xyq", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 8, lx: 2, ly: 3, name: "Joreberg", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 },
    {id: 9, lx: 3, ly: 3, name: "Poliwip", destinationCount: Math.floor(Math.random() * (game.level + 2)) + 1, mapnum: Math.floor(Math.random() * 9) + 1 }
];

game.destinationMatrix = [];

game.campaigns = [
    {id: 1, name: "Small Treasure Hunt", campicon: "img/treasureroad/campaigns/treasure.png", desc: "Pay 100 Gold to get 0 - 300 Gold", cost: {minimum: 100, maximum: 100, currency: "Gold"}, payoff: {minimum: 0, maximum: 300, currency: "Gold"}},
    {id: 2, name: "Large Treasure Hunt", campicon: "img/treasureroad/campaigns/treasure.png", desc: "Pay 300 Gold to get 0 - 1000 Gold", cost: {minimum: 300, maximum: 300, currency: "Gold"}, payoff: {minimum: 0, maximum: 1000, currency: "Gold"}},
    {id: 3, name: "Rest at an Inn", campicon: "img/treasureroad/campaigns/inn.png", desc: "Pay 100 Gold to get 0 - 30 Life", cost: {minimum: 100, maximum: 100, currency: "Gold"}, payoff: {minimum: 0, maximum: 30, currency: "Life"}},
    {id: 4, name: "Visit a Doctor", campicon: "img/treasureroad/campaigns/doctor.png", desc: "Pay 300 Gold to get 100 Life", cost: {minimum: 300, maximum: 300, currency: "Gold"}, payoff: {minimum: 100, maximum: 100, currency: "Life"}},
    {id: 5, name: "Gladiator Contest", campicon: "img/treasureroad/campaigns/gladiators.png", desc: "You will lose 0 - 50 Life to get 0-500 Gold", cost: {minimum: 0, maximum: 50, currency: "Life"}, payoff: {minimum: 0, maximum: 500, currency: "Gold"}},
    {id: 6, name: "Meet the Sphinx", campicon: "img/treasureroad/campaigns/sphinx.png", desc: "Answer a question to learn of the location of the Grail", cost: {minimum: 0, maximum: 0, currency: "Question"}, payoff: {minimum: 0, maximum: 0, currency: "Answer"}}
];

function getMap(id) {
    var result = $.grep(game.mapMatrix, function (e) {
        return e.id == id;
    });
    return result[0].mapnum;
}
function getMapName(id) {
    var result = $.grep(game.mapMatrix, function (e) {
        return e.id == id;
    });
    return result[0].name;
}

function createDestinations() {
    for (i = 1; i < 10; i++) {
        setDestination(i);
    }
}

function setDestination(id) {
    var activeMap = $.grep(game.mapMatrix, function (e) {
        return e.id == id;
    });
    var dcount = activeMap[0].destinationCount;
    var dArray = [];
    for (j = 0; j < dcount; j++) {
        var list = theme.icons;
        var elemlength = list.length;
        var randomnum = Math.floor(Math.random() * elemlength);
        var data = list[randomnum];
        var list2 = theme.cities;
        var elemlength2 = list2.length;
        var randomnum2 = Math.floor(Math.random() * elemlength2);
        var data2 = list2[randomnum2];
        dArray.push({lx: activeMap[0].lx, ly: activeMap[0].ly, icon: data, name: data2, posx: Math.floor(Math.random() * 75) + 10, posy: Math.floor(Math.random() * 75) + 10, dtype: Math.floor(Math.random() * 2) + 1 });
        theme.cities.splice(theme.cities.indexOf(data2), 1);
    }
    game.destinationMatrix.push(dArray);
}

function getDestination(id) {
    return game.destinationMatrix[id - 1];
}

function setGrail() {
    var list = game.destinationMatrix;
    var elemlength = list.length;
    var randomnum = Math.floor(Math.random() * elemlength);
    var kingdom = list[randomnum];

    var list2 = kingdom;
    var elemlength2 = list2.length;
    var randomnum2 = Math.floor(Math.random() * elemlength2);
    game.grail = list2[randomnum2].name;
    game.xcell = list2[randomnum2].lx;
    game.ycell = list2[randomnum2].ly;
}
