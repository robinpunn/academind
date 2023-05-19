var buttonts = document.querySelector("button");
var input1ts = document.getElementById("num1");
var input2ts = document.getElementById("num2");
function addts(num1, num2) {
    return num1 + num2;
}
buttonts.addEventListener("click", function () {
    console.log(addts(+input1ts.value, +input2ts.value));
});
