const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

// + turns string type into a num type
let ticketPrice = +movieSelect.value

// function that updates total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// movie select event that changes the price
movieSelect.addEventListener('change', (event) => {
    ticketPrice = +event.target.value
    updateSelectedCount()
})

// click event listener that changes color of seats
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
        // console.log(event.target)
        event.target.classList.toggle('selected')

        updateSelectedCount()
    }
})