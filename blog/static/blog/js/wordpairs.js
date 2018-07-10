$(document).ready(function(){
    $(document).keypress(function(e) {
        if(e.which==13){
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
                alert("something went wrong");
            }
        });
    });
});