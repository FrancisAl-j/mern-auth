import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <div className="nav-container">
            <nav>
                <h1>Logo</h1>

                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/signin'>Sign in</Link>
                    <Link to='/signup'>Sign up</Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav