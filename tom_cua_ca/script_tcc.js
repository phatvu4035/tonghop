var slide1 = ['Babybed.png', 'Babyseat.png', 'Babytable.png', 'Babytable.png', 'Bankseat.png', 'Babytable.png', 'Barchair.png', 'Bonsai.png', 'Bathfurniture.png', 'Bigkitchen.png', 'Biglamp.png'];
var slide2 = [ 'Babyseat.png', 'Babytable.png', 'Babybed.png', 'Babytable.png', 'Babytable.png', 'Bankseat.png', 'Barchair.png', 'Bathfurniture.png', 'Bigkitchen.png', 'Biglamp.png', 'Bonsai.png'];
var slide3 = ['Babyseat.png', 'Babybed.png', 'Babytable.png', 'Babytable.png', 'Babytable.png', 'Bankseat.png', 'Barchair.png', 'Bigkitchen.png','Bathfurniture.png' , 'Bonsai.png', 'Biglamp.png'];
var t = 0;
var d = new Date();
console.log('bat dau', d.getTime());
function renderSlide(target, slides)
{
    slides.map(function (s, index) {
        index = index + 1;
        var slide = document.createElement('div');
        slide.classList.add('elem' + index);
        var img = document.createElement('img');
        img.src = 'icons/Household/' + s;
        slide.style.position = 'absolute';
        var top = (index - 1) * 65;
        slide.style.top = top+ 'px';
        slide.appendChild(img);
        target.appendChild(slide);
    });
}

class ManageIndex
{
    constructor(slide)
    {
        this.index = 0;
        this.slide = slide;
    }

    run()
    {
        let max = Math.floor(Math.random() * 6);
        if(max < 2) {
            max = 2;
        }
        let time = Math.floor(Math.random() * 30);
        if(time < 20) {
            time = 20;
        }
        this.max = max;
        this.time = time;
        // Tinh do dich chuyen từng slide
        let s = time * 65;
        this.slide.run(s, time);
        this.slide.addTimer(max/time, 1, max);
    }
}

class Slide
{
    constructor(target, slideSource)
    {
        this.target = target;
        this.slideSource = slideSource;
        this.index = 0;
    }
    // Khi chay 1 slide thi phai them 1 slide o cuoi
    addTimer(time,dir, max)
    {
        var slide = document.createElement('div');
        slide.classList.add('elem' + this.index);
        var img = document.createElement('img');
        var index = this.index % this.slideSource.length;
        img.src = 'icons/Household/' + this.slideSource[index];
        slide.appendChild(img);
        var firstChild = this.target.firstChild;
        var lastChild = this.target.lastChild;
        if(dir) {
            this.target.appendChild(slide);
            // Go bo div tren cung
            this.target.removeChild(firstChild);
        } else {
            this.target.insertBefore(slide, firstChild);
            this.target.removeChild(lastChild);
        }
        // Just added
        var justAddedSlide = this.target.querySelector('.elem' + this.index);
        justAddedSlide.style.position = 'absolute';
        justAddedSlide.style.top = ((this.index - 1) * 65) + 'px';


    }

    run(s, time)
    {
        let target = this.target;
        // Tim den tung cai item va update
        for(let x of Array.from(target.children)) {
            let top = x.offsetTop + s;
            x.style.WebkitTransition = 'all ' + time + 's ease-out';
            x.style.transition = 'all ' + time + 's ease-out';
            x.style.top = top + 'px';
        }
        // target.children.forEach(function (item) {
        //     item.style.WebkitTransition = 'all ' + time + 's ease-out';
        //     item.style.transition = 'all ' + time + 's ease-out';
        // })
    }

}


function movingSlide(slide, time) {
    if(slide) {
        let top = slide.offsetTop + 65;
        slide.style.top =  top + 'px';
        var transitionTime = (time/1000)+'s';
        slide.style.WebkitTransition = 'all ' + transitionTime + ' ease-out';
        slide.style.transition = 'all ' + transitionTime + ' ease-out';
    }
}

const target1 = document.querySelector('.col2-slide-running');
renderSlide(target1, slide1);
const target2 = document.querySelector('.col3-slide-running');
renderSlide(target2, slide2);
const target3 = document.querySelector('.col4-slide-running');
renderSlide(target3, slide3);

const button1 = document.querySelector('.col1-button button');
const button2 = document.querySelector('.col5-button button');


var runningSlide1 = new Slide(target1, slide1);
var runningSlide2 = new Slide(target2, slide2);
var runningSlide3 = new Slide(target3, slide3);

var manageIndex1 = new ManageIndex(runningSlide1);
var manageIndex2 = new ManageIndex(runningSlide2);
var manageIndex3 = new ManageIndex(runningSlide3);

button1.addEventListener('click', function (e) {
    manageIndex1.run();
    manageIndex2.run();
    manageIndex3.run();
})

