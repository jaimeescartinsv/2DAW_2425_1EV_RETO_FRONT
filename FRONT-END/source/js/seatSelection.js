export function initSeatSelection(showtimeId) {
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = ''; // Limpia el mapa anterior

    // Lógica para generar el mapa de asientos
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 10; j++) {
            const seat = document.createElement('button');
            seat.classList.add('seat');
            seat.textContent = `${i}-${j}`;
            seat.onclick = () => selectSeat(i, j);
            row.appendChild(seat);
        }
        seatMap.appendChild(row);
    }
}

function selectSeat(row, col) {
    console.log(`Asiento seleccionado: ${row}-${col}`);
    // Aquí puedes agregar lógica para cambiar el estado visual del asiento
}