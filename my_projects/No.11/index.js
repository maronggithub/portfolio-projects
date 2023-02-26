const  adviceId = document.getElementById('advice_id')
const  adviceContent = document.getElementById('advice_content')
const  button = document.getElementById('button')

window.onload = showQuote

button.addEventListener('click',function() {
    showQuote()
})

function showQuote(){
    fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(res => res.slip)
    .then(res => {
        adviceId.textContent = res.id
        adviceContent.textContent = res.advice
    })
    .catch(error => {
        alert(`Error happened ${error}`)
    })
}
