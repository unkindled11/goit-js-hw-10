import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from "lodash.debounce"
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
//=====

const search = document.querySelector("#search-box")
const countryList = document.querySelector(".country-list")
const errorMessage = 'Oops, there is no country with that name'
const specificText = 'Too many matches found. Please enter a more specific name'

// =====

function clearItems() {
    countryList.innerHTML = ""
    countryList.nextElementSibling.innerHTML = ""
}
function renderItem(result) {
    const markup = result
        .map((element) => `<li><img width="50" src=${element.flags.svg}>${element.name.official}</li>`).join("")
        countryList.insertAdjacentHTML("afterbegin", markup)
}
function renderDiv(result) {
    countryList.nextElementSibling.insertAdjacentHTML("afterbegin", `<img width="50" src=${result[0].flags.svg}> ${result[0].name.official}<br> capital: ${result[0].capital}<br> population: ${result[0].population}<br> languages: ${Object.values(result[0].languages)}`)
}
// =====

search.addEventListener("input", debounce(() => {

    if (!search.value) {
        clearItems()
        return
    }

    fetchCountries(search.value.trim())
        .then(element => {
            showResult(element)
        })

        .catch(el => {
            clearItems()
            console.log(el)
            Notiflix.Notify.failure(errorMessage)
        })
    
}, DEBOUNCE_DELAY));


function showResult(result) {

    clearItems()
    if (result.length > 10) {

        Notiflix.Notify.info(specificText);
        return

    } else if (result.length <= 10 && result.length >= 2) {

        renderItem(result)
        return

    } else {
        renderDiv(result)
    }

}

countryList.style.listStyleType = 'none';
countryList.style.marginBottom = 15+'px';
