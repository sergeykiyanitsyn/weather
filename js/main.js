
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

findCity.addEventListener("submit", checkCity); // Отправка  формы

//let allCity = [];

function checkCity() {
    const cityName = textCity.value;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            writeCity.textContent = data.name;
            degree.textContent = Math.round(data.main.temp - 273) + "°";

            cityDetail.textContent = "Город: " + data.name;
            temp.textContent = "Температура: " + degree.textContent;
            feels.textContent = "Ощущается как: " + Math.round(data.main.feels_like - 273) + "°";
            statusWheather.textContent = "Статус погоды: " + data.weather[0].description;

            let getSun = new Date(data.sys.sunrise * 1000);
            sunrise.textContent = "Восход: " + getSun.getDate() + "."+ getSun.getMonth() + "." + getSun.getFullYear()+ " " + getSun.getHours() + ":" + getSun.getMinutes() + " (МСК)";
             let getSet=  new Date(data.sys.sunset * 1000);
             sunset.textContent = "Закат: " + getSet.getDate() + "."+ getSet.getMonth() + "." + getSet.getFullYear()+ " " + getSet.getHours() + ":" + getSet.getMinutes() + " (МСК)";
        })
        .catch(error => console.error(error));
}

let del = document.getElementsByClassName(".delCity");
for (i = 0; i < del.length; i++){
    del[i].addEventListener("click", listItemHandler); // Отправка 1-й формы
}


like.addEventListener("click", addCity)

function addCity () {
    const message = writeCity.textContent ;
    let clon = newDiv.cloneNode(true);
    clon.querySelector('.nameCity').textContent = message;
    likeCity.appendChild(clon);        // Добавить div в конец 

}

let addedCity = document.querySelector('#addedCity');
  
    addedCity.addEventListener('click', function(event) {
        if (event.target.classList.contains('delCity')) {
            event.target.parentElement.remove();
        }
    });


    addedCity.addEventListener('click', function(event) {
        if (event.target.classList.contains('nameCity')) {
            console.log (event.target)
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