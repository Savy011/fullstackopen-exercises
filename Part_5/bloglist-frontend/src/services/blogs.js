import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	
	return response.data
}

const create = async blogContents => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, blogContents, config)
	
	return response.data
}

const update = async blogContents => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.put(`${baseUrl}/${blogContents.id}`, blogContents, config)
	
	return response.data
}

const remove = async blogContents => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.delete(`${baseUrl}/${blogContents.id}`, config)
	
	return response.data
}

export default { getAll, create, update, remove, setToken }
