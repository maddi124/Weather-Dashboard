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
        forcast(list);
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
        // console.log(response);
            $(order).empty();
            
            order.append('<h2>'+ list + '(' + date + ')'+ imgicon +'</h2>');
            order.append ('<h4>Temp: '+ response.main.temp +'</h4>');
            order.append ('<h4> Wind: '+response.wind.speed+ '</h4>');
            order.append ('<h4> Humidity: '+ response.main.humidity+'</h4>');
            order.append ('<h4> UV: </h4>');
            var img=response.weather[0].main;

                if(img ==='Mist'){
            var imgicon= order.append('<img scr=http://openweathermap.org/img/wn/50d.png</img>');
            }
            else if (img ==='Rain'){

        }
            })
    };
    function forcast(list){
        var days='https://api.openweathermap.org/data/2.5/forecast?q='+ list +'&units=imperial&appid=4e460ef796224efaf5dab593e57a5787'; 
        //console.log(days);
        var cast=$('#weekendforcast');
        $.ajax({
            url:days,
            method:'GET',
        }).then(function(response){
            console.log(response);
            var results = response.list;
            console.log(results);
            $(cast).empty();
            for (var i=0;i<results.length;i+=8){
              // console.log(results.length);
               var set=$("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
               set.append('<h5>'+results[i].dt_txt.substr(0,10) +'</h5>');
                console.log(results.dt);
                set.append('<h5>Temp: '+ results[i].main.temp +'</h5>');
                set.append('<h5>Wind: '+ results[i].wind.speed+'</h5>');
                set.append('<h5> Humidity: '+ results[i].main.humidity+'</h5>');
                  $(cast).append(set);
        
            }
        })
    };
    
    

    weather();
    forcast();
});

// localStorage.clear();