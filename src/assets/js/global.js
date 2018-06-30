var showError, showSuccess, validateEmail, validateForm, getDateFormat;
(function() {
    validateEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validateForm = function(event, formId) {
      var inputs = $("#" + formId + " .require-field");
      var invalid = false;
      $.each(inputs, function(idx, input){
        if (!$(input).val() || $(input).val().trim() == "" || ($(input).attr('type') == 'email' && !window.validateEmail($(input).val().trim()))) {
          $(input).parents('.form-group').addClass('has-error');
          invalid = true;
          $(input).bind('keyup', function(event){
            $(event.target).parents('.form-group').removeClass('has-error');
          }).bind('change', function(event){
            $(event.target).parents('.form-group').removeClass('has-error');
          });
        }
      });

      return invalid;
    },
    showError = function(message) {
      if (!message) {
        message = 'An error has occurred. Please try again!';
      }
      $.notify({
        title: "<b>Error</b>",
        message: message
      },{
        type: 'danger',
        allow_dismiss: true
      });
    },
    showSuccess = function(message) {
      $.notify({
        title: "<b>SUCCESS</b>",
        message: message
      },{
        type: 'success',
        allow_dismiss: true
      });
    },
    getDateFormat = function(strDate) {
      if (!strDate)
        return '';
      var d = new Date(strDate),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      var yearLength = year.length;
      if (yearLength < 4) {
        for (var i = 0; i < (4-yearLength); i++) {
          year = '0' + year;
        }
      }

      return [year, month, day].join('-');
    }

})();
