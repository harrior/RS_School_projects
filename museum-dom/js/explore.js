function compareImages() {
    let exploreOverlay = document.querySelector(".explore__image-overlay");
    let exploreOriginalImage = document.querySelector(".explore__image-before");

    let clicked = 0;

    let w = exploreOriginalImage.clientWidth;
    let h = exploreOriginalImage.clientHeight;


    /*create slider:*/
    let slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    /*insert slider*/
    exploreOverlay.parentElement.insertBefore(slider, exploreOverlay);
    /*position the slider in the middle:*/
    slider.style.top = `-${(slider.offsetHeight - h)/2}px`;
    slider.style.left = `calc(60% - ${slider.offsetWidth / 2}px)`;

    exploreOverlay.style.width = "60%";

    /* add event listeners */
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
        e.preventDefault();
        clicked = 1;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        clicked = 0;
    }

    function slideMove(e) {
        let pos;
        if (clicked === 0) return false;
        pos = getCursorPos(e)
        /*prevent the slider from being positioned outside the image:*/
        if (pos < 0) pos = 0;
        if (pos > exploreOriginalImage.clientWidth) pos = exploreOriginalImage.clientWidth;

        slide(pos);
    }

    function getCursorPos(e) {
        let a, x = 0;
        /*get the x positions of the image:*/
        a = exploreOverlay.getBoundingClientRect();
        /*calculate the cursor's x coordinate, relative to the image:*/
        x = e.pageX - a.left;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        return x;
    }

    function slide(x) {
        exploreOverlay.style.width = x + "px";
        slider.style.left = exploreOverlay.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
}

document.addEventListener('DOMContentLoaded',compareImages)