$(document).ready(function () {
    let element = $('div')
    let text = element.text()

    element.click(function () {
        element.text(text + element.text())
    })

})