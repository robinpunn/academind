const buttonts = document.querySelector("button")!;
const input1ts = document.getElementById("num1")! as HTMLInputElement;
const input2ts = document.getElementById("num2")! as HTMLInputElement;

function addts(num1: number, num2: number) {
        return num1 + num2;
    }
  
buttonts.addEventListener("click", function () {
  console.log(addts(+input1ts.value, +input2ts.value));
});
