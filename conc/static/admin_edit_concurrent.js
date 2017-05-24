var oldData = {};
var newData = {};
var remoteData = {};
var url = "";
django.jQuery( document ).ready(function() {
    url = window.location.pathname;
    django.jQuery(':input').each(function(){
         elem = django.jQuery(this);
         if (elem.is(":visible") && elem.attr("id")){
             oldData[elem.attr("id")] = elem.val();
         }
       });
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

});


function get_modified_value(){
django.jQuery.ajax({
    url:url,
    type:'get',
    dataType:'html',
    success:function(data)
   {
       console.log(oldData);
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
                   django.jQuery("#" + currKey).parent().find(".remote").remove();
                   django.jQuery("#" + currKey).parent().append('<div class="remote"> remote value: <div class="newvalue">' + remoteData[currKey] + '</div><a referid="' + currKey + '" class="accept" href="#">accept</a><a referid="' + currKey + '" class="revert" href="#">revert</a></div>');
               }
           }
        });
   }
});
setTimeout(get_modified_value,10000);
}
get_modified_value();
