// ==UserScript==
// @name         AGDQ 2016 Schedule Scroll
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Scrolls to currently played game and greys out passed games.
// @author       MindM
// @match        https://gamesdonequick.com/schedule*
// @grant        GM_getValue
// @grant        GM_setValue
// @require      http://code.jquery.com/jquery-latest.js
// @run-at       document-body
// @downloadURL  https://github.com/mindm/User-scripts/raw/master/AGDQ%202016%20Schedule%20Scroll.user.js
// @updateURL    https://github.com/mindm/User-scripts/raw/master/AGDQ%202016%20Schedule%20Scroll.user.js
// ==/UserScript==


function scrollToCurrent(scroll_){
    if (scroll_ == 1)
        $('html, body').animate({ scrollTop: $("#scroll_to").offset().top }, 1000);
}

function colors(){
    //Iterate through tables datetimes to find out the current game
    // and grey out past games
    var now = new Date();
    $('td.start-time').each(function(index){
        var tmp = new Date($(this).html());
        $(this).parent().css("background-color", passedcolor);
        $(this).parent().next().css("background-color", passedcolor);
        
        if (now.getTime() < tmp.getTime()){
            $(this).parent().prev().css("background-color", activecolor);
            $(this).parent().prev().prev().css("background-color", activecolor);
            $(this).parent().css("background-color", "");
            $(this).parent().next().css("background-color", "");
            $(this).parent().prev().prev().attr("id", "scroll_to");

            //Return terminates the iteration function
            return false;
        }

    });
}

function colors2(){
    var now = new Date();
    console.log("Last refresh at " + now.getHours() +
               ":" + now.getMinutes());
    for(i = 0; i < g_times.length; i++){
        //console.log(i);
        if(now.getTime() > g_times[i].getTime()) {
            $('td.start-time').eq(i).parent().css("background-color", passedcolor);
            $('td.start-time').eq(i).parent().next().css("background-color", passedcolor);
            
            
        } else {
            $('td.start-time').eq(i).parent().prev().css("background-color", activecolor);
            $('td.start-time').eq(i).parent().prev().prev().css("background-color", activecolor);
            $('td.start-time').eq(i).parent().css("background-color", "");
            $('td.start-time').eq(i).parent().next().css("background-color", "");
            $('td.start-time').eq(i).parent().prev().prev().attr("id", "scroll_to");
            g_curr = i;
            break;
        }
    }
}

function updateCurrent(){
    var now = new Date();
    //console.log(now.getTime());
    //console.log(g_times[g_curr].getTime());
    //console.log("---------");
    if (now.getTime() > g_times[g_curr].getTime()){
        //g_curr++;
        //alert("Change");
        location.reload();
    }
}

function createInput(text){
    var $input = $('<tr><td></td><td><input onclick="toggleScroll()" id="scrollbutton" type="button" value="'+text+'" /></td><td></td></tr>');
    $input.appendTo($("#runTable"));
}

(function() {
    'use strict';

    var scroll = 1;
    window.passedcolor = "#e6e6e6";
    window.activecolor = "#ccffe6";
    window.g_times = [];
    window.g_curr = undefined;
    
    try {
    //Is scrolling enabled?
    if( GM_getValue("scroll", 1) == 1){
        scroll = 1;
    } else {
        scroll = 0;
    }} catch(err) {
        console.log("You might need to install Tampermonkey/Greasemonkey for this script to work correctly");
    }
    
    //Create times array values
    $('td.start-time').each(function(index){
        g_times[index] = new Date($(this).html());
    });

    //DEBUG
    //console.log(now);
    //console.log(new Date($('td.start-time').eq(1).html()));

    //colors();
    colors2();

    //Create a button where the user can disable scrolling
    if (scroll){
        createInput("Disable scrolling");
    } else {
        createInput("Enable scrolling");
    }

    //Toggle button name and store value
    unsafeWindow.toggleScroll = function(){
        if (scroll == 1){
            scroll = 0;
            GM_setValue ('scroll', 0);
            $('#scrollbutton').attr('value', 'Enable scrolling');
        } else {
            scroll = 1;
            GM_setValue ('scroll', 1);
            $('#scrollbutton').attr('value', 'Disable scrolling');
        }
    };

    //Scroll to current table row
    $(document).ready(function(){
        scrollToCurrent(scroll);
    });
    
    setInterval(function(){ 
        updateCurrent();   
    }, 60000);

})();
