angular.module('myApp.directives', [])
    .directive('mjpeg', function() {
        return {
            restrict: 'E',
            replace: true,
            template:'<span></span>',
            scope: {
                'url': '='
            },
            link: function (scope, element, attrs) {
                scope.$watch('url', function (newVal, oldVal) {
                    if (newVal) {
                        var iframe = document.createElement('iframe');
                        iframe.setAttribute('width', '100%');
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('scrolling', 'no');
                        element.replaceWith(iframe);

                        var iframeHtml = '<html><head><base target="_parent" /><style type="text/css">html, body { margin: 0; padding: 0; height: 100%; width: 100%; }</style><script> function resizeParent() { var ifs = window.top.document.getElementsByTagName("iframe"); for (var i = 0, len = ifs.length; i < len; i++) { var f = ifs[i]; var fDoc = f.contentDocument || f.contentWindow.document; if (fDoc === document) { f.height = 0; f.height = document.body.scrollHeight; } } }</script></head><body onresize="resizeParent()"><img src="' + newVal + '" style="width: 100%; height: auto" onload="resizeParent()" /></body></html>';

                        var doc = iframe.document;
                        if (iframe.contentDocument) { doc = iframe.contentDocument; }
                        else if (iframe.contentWindow) { doc = iframe.contentWindow.document; }

                        doc.open();
                        doc.writeln(iframeHtml);
                        doc.close();
                    } else {
                        element.html('<span></span>');
                    }
                }, true);
            }
        };
    })