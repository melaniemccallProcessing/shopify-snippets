{%if section.settings.enable_popup == true and template.name == 'index' %}
<script>
    function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }   
    var expDays = {{section.settings.expDays}};
    var delay = {{section.settings.delay}};
    setTimeout(function(){
        if($(window).width() > 700) {
            var newsCookie = getCookie("newsletter-expire");
            if(newsCookie) {
                console.log("yes cookie!" + newsCookie)
            } else {
                setCookie("newsletter-expire", expDays, expDays);
                console.log("no cookie!" + newsCookie)
                openModal();
            }
        }
    }, delay * 1000);
    function openModal(){
        $('.modal-background').fadeToggle();
        $('.close-button').click(function(){
            $('.modal-background').fadeToggle();
        })
        
        $('.mcForm').ajaxChimp({
            url:
            'https://old-mill.us12.list-manage.com/subscribe/post?u=1836a7338ca29d234656cfdd5&amp;id=ebdb916eca',
            callback: callbackFunction
            });
        }
    
    function callbackFunction(resp) {
        console.log(resp)
         if (resp.result === 'success') {
            $('#mce-popup-error-response').hide();
            $('#mce-popup-success-response')
                .html("Awesome, you're now signed up!")
                .show();
        } else {
            $('#mce-popup-success-response').hide();
            $('#mce-popup-error-response')
                .html(resp.msg)
                .show();
            }
    }
    
</script> 
