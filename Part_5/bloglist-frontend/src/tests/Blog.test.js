import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
	let container
	const blog = {
		title: 'test blog',
		author: 'test author',
		url: 'https://link.to.test/blog',
		likes: 1212,
		user: {
			id: '918273645',
			username: 'testuser1'
		}
	}
	const user = { username: 'testuser1' }
	const mockUpdateHandler = jest.fn()
	const mockDeleteHandler = jest.fn()

	test('renders title and author but not url or likes', () => {
		container = render(<Blog
				blog={blog}
				user={user}
				updateBlog={mockUpdateHandler}
				deleteBlog={mockDeleteHandler}
			/>).container

		const blogElement = container.querySelector('.blog-title')
		const blogDetails = container.querySelector('.blog-details')
		
		expect(blogDetails).toHaveStyle('display: none')
	})
})
