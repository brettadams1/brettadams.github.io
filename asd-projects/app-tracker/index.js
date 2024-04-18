const form = document.querySelector('form');
const input = document.querySelector('input');
let sID = document.getElementById("sID")

form.addEventListener('submit', async event => {
    event.preventDefault()
    console.log(input.value)
})

