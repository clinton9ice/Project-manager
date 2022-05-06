$(document).ready(() => {
  $(function () {
    // MENU
    $(".navbar a").on("click", function () {
      if (window.innerWidth < 900) {
        $("#toggle-menu").slideUp(500);
        $("#navToggler").removeClass("active");
      }
      // Remove the dropdown menu
      $("#admin-menu").removeClass("show");
    });

    $("#navToggler").on("click", function () {
      $(this).toggleClass("active");
      $("#toggle-menu").slideToggle(500);
    });

    // SMOOTHSCROLL NAVBAR
    $(function () {
      $(".navbar .default, .hero-text a").on("click", function (event) {
        var $anchor = $(this);
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: $($anchor.attr("href")).offset().top - 90,
            },
            500
          );
        event.preventDefault();
      });
    });
  });
});
