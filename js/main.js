
const findCity = document.querySelector("#findCity");
const textCity = document.querySelector("#textCity");

const writeCity = document.querySelector(".cityText");

const degree = document.querySelector(".degree");

const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';

const like = document.querySelector(".like");

const newDiv = document.querySelector(".blockCity")
const likeCity = document.querySelector(".likeCity")

const cityDetail = document.querySelector(".cityDetail");
const temp = document.querySelector(".temp");
const feels = document.querySelector(".feels");
const statusWheather = document.querySelector(".statusWheather");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

textCity.focus()
findCity.addEventListener("submit", checkCity); // Отправка  формы

//let allCity = [];

async function checkCity() {
     
    try {
        const cityName = textCity.value;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
        const responce = await fetch(url);
        const data = await responce.json();
        const getSun = new Date(data.sys.sunrise * 1000);
        const getSet =  new Date(data.sys.sunset * 1000);
        
        writeCity.textContent = data.name;
        degree.textContent = Math.round(data.main.temp - 273) + "°";

        cityDetail.textContent = "Город: " + data.name;
        temp.textContent = "Температура: " + degree.textContent;
        feels.textContent = "Ощущается как: " + Math.round(data.main.feels_like - 273) + "°";
        statusWheather.textContent = "Статус погоды: " + data.weather[0].description;

        sunrise.textContent = "Восход: " + getSun.getDate() + "."+ getSun.getMonth() + "." + getSun.getFullYear()+ " " + getSun.getHours() + ":" + getSun.getMinutes() + " (МСК)";
        sunset.textContent = "Закат: " + getSet.getDate() + "."+ getSet.getMonth() + "." + getSet.getFullYear()+ " " + getSet.getHours() + ":" + getSet.getMinutes() + " (МСК)";
    } catch(e) {
        console.error(e)
    }
    
}



let del = document.getElementsByClassName(".delCity");
for (i = 0; i < del.length; i++){
    del[i].addEventListener("click", listItemHandler); // Отправка 1-й формы
}


like.addEventListener("click", addCity)

//Надо переделать сохранение городов через Set
const favoriteCities = new Set();

function addCity () {
    
    const message = writeCity.textContent ;

    // document.cookie = "name = " + message + ";" + "max-age = 1200; path = /"; // Проверка куки
    let clon = newDiv.cloneNode(true);
    clon.querySelector('.nameCity').textContent = message;
    likeCity.appendChild(clon);        // Добавить div в конец 

    favoriteCities.add(writeCity.textContent);
    for (let key of favoriteCities){
    console.log(key);
    }
// //Изучение spread 
//     const allCities = [...favoriteCities];
//     console.log(allCities);
}




let addedCity = document.querySelector('#addedCity');
  
    addedCity.addEventListener('click', function(event) {
        if (event.target.classList.contains('delCity')) {
            event.target.parentElement.remove();
        }
    });


    addedCity.addEventListener('click', function(event) {
        if (event.target.classList.contains('nameCity')) {
            textCity.value = event.target.textContent.trim(); // trim удаляет пробел в самом начале
            checkCity();
        }
    });



//Функция слушатель
function listItemHandler(event) {
    //alert('Вы выбрали элемент: ' + event.target.innerText);
    delite (event.target)
  }

  //Функция удаления результатов
  function delite (element) {
    element.parentNode.remove();
  }