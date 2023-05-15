import { useNavigate, useParams } from 'react-router-dom'
import { useUserValue } from '../utils/UserContext'
import { useNotification } from '../utils/NotifContext'
import { putBlog, removeBlog } from '../utils/requests'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import Loading from './Loading'
import Error from './Error'

const BlogView = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const result = useQuery('blogs')
    const blogs = result.data

    const blog = blogs !== undefined ? blogs.find(b => b.id === id) : null
    const user = useUserValue()
    const setNotif = useNotification()
    const queryClient = useQueryClient()

    const updateBlogMutation = useMutation(putBlog, {
        onSuccess: votedBlog => {
            const prevBlogs = queryClient.getQueryData('blogs')
            const updatedBlog = prevBlogs.find(b => b.id === votedBlog.id)
            updatedBlog.votes = votedBlog.likes
            queryClient.invalidateQueries('blogs', prevBlogs)
        },
    })

    const deleteBlogMutation = useMutation(removeBlog, {
        onSuccess: deletedBlog => {
            const prevBlogs = queryClient.getQueryData('blogs')
            const filteredBlogs = prevBlogs.filter(b => b.id !== deletedBlog.id)
            queryClient.invalidateQueries('blogs', filteredBlogs)
        },
    })

    const updateBlog = async blogObj => {
        try {
            updateBlogMutation.mutateAsync(blogObj)
            setNotif(`Liked '${blogObj.title}' by ${blogObj.author}`, 5000)
        } catch (err) {
            setNotif(`Error occured while updating '${blogObj.title}'`, 5000)
            console.error(err)
        }
    }

    const deleteBlog = async blogObj => {
        try {
            const confirmation = window.confirm(`Delete ${blogObj.title}?`)

            if (confirmation) {
                deleteBlogMutation.mutateAsync(blogObj)
                setNotif(
                    `Deleted '${blogObj.title}' by ${blogObj.author}`,
                    5000
                )
            }
            setNotif('Deletion Cancelled', 5000)
        } catch (err) {
            setNotif(`Error occured while Deleting '${blogObj.title}'`, 5000)
            console.log(err)
        }
    }

    const likeBlog = () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1,
        }

        updateBlog(updatedBlog)
    }

    const delBlog = () => {
        deleteBlog(blog)
        navigate('/')
    }

    if (result.isLoading) return <Loading />

    if (result.isError) return <Error />

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>
                <b>Author:</b> {blog.author}
            </p>
            <p>
                <b>Link:</b> {blog.url}
            </p>
            <p>
                Has {blog.likes} Likes &nbsp;
                <button onClick={likeBlog}>Like</button>
            </p>
            <p>Added by {blog.user.name}</p>
            {user.username === blog.user.username ? (
                <button onClick={delBlog}>Delete</button>
            ) : null}
            <h4>Comments</h4>
            <ul>
                {blog.comments.length !== 0 ? (
                    blog.comments.map(comment => (
                        <li key={comment}>{comment}</li>
                    ))
                ) : (
                    <p>Be the first to comment!</p>
                )}
            </ul>
        </div>
    )
}

export default BlogView
