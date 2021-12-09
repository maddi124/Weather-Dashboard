// var APIkey ='4e460ef796224efaf5dab593e57a5787';
// var endpoint ='api.openweathermap.org';
$(document).ready(function(){

$('.btn').on('click',function(){
        console.log('this is search button');

    var text= $(this).siblings('.city-input').val();
        console.log(text);
    var card= $(this).parent().attr('id')
        console.log(card);
    localStorage.setItem('card',JSON.stringify(text));
    // This will clear the value in input 
     $(".city-input").val("");

    var list =JSON.parse(localStorage.getItem('card'));
        console.log(list);

    var searchDiv = $("<button class='historylist'>").text(list);
    var psearch= $('<div>');
    psearch.append(searchDiv)
    $('#history').prepend(psearch);        
});

//function weathersearch(){}


$('.delete').on('click',function(){
    console.log('this is the clear button');
    localStorage.removeItem(list);
});

//weathersearch();

});

// localStorage.clear();