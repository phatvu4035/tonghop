const operations = ['x', ':', '+', '-'];
const level1 = ['x', ':'];
const level2 = ['+', '-'];

var display_entry = document.querySelector('.cal-display_entry');
var display_typing = document.querySelector('.cal-display_typing');

const allow_key = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48];
display_typing.addEventListener('keypress', function(e) {
    
});

document.querySelectorAll('.cal-num').forEach(elem => {
    elem.addEventListener('click', function(e) {
        let rel = this.getAttribute('rel');
        var display_entry = document.querySelector('.cal-display_entry');
        var displayEntry = display_entry.textContent;
        let displayTyping = display_typing.textContent;
        // Update entry display entry
        if(rel == 'ce' || rel == 'c') {
            displayEntry = '';
        } else if(rel == 'divide') {
            displayEntry = displayEntry + ' :';
        } else if(rel == 'times') {
            displayEntry = displayEntry + ' x';
        } else if(rel == 'plus') {
            displayEntry = displayEntry + ' +';
        } else if(rel == 'minus') {
            displayEntry = displayEntry + ' -';
        } else if(rel == 'backspace') {
            let objStr = new RegExp('\\s{1}[\w]', '$') ;
            displayEntry = displayEntry.substring(0, displayEntry.length - 1);

        } else if(rel == '+-') {
            let addedNum = displayTyping.includes('+') ? displayTyping.replace('-') : displayTyping.replace('+');
            displayEntry = displayEntry + ' ' + addedNum;
            displayTyping.textContent = addedNum;
        } else if(rel == '=') {
            handleCalc();
        } else if(rel == '.') {
            displayEntry = displayEntry + ' -';
        } else {
            displayEntry = displayEntry + ' ' + rel;
        }
        display_entry.textContent = displayEntry;
    })
});

function handleCalc() {
    mapLevel1();
}

function mapLevel1() {
    // create map for entry
    var forLevel1 = [];
    var forLevel2 = [];
    /* 
    * c1
    * var re2 = /\s/;
    */
    // 2
    var re = new RegExp('\\s', 'g');
    var entry = display_entry.textContent;
    var entry = entry.replace(re, '');
    var entry_element = entry.split('');

    var opRe = new RegExp('\[x:+-]', 'g');
    var entry_number = entry.split(opRe);

    entry_element.map((val, i) => {
        // Loc lay danh sach cac operation
        if(level1.includes(val) || level2.includes(val)) {
            forLevel1.push(val);
        }
        if(level2.includes(val)) {
            forLevel2.push(val);
        }
    });

    // Narrow down the entry
    let holdValue1 = [...entry_number];
    if(forLevel1.length === 0) {
        holdValue1 = entry_number;
    } else {
        forLevel1.map((val, i) => {
            let oper = val;
            // Vi tong so luong toan tu nho hon tong so luong hang tu la 1 // No
            if(oper == 'x') {
                let newVal = Number(holdValue1[i]) * Number(holdValue1[i + 1]);
                holdValue1[i] = Math.floor(newVal);
                holdValue1.splice(i+1, 1);
            } else if(oper == ':') {
                let newVal = Number(holdValue1[i]) / Number(holdValue1[i + 1]);
                holdValue1[i] = Math.floor(newVal);
                holdValue1.splice(i+1, 1);
            }

        } );
    }

    mapLevel2(forLevel2, holdValue1);
}

function mapLevel2(forLevel2, holdValue1) {
    console.log(forLevel2, holdValue1);
    // Deepest level => go calculator result
    let holdValue2 = holdValue1[0];
    forLevel2.map((val, i) => {
        if(val === '+') {
            holdValue2 = holdValue2 + holdValue1[i + 1];
        }

        if(val === '-') {
            holdValue2 = holdValue2 - holdValue1[i + 1];
        }
    });

    console.log(holdValue2);
}






 

