// document.addEventListener('DOMContentLoaded', () => {

//     // Get all "navbar-burger" elements
//     const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

//     // Check if there are any navbar burgers
//     if ($navbarBurgers.length > 0) {

//         // Add a click event on each of them
//         $navbarBurgers.forEach( el => {
//             el.addEventListener('click', () => {

//                 // Get the target from the "data-target" attribute
//                 const target = el.dataset.target;
//                 const $target = document.getElementById(target);

//                 // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//                 el.classList.toggle('is-active');
//                 $target.classList.toggle('is-active');

//             });
//         });
//     }

// });


// Card

const tiltEffectSettings = {
    max: 10,
    perspective: 1000,
    scale: 1,
    speed : 500,
    easing: "cubic-bezier(.03,.98,.52,.99)",
};

const cards = document.querySelectorAll(".tilt-card");


cards.forEach(card => {
    card.addEventListener("mouseenter" , cardMouseEnter);
    card.addEventListener("mousemove" , cardMouseMove);
    card.addEventListener("mouseleave" , cardMouseLeave);
})



function cardMouseEnter (event) {
    setTransition(event);
};

function cardMouseMove(event) {
    const card = event.currentTarget;
    // So takes measure from top of card and not top of screen
    const cardBound = card.getBoundingClientRect();
    
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = cardBound.left + cardWidth/2;
    const centerY = cardBound.top + cardHeight/2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = ((+1)*tiltEffectSettings.max*mouseY/(cardHeight/2));
    const rotateYUncapped = ((-1)*tiltEffectSettings.max*mouseX/(cardWidth/2)); 
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings : (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings : (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);
    
    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3D(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
    
};

function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3D(1, 1, 1)`;
    setTransition(event);
};

function setTransition(event){
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = ""
    }, tiltEffectSettings.speed);
};