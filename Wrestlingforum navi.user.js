// ==UserScript==
// @name         Wrestlingforum navi
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  Change pages with arrow keys
// @author       You
// @match        *://www.wrestlingforum.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==


function leftArrowPressed() {
      prevpage = $('.prevpage.alt1 a').eq(0);
    if (prevpage.length > 0) 
    window.location.href = (prevpage.attr('href'));
}

function rightArrowPressed() {
   var nextpage = $('.nextpage.alt1 a').eq(0);
    if(nextpage.length > 0)
    window.location.href = (nextpage.attr('href'));
    
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};

$(function(){
	$(".vs_sig").remove();
    $(".uk-cookie-popup").remove();
});
