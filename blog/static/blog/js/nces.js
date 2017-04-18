$(function(){
    // Chosenify every multiple select DOM elements with class 'chosen'
    $('select.chosen').chosen({
        search_contains : true,
        placeholder_text_multiple : "Select universities"
    });
});

