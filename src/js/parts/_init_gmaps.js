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
        scrollwheel: false,
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