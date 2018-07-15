$(document).ready(function(){
    $(document).on('keyup', function (e) {
        if (e.keyCode == 13) {
            $('#submitButton').click();
        }
    });
    $('#submitButton').click(function () {
        // $('#complaints').hide();
        // $('#alert').empty();
        // $('.table-responsive').empty();
        // $('#loader').toggle("slow", function () {});
        var complaintText = $('#myInput').val();
        $.ajax({
            url:"getWordPairs",
            type:"POST",
            data:{searchWord:complaintText},
            success: function (data) {
                $('#results').empty();
                $('#results').append(data.wordpairs);
                $('#results').show("slow", function () {});
            },
            error: function (data) {
                alert("There was a problem with displaying the results.");
            }
        });
    });
});