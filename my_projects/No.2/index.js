const toggle = document.getElementById('toggle');
const priceItem = document.getElementById('priceitem');

toggle.addEventListener('change',e => {
    priceItem.classList.toggle('show-monthly')
});
