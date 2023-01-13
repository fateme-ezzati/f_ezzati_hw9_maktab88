$(() => {
    $("li").hover(function () {
        $(this).children('.sub-menu').fadeIn()
    }, function () {
        $(this).children('.sub-menu').fadeOut()

    });

})




