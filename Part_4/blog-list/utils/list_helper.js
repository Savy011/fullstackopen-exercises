const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	let sum = 0
	const total = blogs.forEach(blog => sum += blog.likes)

	return blogs.length !== 0 ? sum : 0
}

const favBlog = (blogs) => {
	if (blogs.length === 0) {
		return {}
	} 

	const mostLikes = _.maxBy(blogs, 'likes').likes
	const favBlog = _.find(blogs, { likes: mostLikes })

	const retObj = {
		title: favBlog.title,
		author: favBlog.author,
		likes: favBlog.likes
	}

	return retObj
}

module.exports = {
	dummy,
	totalLikes,
	favBlog
}
