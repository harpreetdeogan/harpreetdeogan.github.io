/*--nav bar function---*/
(function($) {
    $(function() {
        $('nav ul li a:not(:only-child)').on('click', function(e) {
            $(this).siblings('.nav-dropdown').toggle();
            $('.dropdown').not($(this).siblings()).hide();
            e.stopPropagation();
        });
        $('html').on('click', function() {
            $('.nav-dropdown').hide();
        });
        $('#nav-toggle').click(function() {
            $('nav ul').slideToggle();
        });
        $('#nav-toggle').on('click', function() {
            this.classList.toggle('active');
        });
    });
})(jQuery);


/*function for menu bar*/

(function($) {

    $.fn.menumaker = function(options) {

        var cssmenu = $(this),
            settings = $.extend({
                title: "Menu",
                format: "dropdown",
                sticky: false
            }, options);

        return this.each(function() {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function() {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                } else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function() {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function() {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    } else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function() {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
                    $('.top-nav').removeClass('hid');
                }

                if ($(window).width() <= 768) {
                    $('.top-nav ').addClass('hid');
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function($) {
    $(document).ready(function() {

        $("#cssmenu").menumaker({
            title: '<a href="#"><img src="asset/images/logo/logo-only-black.png" width="20"  /></a>',
            format: "multitoggle"
        });

    });
})(jQuery);



/*-------------bigslider starts here------------------*/
$(function() {

    var liCount = $('.slider li').length;
    var ulWidth = (liCount * 100);
    var liWidth = (100 / liCount);
    var leftIncrement = (ulWidth / liCount);


    $('.slider').height($('.slider li img').height());


    $('.slider img').on('load', function() {
        $('.loader').fadeOut();
        $('.slider').height($(this).height());
    })

    $(window).resize(function() {
        $('.slider').css('height', $('.slider li img').height());
    });

    $('.slider ul').css('width', ulWidth + '%');
    $('.slider li').css('width', liWidth + '%');

    $('.slider').append(function() {
        $(this).append('<div class="navigator"></div>');
        $(this).prepend('<span class="prev">❮</span><span class="next">❯</span>');

        $(this).find('li').each(function() {
            $('.navigator').append('<span></span>');
        });
    });

    $('.slider').css('height', $('.slider li img').height());

    $('.navigator span:first-child').addClass('active');


    if (liCount > 2) {
        $('.slider ul').css('margin-left', -leftIncrement + '%');
        $('.slider ul li:last-child').prependTo('.slider ul');
    } else if (liCount == 1) {
        $('.slider span').css('display', 'none');
        $('.autoPlay').css('display', 'none');
    } else if (liCount == 2) {
        $('.slider .prev').css('display', 'none');
    }

    function moveLeft() {
        $('.slider ul').animate({
            left: -leftIncrement + '%'
        }, 500, function() {
            $('.slider ul li:first-child').appendTo('.slider ul');
            $('.slider ul').css('left', '');

            if ($('.navigator span').hasClass('active')) {

                if ($('.navigator span.active').is(':last-child')) {
                    $('span.active').removeClass('active');
                    $('.navigator span:first-child').addClass('active');
                } else {
                    $('span.active').next().addClass('active');
                    $('span.active').prev().removeClass('active');
                }
            }
        });
    }


    function moveRight() {
        $('.slider ul').animate({
            left: leftIncrement + '%'
        }, 500, function() {
            $('.slider ul li:last-child').prependTo('.slider ul');
            $('.slider ul').css('left', '');

            if ($('.navigator span').hasClass('active')) {

                if ($('.navigator span.active').is(':first-child')) {
                    $('span.active').removeClass('active');
                    $('.navigator span:last-child').addClass('active');
                } else {
                    $('span.active').prev().addClass('active');
                    $('span.active').next().removeClass('active');
                }
            }
        });
    }




    if (liCount > 1) {
        invertalValue = setInterval(function() {
            moveLeft();
        }, 5000);
    }

    $('.prev').click(function() {
        moveRight();
    });

    $('.next').click(function() {
        moveLeft();
    });

});

/*---------------------------big parallex ------------------*/


$('.img-parallax').each(function() {
    var img = $(this);
    var imgParent = $(this).parent();

    function parallaxImg() {
        var speed = img.data('speed');
        var imgY = imgParent.offset().top;
        var winY = $(this).scrollTop();
        var winH = $(this).height();
        var parentH = imgParent.innerHeight();


        // The next pixel to show on screen      
        var winBottom = winY + winH;

        // If block is shown on screen
        if (winBottom > imgY && winY < imgY + parentH) {
            // Number of pixels shown after block appear
            var imgBottom = ((winBottom - imgY) * speed);
            // Max number of pixels until block disappear
            var imgTop = winH + parentH;
            // Porcentage between start showing until disappearing
            var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
        }
        img.css({
            top: imgPercent + '%',
            transform: 'translate(-50%, -' + imgPercent + '%)'
        });
    }
    $(document).on({
        scroll: function() {
            parallaxImg();
        },
        ready: function() {
            parallaxImg();
        }
    });
});
/*-small slider-*/

jQuery(document).ready(function($) {

    $('#checkbox').change(function() {
        setInterval(function() {
            moveRight();
        }, 3000);
    });

    var slideCount = $('#news-slider ul li').length;
    var slideWidth = $('#news-slider ul li').width();
    var slideHeight = $('#news-slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;

    $('#news-slider').css({
        width: slideWidth,
        height: slideHeight
    });

    $('#news-slider ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });

    $('#news-slider ul li:last-child').prependTo('#news-slider ul');

    function moveLeft() {
        $('#news-slider ul').animate({
            left: +slideWidth
        }, 200, function() {
            $('#news-slider ul li:last-child').prependTo('#news-slider ul');
            $('#news-slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#news-slider ul').animate({
            left: -slideWidth
        }, 200, function() {
            $('#news-slider ul li:first-child').appendTo('#news-slider ul');
            $('#news-slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function() {
        moveLeft();
    });

    $('a.control_next').click(function() {
        moveRight();
    });

});

/*--testimonial sec--*/

var slide_index3 = 1;
displaySlides3(slide_index3);

function nextSlide3(n3) {
    displaySlides3(slide_index3 += n3);
}

function currentSlide3(n3) {
    displaySlides3(slide_index3 = n3);
}

function displaySlides3(n3) {
    var i3;
    var slides3 = document.getElementsByClassName("showSlide3");
    if (n3 > slides3.length) {
        slide_index3 = 1
    }
    if (n3 < 1) {
        slide_index3 = slides3.length
    }
    for (i3 = 0; i3 < slides3.length; i3++) {
        slides3[i3].style.display = "none";
    }
    slides3[slide_index3 - 1].style.display = "block";
}
/*--back-top-button--*/

var btn = $('#back-to-top-button');

$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});


/*--*/


$(document).ready(function() {
    //the trigger on hover when cursor directed to this class
    $(".core-menu li").hover(
        function() {
            //i used the parent ul to show submenu
            $(this).children('ul').slideDown('fast');
        },
        //when the cursor away 
        function() {
            $('ul', this).slideUp('fast');
        });
    //this feature only show on 600px device width
    $(".hamburger-menu").click(function() {
        $(".burger-1, .burger-2, .burger-3").toggleClass("open");
        $(".core-menu").slideToggle("fast");
    });




});



$(window).scroll(function() {


    if ($(window).scrollTop() > 63) {

        $('.navbar-wrapper').addClass('navbar-fixed');

        $('.navbar-second-logo').removeClass('hid');
        $('.top-nav ').addClass('hid');
    }
    if ($(window).scrollTop() < 64) {

        $('.navbar-wrapper').removeClass('navbar-fixed');
        $('.navbar-second-logo').addClass('hid');
        $('.top-nav ').removeClass('hid');
    }
});

// $('#carouselBigBanner').carousel({
//     interval: 2000
// });