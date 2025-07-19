// 1  find the highest number in the array

// ans 1 

function findMax(arr) {
    let max = arr[0];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(findMax([3, 7, 2, 9, 5])); // 9


// ans 2 using Math.max
const arr = [3, 7, 2, 9, 5];

const max = arr.reduce((acc, curr) => acc > curr ? acc : curr, arr[0]);

console.log(max); // 9


// ans 3 
const arr = [3, 7, 2, 9, 5];

const max = arr.reduce((acc, curr) => acc > curr ? acc : curr, arr[0]);

console.log(max); // 9


// ans  
const arr = [3, 7, 2, 9, 5];
const max = arr.sort((a, b) => b - a)[0];
console.log(max); // 9


