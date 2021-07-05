(function (w, d) {

    var windowYScroller = function (to, from, pxpersec) {

        if (from !== undefined && typeof from === "number" && from > -1) { w.scrollTo(0, from); };

        var k = (pxpersec || 50) * (to > (from || 0) ? 1 : -1);

        var go = w.setInterval(function () {

            w.scrollBy(0, k);
            if ( 
                (to > ( from || 0 ) ? w.pageYOffset >= to : w.pageYOffset <= to) 
                || (w.pageYOffset + w.innerHeight + 25) >= d.body.clientHeight //quickfix
                || (w.pageYOffset -25) <= 0  ) { w.clearInterval(go); };
        
        }, 1);


    };

    (function () {
        //menu
        var menu = function () {


            d.querySelector(".h-menu").addEventListener("click", function (e) {
                e.preventDefault();
                var el = this.querySelector(".menu");
                var icon = this.querySelector("i");

                el.className = el.className.trim();

                if (el.className.indexOf("hidden") > -1) {
                    d.body.style.overflow = "hidden";
                    el.className = el.className.replace("hidden", "visible");
                    icon.className = icon.className.replace("bars", "times");

                    return this;
                };
                if (el.className.indexOf("visible") > -1) {
                    d.body.style.overflow = "";
                    el.className = el.className.replace("visible", "hidden");
                    icon.className = icon.className.replace("times", "bars");

                    return this;
                };



                return this;
                //return this;
            });

            d.querySelectorAll(".menu a").forEach(function (el, i) {

                el.addEventListener("click", function () {
                    w.setTimeout(function () {

                        windowYScroller(d.body.children[i+1].offsetTop,0,60);
                    }, 100);


                });
            });

            d.querySelectorAll(".h-button")[0].addEventListener("click",function() {
                windowYScroller(d.body.children[6].offsetTop);
                console.log("ran hire");
            });
            d.querySelectorAll(".h-button")[1].addEventListener("click",function() {
                windowYScroller(d.body.children[3].offsetTop);
                console.log("ran works");
            });

        };

        menu();

    })();
    (function () {
        // header go-down
        var down = function () {

            d.querySelector(".h-go-arrow").parentElement.addEventListener("click", function () {
                windowYScroller(window.innerHeight, 0);
            });
        };

        down();
    })();


    (function () { //gallery module start
        var slider = function (querystring) {



            var //variables Start 

                current = NaN, //nan
                slides = [],
                beforeclass = "before",
                activeclass = "active",
                afterclass = "after",
                len = function () {
                    return slides.length;
                },
                removeArgClassNames = function (arg) {


                    for (var i = 0, l = len(); i < l; i++) {
                        if (Array.isArray(arg) === true) {

                            for (var j = 0, k = arg.length; j < k; j++) {
                                slides[i].className = slides[i].className.replace(arg[j], "").replace(/\s\s+/g, " ").trim();


                            };
                        } else {
                            for (var j = 0, k = arguments.length; j < k; j++) {
                                slides[i].className = slides[i].className.replace(arguments[j], "").replace(/\s\s+/g, " ").trim();

                            };
                        };

                    };


                    return publ;
                },

                addArgSpacedClassNames = function (from, to, arg) {
                    var from = from || 0,
                        to = to || 0;


                    for (var i = from; i < to; i++) {
                        if (Array.isArray(arg) === true) {


                            for (var j = 0, k = arg.length; j < k; j++) {
                                if (slides[i].className.indexOf(arg[j]) < 0) {
                                    slides[i].className += " " + arg[j];

                                };
                            };
                        } else {



                            for (var j = 2, k = arguments.length; j < k; j++) {
                                if (slides[i].className.indexOf(arguments[j]) < 0) {
                                    slides[i].className += " " + arguments[j];

                                };
                            };
                        };
                    };

                    return publ;
                },

                setSlideClasses = function (elmsBeforeClass, elmMainClass, elmsAfterClass) {
                    if (typeof current === "number" && (!isNaN(current) || current < len())) { //NaN is number

                        addArgSpacedClassNames(current, current + 1, elmMainClass);
                        addArgSpacedClassNames(0, current, elmsBeforeClass);
                        addArgSpacedClassNames(current + 1, len(), elmsAfterClass);

                    };

                    return publ;
                },
                setCurrent = function (plusORminus) { //plusORminus is a string
                    if (plusORminus === "+" || plusORminus === "-" || !plusORminus) {

                        if (!!plusORminus && plusORminus.indexOf("+") > -1) {
                            current + 1 < len() ? current += 1 : current += 0;
                        };
                        if (!!plusORminus && plusORminus.indexOf("-") > -1) {
                            current > 0 ? current -= 1 : current -= 0;
                        };


                        removeArgClassNames(beforeclass, activeclass, afterclass);
                        setSlideClasses(beforeclass, activeclass, afterclass); //order is matter
                    };
                    return publ;
                }








            slides = d.querySelectorAll(querystring), // no panic, slides in its scope, not in global 

                current = isNaN(current) ? 0 : current

                ;

            setCurrent();



            var publ = {

                removeArgClassNames: removeArgClassNames,

                addArgSpacedClassNames: addArgSpacedClassNames,

                setSlideClasses: setSlideClasses,
                setCurrent: setCurrent,

            };

            return publ;
        };







        var gallery = slider(".sp-slide");//chaining(cascade) enabled

        d.querySelectorAll(".sp-leftctrl")[0].addEventListener("click", function () {
            gallery.setCurrent("-");
        });
        d.querySelectorAll(".sp-rightctrl")[0].addEventListener("click", function () {
            gallery.setCurrent("+");
        })
    })(); //gallery module end


    (function () {

        //f-block

        var matchdots = function (targetsclass, dotsclass) {
            var

                targets = d.querySelectorAll(targetsclass),
                dots = d.querySelectorAll(dotsclass),
                match = function () {

                    targets.forEach(function (e, i) {

                        e.addEventListener("mouseover", function () {

                            dots[i].className = "active";
                        });
                        e.addEventListener("mouseout", function () {

                            dots.forEach(function (e) {
                                e.className = "dot";
                            });
                        });

                    });
                }

                ;


            match();



        };



        matchdots(".f-block", ".dot");


    })();


    (function () {
        //footer
        d.querySelector(".footer-year").insertAdjacentHTML("afterbegin", (new Date).getFullYear());
    })();



})(window, document);
