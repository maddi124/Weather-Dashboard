var historylist=document.querySelector('#history');
var divEl = document.createElement("div");
// var APIkey ='4e460ef796224efaf5dab593e57a5787';
// var endpoint ='api.openweathermap.org';
$(document).ready(function(){

$('.btn').on('click',function(){
    console.log('this is search button');
    // var cityinput =$('#city-input').val();
    //     console.log (cityinput);

    var text= $(this).siblings('.city-input').val();
        console.log(text);
    var card= $(this).parent().attr('id')
        console.log(card);
    localStorage.setItem('card',JSON.stringify(text));
    // weather(cityinput);

    var list =JSON.parse(localStorage.getItem('card'));
        console.log(list);

    // var searchDiv = $("<button class='list-group-item m-2 col-12'>").text(list);
    // var psearch= $('<div>');
    // psearch.append(searchDiv)
    // $('#history').prepend(psearch);        
});

//function weathersearch(){}

function deletelist(){
$('.delete').on('click',function(){
    console.log('this is the clear button');
});
}
//weathersearch();
});


// localStorage.clear();