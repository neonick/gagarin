/*
    Custom scripts
 */
//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/Swiper/dist/js/swiper.jquery.min.js
//= ../../bower_components/jquery.maskedinput/dist/jquery.maskedinput.min.js

//|=== unkomment to use ===| //= ../../node_modules/nprogress/nprogress.js
//|=== unkomment to use ===| //= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.min.js
//|=== unkomment to use ===| //= ../../bower_components/jquery.scrollTo/jquery.scrollTo.min.js
//|=== unkomment to use ===| //= ../../bower_components/Tabslet/jquery.tabslet.min.js
//|=== unkomment to use ===| //= ../../bower_components/ion.rangeslider/js/ion.rangeSlider.min.js
//|=== unkomment to use ===| //= ../../bower_components/fotorama/fotorama.js

$(document).ready(function () {

    // do something

    // init masked input
    $("#phone").mask("(999) 999-99-99");

    // init Swiper
    var swiper = new Swiper('.swiper-container', {
       pagination: '.swiper-pagination',
       paginationClickable: true,
       nextButton: '.swiper-button-next',
       prevButton: '.swiper-button-prev',
       spaceBetween: 30
    });


    // initialize map
    function initialize() {
        var mapLat = $("#map").data('lat'),
            mapLng = $("#map").data('lng'),
            mapIcon = $("#map").data('mapicon');

        var pos = new google.maps.LatLng(mapLat, mapLng),
            centr = new google.maps.LatLng(mapLat, mapLng),
            zoomNum;

        $(window).width()>768 ? zoomNum = 12 : zoomNum = 14;

        var mapOptions = {
            center: centr,
            zoom: zoomNum,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            // disableDefaultUI: true,
            scrollwheel: false,
            rotateControl: true,
            styles: // https://snazzymaps.com/
                    [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.setTilt(45);

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: '',
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'i/' + mapIcon,
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(48, 100)
            }
        });

    }
    google.maps.event.addDomListener(window, 'load', initialize);


});
