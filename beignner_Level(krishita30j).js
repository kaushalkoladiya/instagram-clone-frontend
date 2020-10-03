//1. Do the inverse of method "push()".

var arr = [12, 45, 67, 23, 78];
arr.unshift(100);
console.log(arr);
//Output: [100, 12, 45, 67, 23, 78]


//2. Inverse of the output.

const x = [];
const y = 1;

console.log(x == y ? false : true);
//Output: true


//3. Variable's scope

const a = 10;

function foo() {
    var a = 20;
}
console.log(a);

foo();
//Output: 10


//4. Array's value

var fruits = ['Lemon', 'Pomelo', 'Kumquat', 'Yuzu', 'Blood orange'];

fruits.forEach((currentValue) => {

        console.log(currentValue)

    })
    /*
        Output:
        Lemon
        Pomelo
        Kumquat
        Yuzu
        Blood orange
    */


//5. Fix the bug

var str = "This is JavaScript";
console.log(str.indexOf("is"));