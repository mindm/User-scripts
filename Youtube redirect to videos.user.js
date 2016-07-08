// ==UserScript==
// @name         Youtube redirect to videos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.youtube.com/*
// @require      http://code.jquery.com/jquery-latest.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var pattern = /\/user\/(.*)$/;
    
    function redirect(jNode){
        (jNode.on('click', function(e){
            e.preventDefault();
            var linq1 = $(this).attr('href');
            var linq2 = linq1.replace(pattern, "/$1/videos");
            location.href = linq2;
        }));
    }
    
    redirect($('div.yt-lockup-channel div.yt-lockup-content h3 a'));
    
    waitForKeyElements ("div.yt-lockup-channel div.yt-lockup-content h3 a", redirect);
    
})();
