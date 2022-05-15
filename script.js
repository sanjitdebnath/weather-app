const wrapper = document.querySelector(".wrapper"),
upper_sec = document.querySelector(".upper_sec"),
input_info = document.querySelector(".input_info"),
lower_sec = document.querySelector(".lower_sec"),
back_icon = document.querySelector(".header i"),
input_field = document.querySelector(".input_field input");
let my_location = document.querySelector(".input_section button");
let Wicon = document.querySelector(".lower_sec img");

let api_key = "e0c03c96645febaf242c4a6c899a316a";
let api;

input_field.addEventListener("keyup",(e)=>
{
    if(e.key == "Enter" && input_field.velue != "")
    {
        request_api(input_field.value);
    }
});


my_location.addEventListener("click",()=>
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("your browser does'nt support geolocation");
    }
});

function onSuccess(position)
{
    const {latitude,longitude} = position.coords;
    // console.log(latitute);
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&units=metric&lon=${longitude}&appid=${api_key}`;
    fetchapi();
}
function onError(error)
{
    input_info.innerHTML = error.message;
    input_info.classList.add("error");
    input_info.style.display = "flex";
}




function request_api(city)
{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    fetchapi();
}

function fetchapi()
{
    input_info.innerHTML = "Getting weather detail...";
    input_info.classList.remove("error");
    input_info.classList.add("pending");
    input_info.style.display = "flex";
    fetch(api).then(Response => Response.json().then(result => weather_detail(result)));
}


function weather_detail(info)
{
    if(info.cod == "404")
    {
        input_info.innerHTML = `${input_field.value} isn't a valid city name`;
        input_info.classList.replace("pending","error");
        input_info.style.display = "flex";
    }
    else{

        let city = info.name;
        let country = info.sys.country;
        let {temp,feels_like,humidity} = info.main;
        let {description,id} = info.weather[0];


        if(id==800)
        {
            Wicon.src = "icons/clear.svg";
        }
        else if(id >=200 && id<=232)
        {
            Wicon.src = "icons/strom.svg";
        }
        else if(id >=600 && id<=622)
        {
            Wicon.src = "icons/snow.svg";
        }
        else if(id >=701 && id<=781)
        {
            Wicon.src = "icons/haze.svg";
        }
        else if(id >=801 && id<=804)
        {
            Wicon.src = "icons/cloud.svg";
        }
        else if((id >=300 && id<=321) || (id >=500 && id<=531))
        {
            Wicon.src = "icons/rain.svg";
        }
        wrapper.querySelector(".temp .num").innerText= Math.floor(temp);
        document.querySelector(".weather").innerHTML=description;
        document.querySelector(".detail .bt_temp .numb").innerHTML=Math.floor(feels_like);
        document.querySelector(".humadity .detail .numb").innerHTML=`${humidity}%`;
        document.querySelector(".location span").innerHTML=`${city},${country}`;
        



        input_info.classList.replace("error","pending");
        // input_info.classList.add("pending");
        upper_sec.classList.add("active");
        lower_sec.classList.add("active");
        lower_sec.classList.add("active");
        back_icon.classList.add("active");

        console.log(info);
    }
    // input_info.classList.replace("error","pending");

}

back_icon.addEventListener("click", ()=>{
        input_info.classList.remove("pending");
    upper_sec.classList.remove("active");
        lower_sec.classList.remove("active");
        lower_sec.classList.remove("active");
        back_icon.classList.remove("active");
        input_info.style.display = "none";
        input_field.value = "";

});