import { useQueryClient, useMutation } from 'react-query'
import { useUserValue } from '../utils/UserContext'
import { putBlog, removeBlog } from '../utils/requests'
import Blog from './Blog'
import { useNotification } from '../utils/NotifContext'

const BlogList = ({ blogs }) => {
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
    return (
        <div>
            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        updateBlog={updateBlog}
                        deleteBlog={deleteBlog}
                    />
                ))}
        </div>
    )
}

export default BlogList
