// 1. BASE DE DATOS DE PARTIDOS (Agrega o quita partidos aquí)
// Formato de fecha: "YYYY-MM-DDTHH:MM:SS-05:00" (El -05:00 es clave para la zona horaria de Colombia)
const partidos = [
    { rival: "Tcheco", liga: "VNL", fecha: "2026-03-14T18:00:00-05:00" },
    { rival: "CT", liga: "UVA", fecha: "2026-03-14T19:00:00-05:00" },

];

// 2. FUNCIÓN PARA DIBUJAR LA TABLA
function renderTable() {
    const tbody = document.getElementById('matches-body');
    if (!tbody) return;
    tbody.innerHTML = ''; // Limpiar la tabla

    partidos.forEach((partido, index) => {
        const matchDate = new Date(partido.fecha);

        // Formatear Fecha (Día/Mes/Año)
        const dateStr = matchDate.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Formatear Horas usando las zonas horarias oficiales
        const timeCol = matchDate.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: true });
        const timeEst = matchDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: true });

        // Crear la fila
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${partido.rival}</strong></td>
            <td>${partido.liga}</td>
            <td>${dateStr}</td>
            <td>${timeCol}</td>
            <td>${timeEst}</td>
            <td class="countdown-cell" id="countdown-${index}">Calculando...</td>
        `;
        tbody.appendChild(tr);
    });
}

// 3. FUNCIÓN PARA ACTUALIZAR TODOS LOS CRONÓMETROS
function updateCountdowns() {
    const now = new Date();

    partidos.forEach((partido, index) => {
        const matchDate = new Date(partido.fecha);
        const difference = matchDate - now;
        const cell = document.getElementById(`countdown-${index}`);

        if (difference <= 0) {
            if (cell) {
                cell.innerHTML = "Finalizado / En juego";
                cell.style.color = "#888"; // Poner gris si ya pasó
            }
        } else {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (cell) {
                cell.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    });

    // 4. ACTUALIZAR EL CRONÓMETRO PRINCIPAL (El de arriba de la página)
    if (partidos.length > 0) {
        const firstMatchDate = new Date(partidos[0].fecha);
        const diffMain = firstMatchDate - now;
        const mainTimer = document.getElementById("timer");

        if (mainTimer) {
            if (diffMain <= 0) {
                mainTimer.innerHTML = "¡EL PARTIDO HA COMENZADO!";
            } else {
                const d = Math.floor(diffMain / (1000 * 60 * 60 * 24));
                const h = Math.floor((diffMain % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((diffMain % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((diffMain % (1000 * 60)) / 1000);
                mainTimer.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
            }
        }

        // Actualizar datos de texto en el Hero (Opcional pero recomendado para que todo sea automático)
        const heroCol = document.getElementById("hora-col");
        const heroEst = document.getElementById("hora-est");
        const heroRival = document.querySelector(".team.rival");
        const heroLiga = document.querySelector(".league");

        if(heroCol && heroEst && heroRival && heroLiga) {
            heroCol.innerText = firstMatchDate.toLocaleTimeString('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: true });
            heroEst.innerText = firstMatchDate.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: true }) + " (EST/EDT)";
            heroRival.innerText = partidos[0].rival;
            heroLiga.innerText = partidos[0].liga;
        }
    }
}

// Arrancar las funciones al cargar la página
renderTable();
setInterval(updateCountdowns, 1000);
updateCountdowns();