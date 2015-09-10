smart.package(function(){
    smart.extend({
        include: function(path, func){
            _createScript(path, func);
        },
    });

    function _createScript(file, func){
        var wrap = document.getElementsByTagName('body')[0], script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', file);

        wrap.appendChild(script);

        script.onload = function(){
            func();
        };

    }
});