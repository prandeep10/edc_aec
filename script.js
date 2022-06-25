const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});


var index = 0;
var slides = document.querySelectorAll(".slides");
var dot = document.querySelectorAll(".dot");

function changeSlide(){

  if(index<0){
    index = slides.length-1;
  }
  
  if(index>slides.length-1){
    index = 0;
  }
  
  for(let i=0;i<slides.length;i++){
    slides[i].style.display = "none";
    dot[i].classList.remove("active");
  }
  
  slides[index].style.display= "block";
  dot[index].classList.add("active");
  
  index++;
  
  setTimeout(changeSlide,2000);
  
}

changeSlide();
















var sliderTeam = (function(document, $) {
  
  'use strict';
  
  var $sliderTeams = $('.slider--teams'),
      $list = $('#list'),
      $listItems = $('#list li'),
      $nItems = $listItems.length,
      $nView = 3,
      autoSlider,
      $current = 0,
      $isAuto = true,
      $acAuto = 2500,
      
      _init = function() {
        _initWidth();
        _eventInit();
      },
      
      _initWidth = function() {
        $list.css({
          'margin-left': ~~(100 / $nView) + '%',
          'width': ~~(100 * ($nItems / $nView)) + '%'
        });
        $listItems.css('width', 100 / $nItems + '%');
        $sliderTeams.velocity({ opacity: 1 }, { display: "block" }, { delay:1000 });
      },
      
      _eventInit = function() {
        
        window.requestAnimFrame = (function() {
          return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
        })();

        window.requestInterval = function(fn, delay) {
            if( !window.requestAnimationFrame       && 
                !window.webkitRequestAnimationFrame && 
                !window.mozRequestAnimationFrame    && 
                !window.oRequestAnimationFrame      && 
                !window.msRequestAnimationFrame)
                    return window.setInterval(fn, delay);
            var start = new Date().getTime(),
            handle = new Object();

            function loop() {
                var current = new Date().getTime(),
                delta = current - start;
                if(delta >= delay) {
                    fn.call();
                    start = new Date().getTime();
                }
                handle.value = requestAnimFrame(loop);
            };
            handle.value = requestAnimFrame(loop);
            return handle;
        }

        window.clearRequestInterval = function(handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value)   :
            window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
            window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
            window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(handle.value) :
            clearInterval(handle);
        };
        
        $.each($listItems, function(i) {
          var $this = $(this);
          $this.on('touchstart click', function(e) {
            e.preventDefault();
            _stopMove(i);
            _moveIt($this, i);
          });
        });
        
        autoSlider = requestInterval(_autoMove, $acAuto);
      },
      
      _moveIt = function(obj, x) {
        
        var n = x;
        
        obj.find('figure').addClass('active');        
        $listItems.not(obj).find('figure').removeClass('active');
        
        $list.velocity({
          translateX: ~~((-(100 / $nItems)) * n) + '%',
          translateZ: 0
        }, {
          duration: 1000,
          easing: [400, 26],
          queue: false
        });
        
      },
      
      _autoMove = function(currentSlide) {
        if ($isAuto) { 
          $current = ~~(($current + 1) % $nItems);
        } else {
          $current = currentSlide;
        }
        console.log($current);
        _moveIt($listItems.eq($current), $current);
      },
      
      _stopMove = function(x) {
        clearRequestInterval(autoSlider);
        $isAuto = false;
        _autoMove(x);
      };
  
  return {
    init: _init
  };

})(document, jQuery);

$(window).load(function(){
  'use strict';
  sliderTeam.init();
});























function toggleMobileBtn() {
  document.getElementById('m-btn').classList.toggle('arrow-state');
  document.getElementById('nav').classList.toggle('nav-expand-state');
}

// SEAT ANIMATION TOOL
document.addEventListener("DOMContentLoaded", function () {
  const timeBetweenAnimations = 90;

  reloadAnimations(timeBetweenAnimations);
});

function reloadAnimations(timeBetweenAnimations) {
  let parentAnimations = document.getElementsByClassName("parentAnimation");
  let childAnimations = document.getElementsByClassName("childAnimation");
  let heroAnimations = document.getElementsByClassName("heroAnimation");
  let imageAnimations = document.getElementsByClassName("image-animation");
  let fadeInAnimations = document.getElementsByClassName("fade-in-animation");
  let pageFadeAnimations = document.getElementsByClassName(
    "page-fade-animation"
  );

  resetAnimationsArray(parentAnimations, "parentAnimationKeyframes");
  resetAnimationsArray(childAnimations, "childAnimationKeyframes");
  resetAnimationsArray(heroAnimations, "heroAnimationKeyframes");
  resetAnimationsArray(imageAnimations, "image-animation-keyframes");
  resetAnimationsArray(fadeInAnimations, "fade-in-animation-keyframes");
  resetAnimationsArray(pageFadeAnimations, "page-fade-animation-keyframes");

  playAnimationsArray(
    parentAnimations,
    timeBetweenAnimations,
    "parentAnimationKeyframes"
  );
  playAnimationsArray(
    childAnimations,
    timeBetweenAnimations,
    "childAnimationKeyframes"
  );
  playAnimationsArray(
    heroAnimations,
    timeBetweenAnimations,
    "heroAnimationKeyframes"
  );
  playAnimationsArray(
    imageAnimations,
    timeBetweenAnimations,
    "image-animation-keyframes"
  );
  playAnimationsArray(
    fadeInAnimations,
    timeBetweenAnimations,
    "fade-in-animation-keyframes"
  );

  playAnimationsArray(
    pageFadeAnimations,
    timeBetweenAnimations,
    "page-fade-animation-keyframes"
  );
}

function resetAnimationsArray(animationsArray, animation) {
  for (let i = 0; i < animationsArray.length; i++) {
    animationsArray[i].classList.remove(animation);
  }
}

function playAnimationsArray(
  animationsArray,
  timeBetweenAnimations,
  animation
) {
  let delay = 0;

  for (let i = 0; i < animationsArray.length; i++) {
    delay += timeBetweenAnimations;
    playAnimation(animationsArray, i, delay, animation);
  }
}

function playAnimation(animationsArray, index, delay, animation) {
  setTimeout(function () {
    animationsArray[index].classList.add(animation);
  }, delay);
}

// END SEAT ANIMATION  TOOL
