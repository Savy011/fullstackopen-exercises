import { useEffect } from 'react' 
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchCountryData = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
                setCountry({ data: response.data[0], found: true })
            } catch (err) {
                setCountry({ found: false })
            }
        }

        if (name) {
            fetchCountryData()
        }
    }, [name])

    return country
}