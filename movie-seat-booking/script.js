const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

// + turns string type into a num type
let ticketPrice = +movieSelect.value

// function that saves selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// function that updates total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length

    // copy selected seats into array and map through it
    const seatsIndex = [...selectedSeats].map((seat) => {
        // return new array indexes
        return [...seats].indexOf(seat)
    })

    // saving seats to local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// function that gets data from local storage and populates UI
function populateUI() {
    // seat UI
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    // movie select UI
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// movie select event that changes the price
movieSelect.addEventListener('change', (event) => {
    ticketPrice = +event.target.value

    setMovieData(event.target.selectedIndex, event.target.value)
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

// Initial count and total set
updateSelectedCount()