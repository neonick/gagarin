/*
    Custom scripts
 */
//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../node_modules/nprogress/nprogress.js
//= ../../bower_components/magnific-popup/dist/jquery.magnific-popup.min.js
//= ../../bower_components/Swiper/dist/js/swiper.jquery.min.js
//= ../../bower_components/jquery.scrollTo/jquery.scrollTo.min.js
//= ../../bower_components/Tabslet/jquery.tabslet.min.js
//= ../../bower_components/jquery.maskedinput/dist/jquery.maskedinput.min.js
//= ../../bower_components/ion.rangeslider/js/ion.rangeSlider.min.js
//= ../../bower_components/fotorama/fotorama.js

$(document).ready(function () {

    // do something
    
    // masked input
    $("#phone").mask("(999) 999-99-99");

    //= parts/_init_gmaps.js

    //= parts/_init_swiper.js

});


$(document).ready(function () {
	// start NProgress
	NProgress.start();
});

$(window).load(function() {

	// stop NProgress
	NProgress.done();

})
