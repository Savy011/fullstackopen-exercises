import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

    const padding = {
        paddingRight: 5
    }

    return (
        <div>
            <div>
                <Link style={padding} to='/'>Authors</Link>
                <Link style={padding} to='/books'>Books</Link>
                <Link style={padding} to='/add-book'>Add Book</Link>
            </div>

            <Routes>
                <Route path='/' element={<Authors />}/>
                <Route path='/authors' element={ <Navigate replace to='/' />} />
                <Route path='/books' element={<Books />}/>
                <Route path='/add-book' element={<NewBook />}/>
            </Routes>
        </div>
    )
}

export default App
