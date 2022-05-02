const apiLink = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(value) {   

    return fetch(`${apiLink}${value}?fields=flags,name,capital,population,languages `)
        
        .then(element => {    
            
            if (!element.ok) {
                throw new Error(element.status)
            }
            
            return element.json()

        })       
    
}