const a = [];
const b = a;
b.push(1);
console.log(a); // [1]
console.log(a === b); // true
