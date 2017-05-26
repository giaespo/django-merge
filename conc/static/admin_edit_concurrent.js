var django_merge = (function () {

    var oldData = {};
    var newData = {};
    var remoteData = {};
    var url = "";
    var json_remote_old;
    var save_clicked = false;

    var settings = {
      "polling": true,
      "polling_timer": 5000,
      "auto_merge": true,
    };

    var _save_actual_element = function(){
        django.jQuery(':input').each(function(){
           elem = django.jQuery(this);
           if (elem.is(":visible") && elem.attr("id")){
               oldData[elem.attr("id")] = elem.val();
           }
      });
    };

    var _event_handler = function(){
        django.jQuery(document).on('click', '.accept', function(event) {
            event.preventDefault();
            elem = django.jQuery(this);
            console.log("valore", django.jQuery("#" + elem.attr("referid")).val());
            console.log(django.jQuery("#" + elem.attr("referid")));
            console.log(remoteData[elem.attr("referid")]);
            django.jQuery("#" + elem.attr("referid")).val(remoteData[elem.attr("referid")]);
        });

        django.jQuery(document).on('click', '.revert', function(event) {
            event.preventDefault();
            elem = django.jQuery(this);
            django.jQuery("#" + elem.attr("referid")).val(oldData[elem.attr("referid")]);
        });

        django.jQuery('input[name="_save"]').click(function(e){
            e.preventDefault();
            _get_modified_value(_success_save);
        })
    };

    var _construct_remote_data = function(data){
      var _html= django.jQuery(data);

      _html.find(':input').each(function(){
           elem = django.jQuery(this);
           if (elem.attr("id")){
               remoteData[elem.attr("id")] = elem.val();
           }
      });
      console.log(remoteData);
      Object.keys(remoteData).forEach(function(currKey) {
          if(currKey in oldData && remoteData[currKey] != oldData[currKey]){
              if (remoteData[currKey] != django.jQuery("#" + currKey).val()){
                  django.jQuery("#" + currKey).parent().css("background-color","#ff4d4d");
                  django.jQuery("#" + currKey).parent().find(".remote").remove();
                  django.jQuery("#" + currKey).parent().append('<div class="remote"> remote value: <div class="newvalue">' + remoteData[currKey] + '</div><a referid="' + currKey + '" class="accept" href="#">accept</a><a referid="' + currKey + '" class="revert" href="#">revert</a></div>');
              }
          }
       });

    }

    var _success_polling = function(data){
       _construct_remote_data(data);
    }

    var _success_save = function(data){
       _construct_remote_data(data);
       if (!save_clicked){
           console.log("dentro non clicked",save_clicked,json_remote_old,remoteData);
           save_clicked = true;
           json_remote_old = JSON.stringify(remoteData);
           if (json_remote_old === JSON.stringify(oldData)){
               console.log("dentro non clicked",save_clicked,json_remote_old);
               django.jQuery('form').submit();
           }
       }
       else{
           if(json_remote_old === JSON.stringify(remoteData)){
               console.log("dentro clicked uguali",save_clicked,json_remote_old);
               django.jQuery('form').submit();
           }else{
               console.log("dentro clicked diversi",save_clicked,json_remote_old);
               json_remote_old = JSON.stringify(remoteData);
           }
       }
    }


    var _get_modified_value = function (succ_func){
    var success_callback = succ_func || _success_polling;
    django.jQuery.ajax({
        url:url,
        type:'get',
        dataType:'html',
        success: success_callback,
    });
    if (settings.polling){
        setTimeout(_get_modified_value,settings.polling_timer);
    }
}

    var start = function (params) {
      django.jQuery.extend( settings, params || {} );
      url = window.location.pathname;
      _event_handler();
      _save_actual_element();
      if (settings.polling){
          _get_modified_value();
      }
    };

    return {
      start: start,
    };

})();



django.jQuery( document ).ready(function() {
    django_merge.start({"polling": false});
});
