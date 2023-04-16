import {useState, useEffect} from 'react';
import Card from '../components/Card';
import services from '../services';
import { TextField, FormControl, Input, InputLabel, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Fragment } from 'react';

export default function Chat(){
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState(false);
    const [user, setUser] = useState(null);

    /** @type {React.ChangeEventHandler<HTMLInputElement>} */
    const handleTextChange = (e) => {
        setMsg(e.target.value);
    }

    const handleOnClickSend = (e) => {
        alert(1);
    }

    const handleKeyDown = (e) => {
        if( e.code === 'Enter' ){
            handleOnClickSend(e);
        }
    }

    // handle for logged in users
    const handleLogin = async () => {
        services.user.getStatus({}).then((data) => {
            if( !data.error ){
                setUser(data);
                setStatus(true);
            }
        })
    }

    useEffect(() => {
        handleLogin();
    }, [])

    const getInputField = () => {
        return (
            <div className='container mx-auto bg-slate-400 h-[5rem] max-h-[5rem] min-h-[5rem] flex md:flex-col justify-center'>
                <FormControl sx={{marginLeft:'20px', marginRight:'20px'}} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Content</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type="text"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleOnClickSend}
                            >
                            <SendIcon />
                            </IconButton>
                        </InputAdornment>
                        }
                        value={msg}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                    />
                </FormControl>
            </div>
        )
    }

    // Need fetchAllMessage()
    return (
        <div className="container mx-auto  bg-slate-900 h-[50rem] max-h-[50rem] min-h-[50rem] flex md:flex-col justify-start overflow-auto">
            <div className="container mx-auto h-[45rem] max-h-[45rem] min-h-[45rem] flex md:flex-col justify-start overflow-auto">
                <Card username='admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' user={user} /> 
                <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' user={user}/> 
                <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' user={user}/> 
            </div>
            {status ? getInputField() : <Fragment></Fragment>}
        </div>
    )
}