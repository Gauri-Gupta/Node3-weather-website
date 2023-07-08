// console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault()

    const location = search.value

    // console.log(location)
    msg1.textContent='Loading...'
    msg2.textContent=''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            // console.log(data.error)
            msg1.textContent = data.error
            // msg2.textContent=''
        } else{
            // console.log(data.forecast)
            // console.log(data.place)
            msg1.textContent = data.place
            msg2.textContent = data.forecast
        }
        
    })
})
})


