$(()=>{
    $('li>button').click(function(){
        
        let currentP = $(this).parent().find('p')
        let currentI = $(this).children('i')

        $('p').not(currentP).slideUp()
        $('i').not(currentI).removeClass('arrow-animate')

        currentI.toggleClass('arrow-animate')
        currentP.slideToggle(280);
    })

})