$("input").keyup(function() {
    if($(this).val().length >= 1) {
        var input_flds = $(this).closest('form').find(':input');
        input_flds.eq(input_flds.index(this) + 1).focus();
    }
});