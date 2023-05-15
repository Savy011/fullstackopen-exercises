import { useQuery } from 'react-query'
import { getAllUsers } from '../utils/requests'
import Loading from './Loading'
import Error from './Error'
import { Link } from 'react-router-dom'

const Users = () => {
    const result = useQuery('users', getAllUsers)
    const users = result.data

    const style = {
        textAlign: 'center',
    }

    const UserTable = () => {
        return (
            <div>
                <h2>Users</h2>
                <table>
                    <thead>
                        <tr style={style}>
                            <th>Name</th>
                            <th>Blogs Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <Link
                                        to={`/users/${user.id}`}
                                        state={user}
                                    >
                                        {user.name}
                                    </Link>
                                </td>
                                <td style={style}>{user.blogs.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            {result.isLoading ? (
                <Loading />
            ) : result.isError ? (
                <Error />
            ) : (
                <UserTable />
            )}
        </div>
    )
}

export default Users
