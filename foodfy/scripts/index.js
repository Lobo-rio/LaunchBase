const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')


for (let card of cards) {
    card.addEventListener('click', function(){
        modalOverlay.classList.add('active')
        const cardImg = card.querySelector('img').src
        const cardTitle = card.querySelector('img').alt
        const cardP = card.querySelector('p').innerText

        document.querySelector('.modal img').src = cardImg
        document.querySelector('.modal img').alt = cardTitle
        document.querySelector('.modal h2').innerHTML = cardTitle
        document.querySelector('.modal p').innerHTML = cardP
    })
}


document.querySelector('.close-modal').addEventListener('click', function() {
    modalOverlay.classList.remove('active')
})