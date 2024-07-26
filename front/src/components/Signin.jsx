import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// useNavigate is use to go with another link if the authenication is successful

const Signin = () => {
    const [ input, setInput ] = useState({
        email: '',
        password: ''
    })
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

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
            const res = await axios.post('http://localhost:5000/auth/signin', input)

            setInput({
                email: '',
                password: ''
            })  

            setLoading(true)

            navigate('/');

        } catch (error) {
            setLoading(false);
            setError(true);
        }
        
    }

    return (
        <div className="form-wrapper">
            <h1>Sign in</h1>
            
            <div className="form-container">
                <form onSubmit={handleSubmit}>

                    <div className="form-elements">
                        <label htmlFor='email'>Email</label>
                        <input type="email" 
                               name="email" 
                               id="email"
                               value={input.email}
                               onChange={handleChange}
                        />
                    </div>

                    <div className="form-elements">
                        <label htmlFor='password'>Password</label>
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
                    <p>{'Don\'t have an account?'} </p>
                    <Link to='/signup'>
                        <span>Sign up now.</span>
                    </Link>
                </div>
                <p className='error'>{error && "Something went wrong!"}</p>
            </div>
        </div>
    )
}

export default Signin