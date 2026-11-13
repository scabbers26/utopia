<script>  $(document).ready(function() {
    var $logoContainer = $('.logo-container');
    var initialLogoSize = 1.5; // Initial size (scale)
    var finalLogoSize = 0.3; // Final size (scale)
    var finalLogoTop = 10; // Final top position (in percentage of viewport height)
    var productsOffset = $('.container').offset().top; // Offset of the products container
    var windowHeight = $(window).height();

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var scaleValue = initialLogoSize - (scrollTop / windowHeight) * (initialLogoSize - finalLogoSize);
        var topValue = 50 - (scrollTop / windowHeight) * (50 - finalLogoTop);

        // Ensure the scale value is within the range of initialLogoSize to finalLogoSize
        scaleValue = Math.max(finalLogoSize, Math.min(initialLogoSize, scaleValue));
        // Ensure the top value is within the range of 50% to finalLogoTop%
        topValue = Math.max(finalLogoTop, Math.min(50, topValue));

        $logoContainer.css({
            'transform': 'translate(-50%, -50%) scale(' + scaleValue + ')',
            'top': topValue + '%'
        });
    });

    $(window).trigger('scroll'); // Ensure the initial state is correct
});
</script>