import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// useNavigate is use to go with another link if the authenication is successful
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
    const dispatch = useDispatch();
    const [ input, setInput ] = useState({
        email: '',
        password: ''
    })
    const { loading, error } = useSelector((state) => state.user); // to get the global state
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
            dispatch(signInStart());
            
            const res = await axios.post('http://localhost:5000/auth/signin', input)

            const data = res.data;

            
            if (res.status === 200) {
                // Sign-in successful
                dispatch(signInSuccess(data));
                navigate('/');
            } else {
                // Sign-in failed, dispatch failure action
                dispatch(signInFailure({ message: 'Sign-in failed. Please check your email and password.' }));
            }

            setInput({
                email: '',
                password: ''
            })  
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 404) {
                    dispatch(signInFailure({ message: 'User not found. Please check your email and password.' }));
                } else if (status === 401) {
                    dispatch(signInFailure({ message: 'Invalid credentials. Please check your email and password.' }));
                } else {
                    dispatch(signInFailure({ message: 'An unexpected error occurred. Please try again.' }));
                }
            } else {
                dispatch(signInFailure({ message: 'Network error. Please try again.' }));
            }
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
                {error && <p className='error'>{error.message || "Something went wrong!"}</p>}
            </div>
        </div>
    )
}

export default Signin