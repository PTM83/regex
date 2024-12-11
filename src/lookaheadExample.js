const text = 'abc123 hut hft865 jkd xyz456 def'

const regexPositive = /\b\w{3}\B(?=\d)/g;
console.log(text.match(regexPositive)); // [ 'abc', 'hft', 'xyz' ]


const regexNegative = /\b\w{3}(?!\d)/g;
console.log(text.match(regexNegative)); // [ 'hut', 'jkd', 'def' ]

// const negativeText = text.split(" ").reduce((acc, word) => {
  
//   const match = word.match(regexNegative)
  
//   if(match) {
//     acc.push(match)
//   }
//   return acc
// }, [])

// console.log(negativeText.flat())