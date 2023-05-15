import { useField, removeReset } from '../utils/hooks'
import { useMutation, useQueryClient } from 'react-query'
import { postBlog } from '../utils/requests'
import { useNotification } from '../utils/NotifContext'
import { useNavigate } from 'react-router-dom'

const BlogForm = () => {
    const queryClient = useQueryClient()
    const setNotif = useNotification()
    const navigate = useNavigate()
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const createBlogMutation = useMutation(postBlog, {
        onSuccess: newBlog => {
            const blogsList = queryClient.getQueryData('blogs')
            queryClient.invalidateQueries('blogs', blogsList.concat(newBlog))
        },
    })

    const createBlog = async blogObj => {
        try {
            createBlogMutation.mutateAsync(blogObj)
            setNotif(
                `Blog '${blogObj.title}' by ${blogObj.author} added!`,
                5000
            )
        } catch (err) {
            setNotif(`Error occured while creating '${blogObj.title}'`, 5000)
            console.log(err)
        }
    }

    const addBlog = event => {
        event.preventDefault()
        createBlog({
            title: title.value,
            author: author.value,
            url: url.value,
        })
        navigate('/')
        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div>
            <h4>Create New Blog</h4>
            <form onSubmit={addBlog}>
                <p>
                    Title: &nbsp;
                    <input {...removeReset(title)} />
                </p>
                <p>
                    Author: &nbsp;
                    <input {...removeReset(author)} />
                </p>
                <p>
                    URL: &nbsp;
                    <input {...removeReset(url)} />
                </p>
                <p>
                    <button type="submit">Create</button>
                </p>
            </form>
        </div>
    )
}

export default BlogForm
