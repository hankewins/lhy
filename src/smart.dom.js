// import smart.core.js
// smart.dom.js
smart.package(function(smart){
    var doc = document;
    var div = doc.createElement('div');
    // IE 10.0+ Firefox 3.6+ Chrome 8.0+ Safari 5.1+ Opera 11.5+ Android 3.0
    // http://caniuse.com/classlist
    var supportNavtiveClassList = 'classList' in document.documentElement;

    var dom = {
        one: function(selector, context){
            if (!selector){
                return;
            }
            var ctx = context || doc;
            return ctx.querySelector(selector);         
        },
        all: function(selector, context){
            if (!selector){
                return;
            }
            var ctx = context || doc;
            return ctx.querySelectorAll(selector);
        },
        // querySelector slower than getElementById
        // querySelectorAll slower than getElementsByTagName
        // http://www.w3cfuns.com/article-5593688-1-1.html 
        id: function(id){
            return doc.getElementById(id);
        },

        tagName: function(tagName, context){
            var ctx = context || doc;
            return ctx.getElementByTagName(tagName);
        },
        matchesSelector: function(elem, selector){
            if (!elem || !selector) return;
            var matches = elem.matchesSelector || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.oMatchesSelector || elem.msMatchesSelector;
            if(matches) return matches.call(elem, selector);

        },
        addClass: function(elem, className){
            if (supportNavtiveClassList){
                if(!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.classList.add(className);
            } else {
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.className += " " + className;
            }
        },
        hasClass: function(elem, className){
            if (supportNavtiveClassList){
                if (!elem || !className){
                    return false;
                }
                elem.classList.contains(className);                
            } else {
                if (!elem || !className){
                    return false;
                }
                return -1 < ' ' + elem.className + ' '.indexOf(' ' + className + ' ');
            }
        },
        removeClass: function(elem, className){
            if (supportNavtiveClassList){
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.classList.remove(className);
            } else {
                if (!elem || !className || !dom.hasClass(elem, className)){
                    return;
                }
                elem.className = elem.className.replace(new RegExp('(?:^|\\s+)' + className + '(?:$|\\s+)'), ' ');
            }
        },
        toggleClass: function(elem, className){
            if (dom.hasClass(elem, className)){
                dom.removeClass(elem, className);
            } else {
                dom.addClass(elem, className);
            }
        },
        replaceClass: function(elem, old, newstr){
            if (dom.hasClass(elem, old)){
                elem.className = elem.className.replace(new RegExp('(?:^|\\s+)' + old + '(?:$|\\s+)'), ' ' + newstr + ' ');
            }
        },
        children: function(elem){
            if (elem.childElementCount){
                return [].slice.call(el.children);
            }

            var ret = [];
            for (var node = elem.firstChild; node; node = node.nextSlibling){
                (node.nodeType === 1) && ret.push(node);
            }

            return ret;
        },
        next: function(elem){
            if ("nextElementSibling" in elem){
                return elem.nextElementSibling;
            }

            while(elem = elem.nextSlibling){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        prev: function(elem){
            if("previousElementSibling" in elem){
                return elem.previousElementSibling;
            }

            while(elem = elem.previousSibling){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        first: function(elem){
            if("firstElementChild" in elem){
                return elem.firstElementChild;
            }

            while(elem = elem.firstChild){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        last: function(elem){
            if("lastElementChild" in elem){
                return elem.firstElementChild;
            }

            while(elem = elem.lastChild){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        parent: function(elem){
            if("parentElement" in elem){
                return elem.parentElement;
            }

            while(elem = elem.parentNode){
                if(elem.nodeType === 1){
                    return elem;
                }
            }
        },
        /**
         * 选择器过滤
         * @param  {Array}   elems     元素集合
         * @param  {Object}  selector  选择器过滤项
         * @return {Boolean}           是否过滤成功
         */
        filter: function (elems, selector){
            return smart.filter(elems, function(elem){
                return dom.matchesSelector(elems, selector);
            });
        },
        /**
         * 向后插入元素
         * @param  {Object}  parentElement     父类元素
         * @param  {Object}  newElement        插入的元素
         * @param  {Object}  refernceElement   参考元素
         * @return {Object}                    被插入的元素
         */
        insertAfter: function(parentElement, newElement, refernceElement){
            var next = refernceElement.nextSibling;
            if(next){
                parentElement.insertBefore(newElement, next);
            }
            else{
                parentElement.appendChild(newElement);
            }
            return newElement;
        }
    };

    smart.dom = dom;
});