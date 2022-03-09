console.log('Client side js file is loaded') 



const weatherform = document.querySelector('form')
const searchedElement = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchedElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = ''
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = ''
            messageTwo.textContent = [data.location, data.forecast]
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})
