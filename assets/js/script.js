var APIkey ='4e460ef796224efaf5dab593e57a5787';
var date = moment().format('L'); 
$(document).ready(function(){
//Search button 
    $('.btn').on('click',function(){
        var text= $(this).siblings('.city-input').val();
        var card= $(this).parent().attr('id')
           
        localStorage.setItem('card',JSON.stringify(text));
        // This will clear the value in input 
        $(".city-input").val("");
    
        
        // History List
        var list =JSON.parse(localStorage.getItem('card'));
           
        weather(list);
        forcast(list);

        var searchDiv = $("<button class='historylist'>").text(list);
        var psearch= $('<div class = "cardlist">');
        psearch.append(searchDiv)
        $('#history').prepend(psearch);  

    $('.historylist').on('click',function(){
          console.log("i was clicked");
          
            weather(list);
            $(order).empty();
            forcast(list);  
            $(cast).empty();

        });
    });
       
// Clear button 
    $('.delete').on('click',function(){
        console.log('this is the clear button');
        $('.cardlists').remove();
        $('.historylist').remove();

        localStorage.removeItem('card');
    });

// This will display the current weather in the selected city
    function weather(list){
        var endpoint ='https://api.openweathermap.org/data/2.5/weather?q='+ list +'&units=imperial&appid=4e460ef796224efaf5dab593e57a5787';
        var order=$('#box');
      
        $.ajax({
            url:endpoint,
            method:'GET',
        
        }).then(function(response){
            console.log(response);
            $(order).empty();

            var img= response.weather[0].icon;
               
         var lon=response.coord.lon;
            console.log(lon);
        var lat=response.coord.lat;
            console.log(lat);
            order.append('<h2> '+ list.toUpperCase() + ' (' + date + ')<img src="http://openweathermap.org/img/wn/'+img+'.png" style="height=40px; width=40px"></h2>');
            order.append ('<h4>Temp: '+ response.main.temp +' °F</h4>');
            order.append ('<h4>Wind: '+response.wind.speed+ ' MPH</h4>');
            order.append ('<h4>Humidity: '+ response.main.humidity+' %</h4>');

                uvi(lon,lat)
        })
    };
    function uvi(lon, lat){
         var uvindex='https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&exclude=current&appid=4e460ef796224efaf5dab593e57a5787';
         var order=$('#box');
         $.ajax({
            url:uvindex,
            method:'GET',

        }).then(function(response){
            console.log(response);
            var current=response.daily;
            console.log(current);
            
            for (var i=0;i<current.length;i+=8){
                var onecall=current[i].uvi;
                console.log(onecall);

                if(onecall <=2){
                    order.append('<h4>UV Index: <span style="color:white;background-color:green;border-radius:5px;font-weight:bold">'+onecall+'</span></h4>');
                }
                if(onecall>=5){
                    order.append('<h4>UV Index: <span style="color:white;background-color:yellow;border-radius:5px;font-weight:bold">'+onecall+'</span></h4>');
                }
                if(onecall===7){
                    order.append('<h4>UV Index: <span style="color:white;background-color:red;border-radius:5px;font-weight:bold">'+onecall+'</span></h4>');
                }
            
            }
        })
    
    }
    //This will display the 5 days forcast for the selected city
    function forcast(list){
        var days='https://api.openweathermap.org/data/2.5/forecast?q='+ list +'&units=imperial&appid=4e460ef796224efaf5dab593e57a5787'; 
        var cast=$('#weekendforcast');

         $.ajax({
                url:days,
                method:'GET',
                }).then(function(response){

                var results = response.list;
                $(cast).empty();

                for (var i=0;i<results.length;i+=8){
                
                var img= results[i].weather[0].icon;
                var set=$("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 9rem; height: 12rem;'>");
                set.append('<h5>'+results[i].dt_txt.substr(0,10) +'<img src="http://openweathermap.org/img/wn/'+img+'.png" style="height=40px; width=40px"></h5>');
                    set.append('<h6>Temp: '+ results[i].main.temp +' °F</h6>');
                    set.append('<h6>Wind: '+ results[i].wind.speed+' MPH</h6>');
                    set.append('<h6> Humidity: '+ results[i].main.humidity+' %</h6>');

                    $(cast).append(set);
                }
            })
    };
    weather();
    forcast();

});

// localStorage.clear();