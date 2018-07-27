// This file specifies any needed connections between the pib_mobile app and the website.

// Return to previous page upon receiving "goBack" message
 window.addEventListener('message', function(event) {

    // Normally we would check event.origin for security purposes.
    // However, this script cannot accomplish anything malicious.

    if (event.data == 'goBack') {
        window.history.back();
    }
});

$(document).ready(function(){
    fixCanvas();
})

// Waits till at least one canvas container is loaded onto the page.
// Note that we are only going to have one.
function fixCanvas() {
    if (document.getElementsByClassName('canvas-container').length == 0) {
       window.requestAnimationFrame(fixCanvas);
    } else {
        var noScroll = document.getElementsByClassName('canvas-container');
        for (var i = 0; i < noScroll.length; i++) {
            noScroll[i].addEventListener('touchmove', function(e) {
                e.preventDefault();
            }, false);
        }
    }
};