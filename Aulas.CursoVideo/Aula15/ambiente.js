/*
let num = [5, 8, 2, 9, 3]

console.log(`Nosso vetor é o ${num}`)
*/

let num = [5, 8, 2, 9, 3]
num.push(1)
num.sort()
console.log(num)
console.log(`O vetor tem ${num.length} posições`)
//console.log(num[0])
console.log(`O primeiro valor do vetor é ${num[0]}`)
//let pos = num.indexOf(8)
//console.log(`O valor 8 está na posição ${pos}`)
let pos = num.indexOf(4)
//console.log(`O valor 4 está na posição ${pos}`)
let pos = num.indexOf(4)
if (pos == -1) {
    console.log(`O valor não foi encontrado!`)
} else {
    console.log(`O valor está na posição ${pos}`)
}