const request=require('request')


const forcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=351ecad37baaf5d88259d0769cc56cbe&query='+latitude+','+longitude+'&units=m'
 
    request({url:url,json:true},(error,response)=>{
       if(error){
          callback('Unable to connect to weather service',undefined)
       }
       else if(response.body.error){
          callback('Unable to find location.Try another sarch',undefined)
       }
       else{
          callback(undefined,response.body.current.weather_descriptions[0]+' : It is currently '+response.body.current.temperature+' degrees out.It feels like ' + response.body.current.feelslike+' degrees out')
            //  Latitude:response.body.results[4].lat,
            //  Longitude:response.body.results[4].lon,
             //Location:response.body.results[4].city
   // return response.body.current.weather_descriptions[0]
         // console.log(response.body.current.weather_descriptions[0])
       //console.log('Latitude of Los Angeles is: '+response.body.results[4].lat)
       // console.log('Longitude of Los Angeles is: '+response.body.results[4].lon)
       }
    })
 }

 module.exports=forcast
 