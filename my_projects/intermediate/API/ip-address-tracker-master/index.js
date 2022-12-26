let ip = document.getElementById('ip')
let locate = document.getElementById('locate')
let timezone = document.getElementById('timezone')
let isp = document.getElementById('isp')
let ip_address = document.getElementById('ip_address')
let btn = document.getElementById('btn')

const api_uri = 'https://geo.ipify.org/api/'
let current_verion = 'v1'
const personal_key ='at_MhtwaeQx4MF3xWQJ5Io2OYf3TQf57'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('map',{
    // Latitude and longitude coordinates of Tokyo 
    'center': [35.652832,139.839478],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [35.443707, 139.638031]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${ersonal_key}`
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${ersonal_key}&ipAddress=${default_ip}`
    }
    fetch(ip_url, headers_option)
    .then( results => results.json())
    .then( data => {
        ip.innerHTML = data.ip
        locate.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        timezone.innerHTML = data.location.timezone
        isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})
