window.addEventListener("load", ()=> {
    let long; 
    let lat; 
    const temperatureDescription = document.querySelector(".temperature-description"); 
    const temperatureDegree = document.querySelector(".temperature-degree"); 
    const locationTimezone = document.querySelector(".location-timezone"); 
    const temperatureSection = document.querySelector(".degree-section"); 
    const temperatureSpan = document.querySelector(".degree-section span"); 
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude; 
            lat = position.coords.latitude; 
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/04a85973169edddaa63c613fde799396/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json(); 
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently; 
                temperatureDegree.textContent = temperature; 
                temperatureDescription.textContent = summary; 
                locationTimezone.textContent = data.timezone;
                setIcons(icon, document.querySelector(".icon")); 
//Changing to Celsius
                let celsius = (temperature - 32) * (5/9); 
                temperatureSection.addEventListener("click", ()=> {
                    if(temperatureSpan.textContent === "F"){
                       temperatureSpan.textContent = "C";
                       temperatureDegree.textContent = Math.floor(celsius); 
                    }
                    else{
                       temperatureSpan.textContent = "F"; 
                       temperatureDegree.textContent = temperature; 
                    }
                });
            });
        }); 
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"}); 
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); 
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]); 
    }
}); 