const vsUri = "wss://echo-ws-service.herokuapp.com";

const btnMessage = document.querySelector(".btn_message");
const conteinerMessage = document.querySelector(".conteiner_message");

const wedSocet = new WebSocket(vsUri); 
    
function writeToScreenServer(message) {
    let writeServer = document.createElement("div");
    writeServer.style.width = "fit-content";
    writeServer.style.border = "2px solid lightsalmon";
    writeServer.style.borderRadius = "10px";
    writeServer.style.padding = "10px";
    writeServer.style.margin = "5px";
    writeServer.innerHTML = message;
    conteinerMessage.appendChild(writeServer);
}

function writeToScreenClient(input) {
    let writeClient = document.createElement("div");
    writeClient.style.width = "fit-content";
    writeClient.style.border = "2px solid lightsalmon";
    writeClient.style.borderRadius = "10px";
    writeClient.style.padding = "10px";
    writeClient.style.margin = "5px";
    writeClient.innerHTML = input;
    conteinerMessage.appendChild(writeClient);
}

btnMessage.addEventListener('click', () => {
    let input = document.querySelector(".input_message").value;

    if (!input) {
        return;
    } else {
        wedSocet.onmessage = function(evt) {
            writeToScreenServer(evt.data);
        }
    };

    wedSocet.onerror = function(evt) {
        writeToScreenServer('<p style="color: red;">ERROR:</p>'+evt.data);
    }

    writeToScreenClient(input);
    wedSocet.send(input);
});

const btnLocation = document.querySelector(".btn_Location");

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let messageLocation = `<div>Широта: ${latitude}, Долгота: ${longitude}<br>
    <a href = "https://www.openstreetmap.org/#map=3/${latitude}/${longitude}">
    Ваше положение на карте</a></div>`;
    writeToScreenServer(messageLocation);
}

const error = () => {
    let messageLocation = `<div>Невозможно получить ваше местоположение!</div>`;
    writeToScreenServer(messageLocation);
};

btnLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        let messageLocation = `<div>Ваш браузер не поддерживает геолокацию!</div>`;
        writeToScreenServer(messageLocation);
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})
