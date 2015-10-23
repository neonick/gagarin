// initialize Google map
function initialize() {
    var pos = new google.maps.LatLng(45.048311, 38.958070);
    var centr = new google.maps.LatLng(45.048311, 38.958070);

    var mapOptions = {
        center: centr,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        // disableDefaultUI: true,
        scrollwheel: false,
        styles: 
            // https://snazzymaps.com/
            [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        rotateControl: true
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    map.setTilt(45);

    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: '',
        animation: google.maps.Animation.DROP,
        icon: {
            url: 'i/pin.png',
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(48, 100)
        }
    });
}
google.maps.event.addDomListener(window, 'load', initialize);