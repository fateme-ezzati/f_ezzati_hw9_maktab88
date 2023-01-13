$(document).ready(function () {
    let element = $('div')
    element.hover(function () {
        $(this).css('background-color', 'blue')
    }, function () {
        $(this).css('background-color', 'red')
    })

})