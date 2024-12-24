import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader";
import Error  from "../components/Error";
import Success  from "../components/Success";

function Register(){

    const[name, setname] = useState('')
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [success, setsuccess] = useState(false)

    const navigate = useNavigate();

    async function register(){
        const user={
            name,
            email,
            password
        }
        
        try {
            setloading(true)
            const result = await axios.post('http://localhost:5555/api/users/register', user)
            setloading(false)
            setsuccess(true)
            navigate('/login'); 
            setname('')
            setpassword('')
            setemail('')
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }

    return (
        <div className="bg-background min-h-screen text-text flex flex-col items-center justify-center p-5">
          {loading && <Loader />}
          <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md text-center">
            {success && <Success message="Registration Succeeded!" />}
            {error && <Error message={error} />}
            <h1 className="text-3xl font-bold mb-6">Register</h1>
            <input
              type="text"
              className="w-full p-3 rounded bg-background border border-text-secondary mb-4 focus:outline-primary"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 rounded bg-background border border-text-secondary mb-4 focus:outline-primary"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 rounded bg-background border border-text-secondary mb-4 focus:outline-primary"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
              className="w-full bg-primary text-background py-3 rounded hover:bg-primary/80 transition"
              onClick={register}
            >
              Register
            </button>
          </div>
        </div>
      );
    }
    
    export default Register;