const btn=document.querySelector(".btn")
const countrySearch=document.querySelector(".country-search")

var data='';
var forecast=[];
btn.addEventListener('click',function(){getWeather(countrySearch.value)})


async function getWeather(country){
   const loading=document.querySelector(".loading")
   try{
      loading.classList.remove('d-none')

      var weather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=89dfb3c546c84f2282f160947241107&q=${country}&days=7`)

      data=await weather.json()
      
      forecast=data.forecast.forecastday;
   
   displaydata()
   loading.classList.add('d-none')
   }
 catch(error){
   alert("حدث خطأ أثناء جلب البيانات. يرجى المحاولة مرة أخرى.")
   loading.classList.add("d-none")
 }
}


function displaydata(){
   var die=``;
   var cartona=`<h1>${data.location.name}</h1>`;

   for(var i=0;i<forecast.length ;i++){
      var date = new Date(forecast[i].date);
      var dateString = date.toDateString();
      var iconUrl = `https:${forecast[i].day.condition.icon}`;
      die+= `<div class="col-md-4 border-1 rounded-3 ">
                <div class="weather bg-white text-center ">
                   <p class="bg-info fs-4 d-flex justify-content-around">${dateString}</p>
                   <h1>${cartona}</h1>
                   <img src="${iconUrl}" class="w-25" alt="Weather icon">
                   <p class=""><span class="fs-4">${forecast[i].day.condition.text}</span></p>
                   <h2>${forecast[i].day.maxtemp_c}°C</h2>
                   <h2 class="p-2">${forecast[i].day.mintemp_c}°C</h2>
                </div>
             </div>`;
   }
   document.querySelector(".row").innerHTML= die;
}

function getUserLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition, showError);
   } else {
       alert("الموقع الجغرافي غير مدعوم في هذا المتصفح.");
   }
}

async function showPosition(position) {
   var lat = position.coords.latitude;
   var lon = position.coords.longitude;

   // جلب الطقس بناءً على الإحداثيات
   getWeather(`${lat},${lon}`);
}

function showError(error) {
   switch (error.code) {
       case error.PERMISSION_DENIED:
           alert("تم رفض طلب الحصول على الموقع الجغرافي.");
           break;
       case error.POSITION_UNAVAILABLE:
           alert("معلومات الموقع غير متوفرة.");
           break;
       case error.TIMEOUT:
           alert("انتهت مهلة الطلب للحصول على الموقع الجغرافي.");
           break;
       case error.UNKNOWN_ERROR:
           alert("حدث خطأ غير معروف.");
           break;
   }
}

// استدعاء دالة getUserLocation عند تحميل الصفحة لتحديد الموقع تلقائيًا
window.onload = getUserLocation;
