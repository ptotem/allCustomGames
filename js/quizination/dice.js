var count = 1;
var faceOne = 1;
var faceTwo = 1;
var faces = new Array();
var done = true;

function hideAngle(){
	$("#dieOne").removeClass('oneShown');
	$("#dieTwo").removeClass('twoShown');
}

function hideFace(dieOne,dieTwo){
	$("#dieOne #face"+dieOne+"").hide();
	$("#dieTwo #face"+dieTwo+"").hide();
}

function showAngle(){
	$("#dieOne").addClass('oneShown');
	$("#dieTwo").addClass('twoShown');
}

function setFaces(dieOne,dieTwo){
	$("#dieOne #face"+dieOne+"").show();
	$("#dieTwo #face"+dieTwo+"").show();
}

function finalRoll(){
	faceOne = Math.floor((Math.random()*6)+1);
	faceTwo = Math.floor((Math.random()*6)+1);

	setFaces(faceOne,faceTwo);

	done = true;
    return faceOne+faceTwo
}

$(document).ready(function(){

	for(var i=0; i<6; ++i){
		var die = i+1;
		$("#dieOne").append("<img src='img/quizination/dice/face"+die+".png' id='face"+die+"' />");
		$("#dieTwo").append("<img src='img/quizination//dice/face"+die+".png' id='face"+die+"' />");
		$("#dieOne #face"+die+"").hide();
		$("#dieTwo #face"+die+"").hide();
	}
	
	setFaces(1,1);

});