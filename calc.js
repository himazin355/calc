var formula = document.getElementById("formula");
var result = document.getElementById("result");
var answer = 0;
var f = localStorage.getItem("Formula");
if (f != null) formula.value = f;
var r = localStorage.getItem("Result");
if (r != null) result.innerHTML = r;
var a = localStorage.getItem("Answer");
if (a != null) answer = a;
$("#formula").on("input", function (e) {
  localStorage.setItem("Formula", formula.value);
});
function add(elem) {
  formula.value += elem.value;
  localStorage.setItem("Formula", formula.value);
}
function HEX() {
	var ans = parseInt(formula.value);
	var HEX = ans.toString(16);
	localStorage.setItem("Result", HEX);
	result.innerHTML =  "= " + HEX;
}
function OCT() {
	var ans = parseInt(formula.value);
	var OCT = ans.toString(8);
	localStorage.setItem("Result", OCT);
	result.innerHTML =  "= " + OCT;
}
function BIN() {
	var ans = parseInt(formula.value);
	var BIN = ans.toString(2);
	localStorage.setItem("Result", BIN);
	result.innerHTML =  "= " + BIN;
}
function del() {
  var f = formula.value;
  formula.value = f.substring(0, f.length - 1);
  localStorage.setItem("Formula", formula.value);
}
function ac() {
  formula.value = "";
  localStorage.setItem("Formula", formula.value);
  localStorage.setItem("Result", "");
  result.innerHTML = "";
}
function cal() {
  var f = formula.value;
var s = 0, e = 0;
  Array.prototype.forEach.call(f, function (c) {
    if (c == "(") s++;
    if (c == ")") e++;
  });
  for (var i = 0; i < s - e; i++)f += ")";
 f = f.replace(/\^/g, "**");
  f = f.replace(/deg/g, "180/pi");
  f = f.replace(/rad/g, "pi/180");
  f = f.replace(/pi/g, "Math.PI");
  f = f.replace(/e(?!xp)/g, "Math.E");
  f = f.replace(/(a??sin|a??cos|a??tan|abs|pow|log|exp|hypot)/g, "Math.$&");
  f = f.replace(/(sqr|cbr)/g, "Math.$&t");
  f = f.replace(/random/g, "Math.random()");
  f = f.replace(/ans/g, " " + answer + " ");
  try {
    var r = new Function("return " + f)();
    r = Math.round(r * 10e+8) / 10e+8;
    if (Number.isNaN(r)) throw Error;
    result.innerHTML = "= " + r;
    answer = r;
  }
  catch (e) {
    result.innerHTML = "<span>error</span>";
  }
	localStorage.setItem("Result", result.innerHTML);
  localStorage.setItem("Answer", answer);
  return false;
}
