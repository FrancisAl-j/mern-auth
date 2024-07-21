import { Link } from "react-router-dom"

const Nav = () => {
    return (
            <nav>
                <Link to='/'>
                    <h1 className="logo">Auth App</h1>
                </Link>
                
                <ul>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/signin'>
                        <li>Sign in</li>
                    </Link>
                    <Link to='/signup'>
                        <li>Sign up</li>
                    </Link>
                </ul>
            </nav>
    )
}

export default Nav