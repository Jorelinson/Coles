// Configura aquí la fecha del próximo partido (Formato: Año-Mes-DíaTHora:Minutos:Segundos-05:00 para Colombia)
// Ejemplo: 25 de Marzo de 2026 a las 8:00 PM hora local
const matchDate = new Date("2026-03-25T20:00:00-05:00");

function updateCountdown() {
    const now = new Date();
    const difference = matchDate - now;

    const timerElement = document.getElementById("timer");

    if (difference <= 0) {
        timerElement.innerHTML = "¡EL PARTIDO HA COMENZADO!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Configurar horas en la pantalla inicial según la fecha del partido
function setDisplayTimes() {
    // Hora de Colombia (UTC-5)
    const optionsCol = { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById("hora-col").innerText = matchDate.toLocaleTimeString('es-CO', optionsCol);

    // Hora EST (UTC-5 / EDT UTC-4)
    const optionsEst = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById("hora-est").innerText = matchDate.toLocaleTimeString('en-US', optionsEst) + " (EST/EDT)";
}

// Iniciar scripts
setDisplayTimes();
setInterval(updateCountdown, 1000);
updateCountdown();