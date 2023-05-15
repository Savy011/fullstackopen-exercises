import { useLocation } from 'react-router-dom'

const User = () => {
    const location = useLocation()
    const user = location.state
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>Added Blogs:</h4>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        <i>{blog.title}</i>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User
