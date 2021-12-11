var APIkey ='4e460ef796224efaf5dab593e57a5787';
var date = moment().format('L'); 
$(document).ready(function(){
//Search button 
$('.btn').on('click',function(){
        console.log('this is search button');
    var text= $(this).siblings('.city-input').val();
        console.log(text);
    var card= $(this).parent().attr('id')
        console.log(card);
    localStorage.setItem('card',JSON.stringify(text));
    // This will clear the value in input 
     $(".city-input").val("");
   
       
    // History List
    var list =JSON.parse(localStorage.getItem('card'));
        console.log(list);
    weather(list);
    var searchDiv = $("<button class='historylist'>").text(list);
    var psearch= $('<div class = "cardlist">');
    psearch.append(searchDiv)
    $('#history').prepend(psearch);        
    });
    // Clear button 
    $('.delete').on('click',function(){
    console.log('this is the clear button');
    $('.cardlists').remove();
    $('.historylist').remove();

    localStorage.removeItem('card');
    });
    function weather(list){
    var endpoint ='https://api.openweathermap.org/data/2.5/weather?q='+ list +'&units=imperial&appid=4e460ef796224efaf5dab593e57a5787';
    var order=$('#box');
    $.ajax({
        url:endpoint,
        method:'GET',
       
    }).then(function(response){
        console.log(response);
        $(order).empty();
        
        order.append('<h2>'+ list + '(' + date + ')'+'</h2>');
        order.append ('<h4>Temp:'+ response.main.temp +'</h4>');
        order.append ('<h4> Wind:'+response.wind.speed+ '</h4>');
        order.append ('<h4> Humidity:'+ response.main.humidity+'</h4>');
        order.append ('<h4> UV: </h4>');

        })
    };
    

    weather();
});

// localStorage.clear();