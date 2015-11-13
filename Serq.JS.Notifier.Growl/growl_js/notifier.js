(function ($) {

    var config = window.NotifierjsConfig = {
        defaultTimeOut: 3000,
        position: ["top", "right"],
        notificationStyles: {
            padding: "12px 18px",
            margin: "0 0 6px 0",
            backgroundColor: "#ccc",
            opacity: 0.8,
            color: "#000",
            font: "normal 13px 'Droid Sans', sans-serif",
            borderRadius: "3px",
            boxShadow: "#999 0 0 12px",
            width: "300px",
            "min-height": "60px"
        },
        notificationStylesHover: {
            opacity: 1,
            boxShadow: "#000 0 0 12px"
        },
        container: $("<div></div>").css("z-index", 30000)
    };

    $(document).ready(function () {
        config.container.css("position", "fixed");
        config.container.css("z-index", 30000);
        config.container.css(config.position[0], "12px");
        config.container.css(config.position[1], "12px");
        $("body").append(config.container);
    });

    function getNotificationElement() {
        return $("<div>").css(config.notificationStyles).hover(function () {
            $(this).css(config.notificationStylesHover);
        }, function () {
            $(this).css(config.notificationStyles);
        });
    }

    var Notifier = window.Notifier = {};
    // sending timeout as -1 will disable auto closing of the dialog
    Notifier.notify = function (message, title, iconUrl, timeOut, callBack) {
        var notificationElement = getNotificationElement();

        timeOut = timeOut || config.defaultTimeOut;

        if (iconUrl) {
            var iconElement = $("<img/>", {
                src: iconUrl,
                css: {
                    width: 36,
                    height: 36,
                    display: "block",
                    verticalAlign: "middle",
                    float: "left"
                }
            });
            notificationElement.append(iconElement);
        }

        var textElement = $("<div/>").css({
            display: 'block',
            verticalAlign: 'middle',
            padding: '0px 12px',
            "margin-left": "36px"
        });

        if (title) {
            var titleElement = $("<div/>");
            titleElement.append(document.createTextNode(title));
            titleElement.css("font-weight", "bold");
            textElement.append(titleElement);
        }

        if (message) {
            // TODO: maybe one of the divs are unnecessary, could be removed?
            var messageElement = $("<div/>");
            var elem = document.createElement("div");
            elem.innerHTML = message;
            messageElement.append(elem);
            textElement.append(messageElement);
        }
        // enabling auto-closing of the dialog
        if (timeOut != -1)
        {
            notificationElement.delay(timeOut).fadeOut(function () {
           
                    notificationElement.remove();
                    if (typeof (callBack) != "undefined")
                        callBack();
            
            });
        }
        // enabling close link 
        else
        {
            notificationElement.append('<div style="text-align:right"><a id="lnkNotifierCloser" href="#" style="text-decoration:underline">Kapat</a></div>');

            notificationElement.on("click", "#lnkNotifierCloser", function () {
                notificationElement.remove();
                if (typeof (callBack) != "undefined")
                    callBack();
            });
        }
       

        notificationElement.append(textElement);
        config.container.prepend(notificationElement);
    };

    Notifier.info = function (message, title, callBack) {
        Notifier.notify(message, title, "/growl_images/info.png", '', callBack);
    };
    Notifier.warning = function (message, title, callBack) {
        Notifier.notify(message, title, "/growl_images/warning.png", '', callBack);
       
    };
    Notifier.error = function (message, title, timeout,callBack) {
        Notifier.notify(message, title, "/growl_images/error.png", timeout, callBack);
    };
    Notifier.success = function (message, title, callBack) {
        Notifier.notify(message, title, "/growl_images/success.png", '', callBack);
    };

} (jQuery));