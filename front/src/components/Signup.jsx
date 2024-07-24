const Signup = () => {
    return (
        <div className="form-wrapper">
            <h1>Sign up</h1>
            
            <div className="form-container">
                <form>
                    <div className="form-elements">
                        <label>Username</label>
                        <input type="text" 
                               name="username" 
                               id="username"
                        />
                    </div>

                    <div className="form-elements">
                        <label>Email</label>
                        <input type="email" 
                               name="email" 
                               id="email"
                        />
                    </div>

                    <div className="form-elements">
                        <label>Password</label>
                        <input type="password" 
                               name="password" 
                               id="password"
                        />
                    </div>

                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup