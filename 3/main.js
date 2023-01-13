function parentCopy() {
    let childText = $('#childBox>p').text()
    let targetText = $('#targetBox>p').text()
    let parentText = $('#parentBox>p').text()

    $('#targetBox>p').text(parentText + " " + childText + " " + targetText)
}

function childCopy() {
    let childText = $('#childBox>p').text()
    let targetText = $('#targetBox>p').text()

    $('#targetBox>p').text(childText + " " + targetText)
}