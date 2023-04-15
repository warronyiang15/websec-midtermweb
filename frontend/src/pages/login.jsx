import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export default function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUserChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="container mx-auto px-4 bg-slate-300 h-[50rem] flex md:flex-col justify-center">
            <div className="container mx-auto bg-slate-900 h-[40rem] md:w-[40rem] shadow-[0_0px_80px_15px_rgba(0,0,0,0.5)] shadow-neutral-500 flex md:flex-col justify-start">
                <div className="container mx-auto  h-[10rem] w-full flex md:flex-row justify-center items-end">
                    <h1 className="text-white text-5xl font-mono">Sign in</h1>
                </div>
                <div className="container mx-auto  h-full w-full flex md:flex-col justify-center items-center">
                    <FormControl variant="standard" sx={{ position: 'relative', right: '40px', paddingBottom: '40px'}}>
                        <InputLabel htmlFor="input-with-icon-adornment" sx={{color: 'white',}}>
                        Username
                        </InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            height: '50px',
                            width: '140%',
                        }}
                        value={username}
                        onChange={handleUserChange}
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle sx={{ color:'white' }}/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>

                    <FormControl variant="standard" sx={{ position: 'relative', right: '40px', paddingBottom: '40px'}}>
                        <InputLabel htmlFor="input-with-icon-adornment" sx={{color: 'white',}}>
                        Password
                        </InputLabel>
                        <Input
                        id="input-with-icon-adornment"
                        label="Password"
                        type="password"
                        sx={{
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            height: '50px',
                            width: '140%',
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                        startAdornment={
                            <InputAdornment position="start">
                            <KeyIcon sx={{ color:'white' }}/>
                            </InputAdornment>
                        }
                        />
                    </FormControl>

                    <Button variant="contained" sx={{position:'relative', right: '0px',width:'280px'}}>Login</Button>
                </div>
            </div>
        </div>
    );
}