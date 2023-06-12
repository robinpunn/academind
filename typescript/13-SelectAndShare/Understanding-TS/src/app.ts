import axios from "axios";
// require('dotenv').config()

const apiKey = ""

declare var google: any

type GoogleGeocoding = {
    results: {geometry: {location: {lat:number, lng: number}}}[];
    status: 'OK' | 'ZERO_RESULTS';
}

const form = document.querySelector('form') as HTMLFormElement;
const addressInput = document.getElementById('address') as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // send this to google's API
    axios.get<GoogleGeocoding>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${enteredAddress}&key=${apiKey}`
    )
    .then(response => {
        if (response.data.status !== "OK") {
            throw new Error('Could not fetch location')
        }
        const coordinates = response.data.results[0].geometry.location
        // const map = new google.maps.Map(document.getElementById("map"), {
        //     center: coordinates,
        //     zoom: 8
        // })

        // new google.maps.Marker({position: coordinates, map:map})
    })
    .catch(err =>{
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);