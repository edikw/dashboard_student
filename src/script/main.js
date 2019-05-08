function test(event) {

var target = event.target.src;

console.log(target)

var pict = document.getElementById("itemPict");
pict.src = target;


var modal = document.getElementById('myModal');
modal.style.display = "block";
}

function closePage(){
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];

modal.style.display = "none";
}