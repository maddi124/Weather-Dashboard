var APIkey ='4e460ef796224efaf5dab593e57a5787';
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
var endpoint ='https://api.openweathermap.org/data/2.5/weather?q='+ list +'&appid=4e460ef796224efaf5dab593e57a5787';
    
    $.ajax({
        url:endpoint,
        //method:'GET',
        success: function(data){
            console.log('success', data);
            
        }
    });
};

weather();
});

// localStorage.clear();