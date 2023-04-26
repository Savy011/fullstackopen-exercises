const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let sum = 0
	const total = blogs.forEach(blog => sum += blog.likes)

	return blogs.length !== 0 ? sum : 0
}

module.exports = {
	dummy,
	totalLikes
}
