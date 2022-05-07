import '../jbvalidator-main/src/jbvalidator'

export function goJbvalidator() {

    let validator = $('form.needs-validation').jbvalidator({
        errorMessage: true,
        successClass: true,
        language: '../jbvalidator-main/src/lang/en.json'
    });

    //new custom validate methode
    validator.validator.custom = function (el, event) {

        if ($(el).is('[name=password]') && $(el).val().length < 5) {
            return 'Your password is too weak.';
        }

        return '';
    }

    let validatorServerSide = $('form.validatorServerSide').jbvalidator({
        errorMessage: true,
        successClass: true,
    });

    //serverside
    $(document).on('submit', '.validatorServerSide', function () {

        $.ajax({
            method: "get",
            url: "test.json",
            data: $(this).serialize(),
            success: function (data) {
                if (data.status === 'error') {
                    validatorServerSide.errorTrigger($('[name=username]'), data.message);
                }
            }
        })

        return false;
    });
}