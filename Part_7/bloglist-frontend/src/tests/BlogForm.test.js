import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {
    const mockHandler = jest.fn()

    beforeEach(() => {
        render(<BlogForm createBlog={mockHandler} />)
    })

    test('creating a note call the mockhandler with right blog details', async () => {
        const titleInput = screen.getByPlaceholderText('Blog Title')
        const authorInput = screen.getByPlaceholderText('Blog Author')
        const urlInput = screen.getByPlaceholderText('Blog URL')
        const submitButton = screen.getByText('Create')

        await userEvent.type(titleInput, 'test title')
        await userEvent.type(authorInput, 'test author')
        await userEvent.type(urlInput, 'test url')
        await userEvent.click(submitButton)

        expect(mockHandler.mock.calls[0][0]).toEqual({
            title: 'test title',
            author: 'test author',
            url: 'test url',
        })
        expect(mockHandler.mock.calls).toHaveLength(1)
    })
})
