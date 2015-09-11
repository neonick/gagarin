/*
    Custom
 */

$(document).ready(function () {


    // initialize Google map
    function initialize() {
        var pos = new google.maps.LatLng(45.049200, 38.956139);
        var centr = new google.maps.LatLng(45.049434, 38.956139);


        var mapOptions = {
            center: centr,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            scrollwheel: false,
            rotateControl: true
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.setTilt(45);

        var marker = new google.maps.Marker({
            position: pos,
            map: map,
            title: '',
            icon: 'img/map_icon.png'
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
})
