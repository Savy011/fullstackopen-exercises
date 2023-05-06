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
	const mockHandler = jest.fn()

	beforeEach(() => {
		container =  render(<Blog
				blog={blog}
				user={user}
				updateBlog={mockHandler}
				deleteBlog={mockHandler}
			/>).container
	})

	test('renders title and author but not url or likes', () => {
		const blogDetails = container.querySelector('.blog-details')

		expect(blogDetails).toHaveStyle('display: none')
	})

	test('all blog details are render when \'Show\' button is clicked', async () => {
		const testUser = userEvent.setup()
		const showButton = screen.getByText('Show')
		await testUser.click(showButton)

		const blogDetails = container.querySelector('.blog-details')

		expect(blogDetails).not.toHaveStyle('display: none')
		expect(blogDetails).toHaveTextContent('Url: https://link.to.test/blog')
		expect(blogDetails).toHaveTextContent('Likes: 1212')
	})

	test('clicking the like button two times, calls the updateBlog Handler twice', async () => {
		const testUser = userEvent.setup()

		const showButton = screen.getByText('Show')
		await testUser.click(showButton)

		const blogDetails = container.querySelector('.blog-details')

		expect(blogDetails).toHaveTextContent('Url: https://link.to.test/blog')

		const likeButton = screen.getByText('Like')
		await testUser.click(likeButton)
		await testUser.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})
