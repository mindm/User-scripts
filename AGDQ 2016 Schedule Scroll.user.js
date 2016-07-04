// ==UserScript==
// @name         AGDQ 2016 Schedule Scroll
// @namespace    http://tampermonkey.net/
// @version      0.34
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

(function() {
    'use strict';

    var now = new Date();
    var scroll = 1;
    var activecolor = "#ccffe6";
    //var activecolor = "#f2ffcc";

    try {
    //Is scrolling enabled?
    if( GM_getValue("scroll", 1) == 1){
        scroll = 1;
    } else {
        scroll = 0;
    }} catch(err) {
        console.log("You might need to install Tampermonkey/Greasemonkey for this script to work correctly");
    }

    //DEBUG
    //console.log(now);
    //console.log(new Date($('td.start-time').eq(1).html()));

    //Iterate through tables datetimes to find out the current game
    // and grey out past games
    $('td.start-time').each(function(index){
        var tmp = new Date($(this).html());
        $(this).parent().css("background-color", "#e6e6e6");
        $(this).parent().next().css("background-color", "#e6e6e6");
        
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

    //Create a button where the user can disable scrolling
    function createInput(text){
        var $input = $('<tr><td></td><td><input onclick="toggleScroll()" id="scrollbutton" type="button" value="'+text+'" /></td><td></td></tr>');
        $input.appendTo($("#runTable"));
    }

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
        if (scroll == 1)
            $('html, body').animate({ scrollTop: $("#scroll_to").offset().top }, 1000);
    });

})();
