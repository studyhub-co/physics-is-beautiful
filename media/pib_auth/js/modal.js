window.onload = function() {
    $(".auth-modal-swap").click(function() {
        $("#login-modal").modal('toggle');
        $("#signup-modal").modal('toggle');
    });
    $("#logout-action").click(function() {
        $("#logout-form").submit();
    });
}
