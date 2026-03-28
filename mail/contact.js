$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "https://formspree.io/f/xreoevyz",
                type: "POST",
                data: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                }),
                contentType: "application/json",
                dataType: "json",
                success: function () {
                    // إنشاء رسالة النجاح بتنسيق Bootstrap محسّن
                    var alertHtml = '<div class="alert alert-success alert-dismissible fade show" role="alert" id="alertBox">' +
                        '<strong>Success!</strong> Your message has been sent successfully.' +
                        '<button type="button" class="btn-close" aria-label="Close"></button>' +
                        '</div>';
                    
                    $('#success').html(alertHtml);
                    
                    // إضافة وظيفة الإغلاق اليدوية
                    $('#alertBox .btn-close').on('click', function() {
                        $('#alertBox').fadeOut('slow', function() {
                            $(this).remove();
                        });
                    });
                    
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // إنشاء رسالة الخطأ بتنسيق Bootstrap محسّن
                    var alertHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert" id="alertBox">' +
                        '<strong>Error!</strong> Sorry ' + name + ', it seems that our mail server is not responding. Please try again later!' +
                        '<button type="button" class="btn-close" aria-label="Close"></button>' +
                        '</div>';
                    
                    $('#success').html(alertHtml);
                    
                    // إضافة وظيفة الإغلاق اليدوية
                    $('#alertBox .btn-close').on('click', function() {
                        $('#alertBox').fadeOut('slow', function() {
                            $(this).remove();
                        });
                    });
                    
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});