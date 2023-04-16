import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button, TextField, Alert } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import services from '../services';

export default function Login(){
    
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState({ status: false, error: false, description: ""});

    /** @type {React.ChangeEventHandler<HTMLInputElement>} */
    const handleTextInputChange = ({ target: { name, value } }) => {
        // const { name, value } = event.target
        // obj= { ..prev }; obj[name] = value;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
        services.user.getUser({ username: formData.username, password: formData.password }).then((data) => {
            if(data.error){
                setMessage({ status: true, error: true, description: data.description });
            }
            else{
                /* Successfully logged in! */
                console.log(data);
                window.location.pathname = '/';
            }
        })
        event.preventDefault();
    }

    const handleLogin = async () => {
        services.user.getStatus({}).then((data) => {
            if( !data.error ){
              // Logged in
              window.location.pathname = '/';
            }
        })
    }

    useEffect(() => {
        handleLogin();
    }, [])
    

    return (
        <div className="container mx-auto px-4 bg-slate-300 h-[50rem] flex md:flex-col justify-center">
            <div className="container mx-auto bg-slate-900 h-[40rem] md:w-[40rem] shadow-[0_0px_80px_15px_rgba(0,0,0,0.5)] shadow-neutral-500 flex md:flex-col justify-start">
                {message.status ? (<Alert severity="error" onClose={() => {setMessage({status: false, error: false, description: ''})}}>{message.description}</Alert>) : (null)}
                <div className="container mx-auto  h-[10rem] w-full flex md:flex-row justify-center items-end">
                    <h1 className="text-white text-5xl font-mono">Sign in</h1>
                </div>
                <div className="container mx-auto  h-full w-full flex md:flex-col justify-center items-center">
                    <FormControl variant="standard" sx={{ paddingBottom: '40px'}}>
                        <TextField
                            name="username"
                            id="input-with-icon-textfield"
                            label="Username"
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                height: '50px',
                                width: '300px',
                            }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircle sx={{color:'white'}} />
                                </InputAdornment>
                            ),
                            }}
                            value={formData.username}
                            onChange={handleTextInputChange}
                            variant="standard"
                        />
                    </FormControl>

                    <FormControl variant="standard" sx={{ paddingBottom: '40px'}}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Password"
                            type="password"
                            name="password"
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                height: '50px',
                                width: '300px',
                            }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <KeyIcon sx={{color:'white'}} />
                                </InputAdornment>
                            ),
                            }}
                            value={formData.password}
                            onChange={handleTextInputChange}
                            variant="standard"
                        />
                    </FormControl>

                    <Button variant="contained" sx={{position:'relative', right: '0px',width:'280px'}} onClick={handleFormSubmit}>Login</Button>
                </div>
            </div>
        </div>
    );
}