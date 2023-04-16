import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import services from '../services';
import { TextField, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const ariaLabel = { 'aria-label': 'description' };

export default function Register(){

    const [formData, setFormData] = useState({ username: "", password: "" } );
    const [message, setMessage] = useState({ status: false, error: false, description: ""});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    function convertToBase64(files){
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }   
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    useEffect(() => {
        setLoading(false);
    }, [message])


    /** @type {React.ChangeEventHandler<HTMLInputElement>} */
    const handleTextInputChange = ({ target: { name, value } }) => {
        // const { name, value } = event.target
        // obj= { ..prev }; obj[name] = value;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /** @type {React.ChangeEventHandler<HTMLInputElement>} */
    const handleFileChange = (event) => {
        
        if( event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg'){
            const fileSize = event.target.files[0].size / (1024 * 1024);
            if( fileSize >= 0.95 ){
                // Exists 1 MB ...
                setMessage({status: true, error: true, description: "File size is too large! (Limit 1MB)"});
            }
            else{
                // Ok
                setFile(event.target.files[0]);
            }
            event.preventDefault();
        }
    }

    const handleFormSubmit = async (event) => {
        setLoading(true);
        if( formData.username.length <= 0 || formData.username.length > 10 ){
            setMessage({status: true, error: true, description: "Username Input Error!"});
            event.preventDefault();
            return;
        }
        
        if( formData.password.length < 8 ){
            setMessage({status: true, error: true, description: "Password Input Error!"});
            event.preventDefault();
            return;
        }
        
        if( file === undefined || file === null ){
            setMessage({status: true, error: true, description: "No profile picture uploaded!"});
            event.preventDefault();
            return;
        }

        const base64 = await convertToBase64(file);
        services.user.createUser({username: formData.username, password: formData.password, profile: base64  }).then((data) => {
            
            if( data.error ){
                setMessage({status: true, error: true, description: data.description === undefined ? 'Something wrong...' : data.description});    
            }
            else{
                setMessage({status: true, error: false, description: "Successfully Created!"});  
                setFormData({ username: "", password: "" });
                setFile(null);
            }
        });
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

    function getTextFieldUsername(error){
        if( !error ){
            return (
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
            )
        }
        else{
            return (
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
                    error
                    helperText="Username must be at most 10 characters long"
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
            )
        }
    }

    const getButton = () => {
        //<Button variant="contained" sx={{position:'relative', right: '0px',width:'280px'}} color='error' onClick={handleFormSubmit}>Register</Button>
        if( !loading ){
            return (
                <Button variant="contained" sx={{position:'relative', right: '0px',width:'280px'}} color='error' onClick={handleFormSubmit}>Register</Button>
            )
        }
        else{
            return (
                <LoadingButton loading sx={{ backgroundColor: 'gray', position:'relative', right: '0px',width:'280px'}} variant="outlined">
                    Submit
                </LoadingButton>
            )
        }
    }

    function getTextFieldPassword(error){
        
        if( !error ){
            return (
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
            )
        }
        else{
            return (
                <TextField
                    id="input-with-icon-textfield"
                    name="password"
                    label="Password"
                    type="password"
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        height: '50px',
                        width: '300px',
                    }}
                    error
                    helperText="Password must be at least 8 characters long"
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
            )
        }
    }

    const getAlertBoxMessage = () => {
        if( !message.error ){
            return (
                <Alert severity="success" onClose={() => {setMessage({status: false, error: false, description: ''})}}>Succesfully Sign up!</Alert>
            )   
        }
        else{
            return (
                <Alert severity="error" onClose={() => {setMessage({status: false, error: false, description: ''})}}>{message.description}</Alert>
            )
        }
    }

    return (
        <div className="container mx-auto px-4 bg-slate-300 h-[50rem] flex md:flex-col justify-center">
            <div className="container mx-auto bg-slate-900 h-[40rem] md:w-[40rem] shadow-[0_0px_80px_15px_rgba(0,0,0,0.5)] shadow-neutral-500 flex md:flex-col justify-start">

                {message.status ? getAlertBoxMessage() : (null)}
                <div className="container mx-auto  h-[10rem] w-full flex md:flex-row justify-center items-end">
                    <h1 className="text-white text-5xl font-mono">Sign up</h1>
                </div>
                <div className="container mx-auto  h-full w-full flex md:flex-col justify-center items-center">
                    <FormControl variant="standard" sx={{ paddingBottom: '40px'}}>
                        {formData.username.length === 0 || formData.username.length <= 10 ? getTextFieldUsername(false) : getTextFieldUsername(true)}
                    </FormControl>

                    <FormControl variant="standard" sx={{  paddingBottom: '40px'}}>
                        {formData.password.length === 0 || formData.password.length > 7 ? getTextFieldPassword(false) : getTextFieldPassword(true) }
                    </FormControl>
                        
                    <div className="container mx-auto pb-8 flex md:flex-row justify-center">
                        <div className="container mx-auto h-full pl-[150px] pr-5 w-full flex md:flex-row justify-end">
                            <Input disabled value={file === null ? 'No chosen file' : file.name} inputProps={ariaLabel} sx={{textAlign:'center', color:'white', backgroundColor:'rgba(255, 255, 255, 0.5)'}} />
                        </div>
                        <div className="container mx-auto h-full w-full flex md:flex-row justify-start">
                            <Button variant="contained" component="label">
                                Upload
                                <input hidden accept="image/*" multiple type="file" onChange={handleFileChange} />
                            </Button>
                        </div>
                    </div>

                    {getButton()}
                </div>
            </div>
        </div>
    );
}