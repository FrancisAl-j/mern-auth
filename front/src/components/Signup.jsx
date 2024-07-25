import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const [ input, setInput ] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            setError(false)
            const res = await axios.post('http://localhost:5000/auth/signup', input)
            //.then(response => console.log(response.data))
            //.catch(err => console.log(err))

            setInput({
                username: '',
                email: '',
                password: ''
            })

            //const data = res.data;

            setLoading(false)
            
        } catch (error) {
            setLoading(false)
            setError(true)
        }

        
    }

    return (
        <div className="form-wrapper">
            <h1>Sign up</h1>
            
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-elements">
                        <label>Username</label>
                        <input type="text" 
                               name="username" 
                               id="username"
                               value={input.username}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-elements">
                        <label>Email</label>
                        <input type="email" 
                               name="email" 
                               id="email"
                               value={input.email}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-elements">
                        <label>Password</label>
                        <input type="password" 
                               name="password" 
                               id="password"
                               value={input.password}
                               onChange={handleChange}
                        />
                    </div>

                    <button disabled={loading} className="signup" type="submit">
                        {loading ? "Loading..." : "Sign up"}
                    </button>
                </form>

                <div className="question">
                    <p>Have an account? </p>
                    <Link to='/signin'>
                        <span>Click here.</span>
                    </Link>
                </div>
                <p className='error'>{error && "Something went wrong!"}</p>
            </div>
        </div>
    )
}

export default Signup