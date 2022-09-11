console.log("Client Side javascript")



const weatherform = document.querySelector('form')
const search = document.querySelector('input')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

})
