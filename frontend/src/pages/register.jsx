import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const ariaLabel = { 'aria-label': 'description' };

export default function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [filename, setFilename] = useState('No file chosen');

    const handleFileChange = (event) => {
        setFilename(event.target.files[0].name);
    }

    const handleUserChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="container mx-auto px-4 bg-slate-300 h-[50rem] flex md:flex-col justify-center">
            <div className="container mx-auto bg-slate-900 h-[40rem] md:w-[40rem] shadow-[0_0px_80px_15px_rgba(0,0,0,0.5)] shadow-neutral-500 flex md:flex-col justify-start">
                <div className="container mx-auto  h-[10rem] w-full flex md:flex-row justify-center items-end">
                    <h1 className="text-white text-5xl font-mono">Sign up</h1>
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
                        
                    <div className="container mx-auto pb-8 flex md:flex-row justify-center">
                        <div className="container mx-auto h-full pl-[150px] pr-5 w-full flex md:flex-row justify-end">
                            <Input disabled value={filename} inputProps={ariaLabel} sx={{textAlign:'center', color:'white', backgroundColor:'rgba(255, 255, 255, 0.5)'}} />
                        </div>
                        <div className="container mx-auto h-full w-full flex md:flex-row justify-start">
                            <Button variant="contained" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
                            </Button>
                        </div>
                    </div>

                    <Button variant="contained" sx={{position:'relative', right: '0px',width:'280px'}} color='error'>Register</Button>
                </div>
            </div>
        </div>
    );
}