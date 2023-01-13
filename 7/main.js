function progress(){
    
    let progressPercent = $('#progressBar').css('width').replace("px",''); 
    progressPercent = Number(progressPercent) * 0.1
    
    let yellowBar =  Number($('#yellowBar').css('width').replace("px",'')) + progressPercent

    $('#yellowBar').css('width',`${yellowBar}px`)
}