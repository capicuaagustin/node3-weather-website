const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = search.value

    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {           
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.weather
        })
    })
})


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })