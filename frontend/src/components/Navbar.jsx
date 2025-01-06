import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav id='navbar'>
        <h2>
            <Link to='/shelf'>Your Library</Link>
        </h2>
        <h2>
            <Link to='/'>Add a review</Link>
        </h2>
        <h2>
        </h2>
    </nav>
  )
}

export default Navbar