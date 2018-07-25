// This file specifies any needed connections between the pib_mobile app and the website.

// Return to previous page upon receiving "goBack" message
 window.addEventListener('message', function(event) {

    // Normally we would check event.origin for security purposes.
    // However, this script cannot accomplish anything malicious.

    if (event.data == 'goBack') {
        window.history.back();
    }
});
