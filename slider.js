var sliderCount = 0;
const sliderPages = 3; //Amount of slides you have (.slider-content class) - CHANGE if needed
const sliderAutoplayTime = 3500; //Atuoplay time in millisecs - CHANGE if needed

var interval;

function changeSlide(next = true){
    if(next){
        sliderCount++;
        if(sliderCount > (sliderPages - 1))
            sliderCount = 0;
    }else{
        sliderCount--;
        if(sliderCount < 0)
            sliderCount = sliderPages - 1;
    } 
    showSlide();
}

function createNewInterval(){
    clearInterval(interval);
    interval = setInterval(changeSlide, sliderAutoplayTime);
}

//Clicked on arrow
function changeSlideByArrow(next){
    createNewInterval();
    changeSlide(next);
}

//Clicked on dot
function changeSlideByDot(newSliderCount){
    createNewInterval();

    if(newSliderCount > (sliderPages - 1) || newSliderCount < 0){
        alert("Ne próbálkozz!");
        sliderCount = 0;
    }

    sliderCount = Number(newSliderCount);
    showSlide();
}

function calculatePrevPos(){
    var prevPos = sliderCount - 1;
    if(prevPos < 0)
        prevPos = sliderPages - 1;
    return prevPos;
}

function fadeInCurrentSlide(currentSlide, slides){
    slides[currentSlide].style.zIndex = "1";
    slides[currentSlide].classList.remove('fade-out');
    slides[currentSlide].classList.add('fade-in');  
}

function fadeOutPrevSlide(prevSlide, slides){
    slides[prevSlide].style.zIndex = "0";
    slides[prevSlide].classList.remove('fade-in');
    slides[prevSlide].classList.add('fade-out');
}

function showSlide(){
    //DOTS
    var dots = document.getElementsByClassName('slider-dot');
    for(let i = 0; i < dots.length; ++i){
        dots[i].src = "dot.svg";
    }
    dots[sliderCount].src = "red_dot.svg"
    //DOTS END

    //SLIDES
    var slides = document.getElementsByClassName('slider-content');
    const prevSlidePos = calculatePrevPos();
    //HIDING UNNECCESSARY SLIDES    
    for(let i = 0; i < slides.length; ++i){
        if(i == sliderCount || i == prevSlidePos)
            slides[i].style.display = "block";
        else
            slides[i].style.display = "none";
    }

    fadeInCurrentSlide(sliderCount, slides);  
    fadeOutPrevSlide(prevSlidePos, slides);
}

(function(){
    //if(document.body.classList.contains('PAGE_BODY_CLASS_NAME')) USE IF YOU WANT SLIDER ONLY ON SPECIFIC PAGE (give the wanted page a specific class name)
        interval = setInterval(changeSlide, sliderAutoplayTime);
})();

/*By @retirem - 05.02.2022.*/

