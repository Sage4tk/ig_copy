interface RegisterProps {
    register: boolean
}

const Register:React.FC<RegisterProps> = ({ register }) => {
    if (register) return (null);

    return (
        <div className="wrapper">
            <div className="container-username">
                <div className="username-header">
                    <h1>Set a Username</h1>
                </div>
                <div className="setusername">
                    <input type="text" name="username" placeholder="username"/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;