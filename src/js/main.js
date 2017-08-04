////
//Application Module
////////////////////

var app = (function () {
    "use strict";
    //-----------------------------------------------------------------
    // Page Initalization handler : exposed to app.init();
    //-----------------------------------------------------------------
    var init = function () {
        
            _toggleClassHandler();
            _svgHandler();
            _navHandler();
            _swipeHandler();
            //_videoModalHandler();
            //_socialSidebarHandler();
            //_inputPlaceHolderHandler();
            //$('select').selectric();
            _scrollToTopHandler();
        },
        //-----------------------------------------------------------------
        // Collapse Navigation Content for mobile
        //-----------------------------------------------------------------
        _inputPlaceHolderHandler = function () {
            $(".component-form input, .component-form textarea").each(function (i, e) {
                //console.log($(e).attr('placeholder'));
                $(e).parents('.form-group').attr('data-placeholder', $(e).attr('placeholder'));
                $(e).on('focus', function () {

                    $(e).parents('.form-group').addClass('active');

                });
                $(e).on('blur', function () {
                    if ($(e).val().length <= 0) {
                        $(e).parents('.form-group').removeClass('active');
                    }
                });
            });

        },
        //-----------------------------------------------------------------
        // Collapse Navigation Content for mobile
        //-----------------------------------------------------------------
        _navHandler = function () {
            $(".pg-sidebar .sidebar-bd dl").each(function (i, e) {

                var dt = $(e).find('dt');
                var dd = $(e).find('dd');

                if (dd.length > 0) {
                    $(dd).collapse({
                        toggle: false
                    });
                    $(dt).on('click', function (a) {
                        a.preventDefault();
                        $(dd).collapse('toggle');
                    });

                }
            });

            // add overlay to the page 
            var $overlay = $('<div class="nav-overlay"></div>');
            $overlay.on('click', function (e) {
                e.preventDefault();
                $('#pg-canvas').removeClass('nav-on');
            });
            $('#pg-canvas').append($overlay);
            
        },
        //-----------------------------------------------------------------
        // Helper Function: Add CSS Class to page-hd element on scroll
        //-----------------------------------------------------------------
        _toggleClassHandler = function () {
            console.log('tog');
            $("a[data-toggle-class]").on('click', function (e) {
                e.preventDefault();
                $($(this).attr('href')).toggleClass($(this).data('toggle-class'));
            });
        },
        //-----------------------------------------------------------------
        // swiper mapping functions
        //-----------------------------------------------------------------
        _swipeHandler = function (c) {

            $('.swiper-container').each(function (i, e) {

                var spv = $(e).data('size'); // slides per view


                var conf = {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    nextButton: $(e).parent().find('.swiper-button-next'),
                    prevButton: $(e).parent().find('.swiper-button-prev'),
                    slidesPerView: spv,
                    speed: 1000

                };

                // Responsive Settings
                if ($(e).data('responsive')) {
                    var sm, md, lg;
                    sm = md = lg = spv;
                    if (e.hasAttribute('data-size-s')) {
                        sm = md = lg = $(e).data('sizeS');
                    }
                    if (e.hasAttribute('data-size-m')) {
                        md = lg = $(e).data('sizeM');
                    }
                    if (e.hasAttribute('data-size-l')) {

                        lg = $(e).data('sizeL');
                    }

                    conf.breakpoints = {
                        1140: {
                            slidesPerView: lg

                        },
                        960: {
                            slidesPerView: md

                        },
                        720: {
                            slidesPerView: sm
                        }
                    }
                }

                // freeMode Settings
                if ($(e).data('freemode')) {
                    conf.freeMode = true;
                }

                // effect Settings
                if ($(e).data('effect')) {
                    conf.effect = $(e).data('effect');
                }
                // speed Settings
                if ($(e).data('speed')) {
                    conf.speed = $(e).data('speed');
                }
                if ($(e).data('direction')) {
                    conf.direction = $(e).data('direction');
                }

                var swiper = new Swiper($(e), conf);
                $(e).data('swiper', swiper);

            });

        },
        //-----------------------------------------------------------------
        // Helper Function: Init the social sharing link on sidebar
        //-----------------------------------------------------------------
        _socialSidebarHandler = function () {

            $("[data-social]").each(function (i, e) {
                console.log(e);


                var shareList = [];
                var opt = {
                    facebook: true,
                    twitter: true,
                    linkedin: true,
                    google: true,
                    email: true
                };
                if ($(e).data('social')) {
                    opt = {
                        facebook: $.inArray('facebook', $(e).data('social').split(',')) > -1,
                        twitter: $.inArray('twitter', $(e).data('social').split(',')) > -1,
                        linkedin: $.inArray('linkedin', $(e).data('social').split(',')) > -1,
                        google: $.inArray('google', $(e).data('social').split(',')) > -1,
                        email: $.inArray('email', $(e).data('social').split(',')) > -1
                    };
                }
                if (opt.facebook) {
                    shareList.push({
                        share: "facebook",
                        label: "",
                        logo: "icon-facebook",
                    });
                }
                if (opt.twitter) {
                    shareList.push({
                        share: "twitter",
                        label: "",
                        logo: "icon-twitter",
                    });
                }
                if (opt.linkedin) {
                    shareList.push({
                        share: "linkedin",
                        label: "",
                        logo: "icon-linkedin",
                    });
                }
                if (opt.google) {
                    shareList.push({
                        share: "googleplus",
                        label: "",
                        logo: "icon-google-plus",
                    });
                }
                if (opt.email) {
                    shareList.push({
                        share: "email",
                        label: "",
                        logo: "icon-email",
                    });
                }
                $(e).jsSocials({
                    showCount: false,
                    showLabel: true,
                    shares: shareList
                });

            });

        },
        //-----------------------------------------------------------------
        // Toggle Modal for video player
        //-----------------------------------------------------------------
        _videoModalHandler = function (c) {
            $("a[data-video-id]").on('click', function (e) {
                e.preventDefault();
            });
            $("a[data-video-id]").modalVideo();

        },
        //-----------------------------------------------------------------
        // Helper Function: Replaces SVG files to embed
        //-----------------------------------------------------------------
        _svgHandler = function () {

            jQuery('img.svg').each(function () {
                var $img = jQuery(this);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgURL = $img.attr('src');

                jQuery.get(imgURL, function (data) {
                    // Get the SVG tag, ignore the rest
                    var $svg = jQuery(data).find('svg');

                    // Add replaced image's ID to the new SVG
                    if (typeof imgID !== 'undefined') {
                        $svg = $svg.attr('id', imgID);
                    }
                    // Add replaced image's classes to the new SVG
                    if (typeof imgClass !== 'undefined') {
                        $svg = $svg.attr('class', imgClass + ' replaced-svg');
                    }

                    // Remove any invalid XML tags as per http://validator.w3.org
                    $svg = $svg.removeAttr('xmlns:a');

                    // Check if the viewport is set, else we gonna set it if we can.
                    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
                    }

                    // Replace image with new SVG
                    $img.replaceWith($svg);

                }, 'xml');

            });

        },
        //-----------------------------------------------------------------
        // Helper Function: Create a scroll to top 
        //-----------------------------------------------------------------
        _scrollToTopHandler = function () {
            var scrollBtn = $('<a href="#" class="scroll-top"><i class="icon-upload"></i></a>');
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    scrollBtn.addClass('scroll-on');
                } else {
                    scrollBtn.removeClass('scroll-on');
                }
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 20 && !scrollBtn.hasClass('scroll-bottom')) {
                    scrollBtn.addClass('scroll-bottom')
                } else if ($(window).scrollTop() < $(document).height() - $(window).height() - 20 && scrollBtn.hasClass('scroll-bottom')) {
                    scrollBtn.removeClass('scroll-bottom');
                }
            });
            scrollBtn.click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, 400);
                return false;
            });
            $('body').append(scrollBtn);
        },
        _stickyNavHandler = function (c) {
             $(window).scroll(function () {
                 if ($(window).scrollTop() <= 20) {
                     $('#page-hd').removeClass(c);
                 } else {
                     $('#page-hd').addClass(c);
                 }
             }); 
         };
         // Expose Global Functions
     return {
         init: init
     };
 })();
 $().ready(function () {
     app.init();
     
 });