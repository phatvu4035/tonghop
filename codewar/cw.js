// Timf những từ có 5 kí tự trong 1 tring và đảo ngược vị trí
function spinWords(string){
    return string.replace(/\w{5,}/g, function(w) { return w.split('').reverse().join('') })
}

// Dem so bit = 1 cua 1 so
var countBits = function(n) {
    var binary = '';
    var sum = n;
    while ( sum > 0 ) {
        binary = ( sum % 2 ) + binary;
        sum = Math.floor( sum / 2 );
    }

    console.log(binary.replace(/0/g, '').length);

    return binary;
};

/*
* Write a function, persistence, that takes in a positive parameter num and returns its multiplicative persistence, which is the number of times you must multiply the digits in num until you reach a single digit.
persistence(39) === 3 // because 3*9 = 27, 2*7 = 14, 1*4=4
                       // and 4 has only one digit

 persistence(999) === 4 // because 9*9*9 = 729, 7*2*9 = 126,
                        // 1*2*6 = 12, and finally 1*2 = 2

 persistence(4) === 0 // because 4 is already a one-digit number
* */
function persistence(num) {
    var times = 0;

    num = num.toString();

    while (num.length > 1) {
        times++;
        num = num.split('').map(Number).reduce((a, b) => a * b).toString();
    }

    return times;
}
