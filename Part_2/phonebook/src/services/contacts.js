import axios from "axios"

const baseUrl = 'http://localhost:3001/contacts'

const getAll = () => {
	const request = axios.get(baseUrl)

	return request.then(response => response.data)
}

const add = (newContact) => {
	const request = axios.post(baseUrl, newContact)

	return request.then(response => response.data)
}

const obliterate = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

export default { getAll, add, obliterate }
