
function weathersearch(){

$('.btn').on('click',function(){
    console.log('this was click');
    var text= $(this).siblings('.city-input').val();
    var card= $(this).parent().attr('id')

    localStorage.setItem(text,card)

});

}
weathersearch();