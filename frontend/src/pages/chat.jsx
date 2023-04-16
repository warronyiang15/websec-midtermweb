import {useState, useEffect} from 'react';
import Card from '../components/Card';
import services from '../services';
import { TextField, FormControl, Input, InputLabel, InputAdornment, IconButton, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Fragment } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Chat(){
    const [msg, setMsg] = useState('');
    const [status, setStatus] = useState(false);
    const [user, setUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState({ status: false, error: false, description: ""});
    const [loading, setLoading] = useState(false);

    /** @type {React.ChangeEventHandler<HTMLInputElement>} */
    const handleTextChange = (e) => {
        setMsg(e.target.value);
    }

    const handleOnClickSend = (e) => {
        setLoading(true);
        services.chat.createChat({content: msg}).then((data) => {
            if( data.error ){
                setMessage({ status: true, error: true, description: data.description === undefined ? 'Something is wrong...' : data.descriptiondata.description})
            }
            else{
                setMessage({ status: true, error: false, description: 'Successfully create chat!'})
            }
            setMsg('');
            fetchChat();
        })
    }

    const handleKeyDown = (e) => {
        if( e.code === 'Enter' ){
            handleOnClickSend(e);
        }
    }

    const handleDeleteChat = async (id) => {
        services.chat.deleteChat({id}).then((data) => {
            if( data.error ){
                setMessage({ status: true, error: true, description: data.description === undefined ? 'Something is wrong...' : data.description})
            }
            else{
                setMessage({ status: true, error: false, description: 'Successfully deleted chat!'})
            }
        })
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

    // fecth all the chat initial
    const fetchChat = async () => {
        services.chat.getChat({}).then((data) => {
            if(!data.error){
                setChat(data);
            }
            else{
                setMessage({ status: true, error: true, description: 'cannot fetch chat... QQ'})
            }
        })
    }

    useEffect(() => {
        handleLogin();
        fetchChat();
    }, [])

    useEffect(() => {
        setLoading(false);
    }, [message])

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

    const getAlertBoxMessage = () => {
        if( !message.error ){
            return (
                <Alert severity="success" onClose={() => {setMessage({status: false, error: false, description: ''})}}>{message.description}</Alert>
            )   
        }
        else{
            return (
                <Alert severity="error" onClose={() => {setMessage({status: false, error: false, description: ''})}}>{message.description}</Alert>
            )
        }
    }

    const getContentInput = () => {
        if( !loading ){
            return getInputField();
        }
        else{
            return (
                <LoadingButton sx ={{backgroundColor:'gray' }} loading variant="outlined">
                    Submit
                </LoadingButton>
            )
        }
    }

    // Need fetchAllMessage()
    return (
        <div className="container mx-auto  bg-slate-900 h-[50rem] max-h-[50rem] min-h-[50rem] flex md:flex-col justify-start overflow-auto">
            {message.status ? getAlertBoxMessage() : (null)}
            <div className="container mx-auto h-[45rem] max-h-[45rem] min-h-[45rem] flex md:flex-col justify-start overflow-auto">
                {chat.map((item) => (
                    <Card user={user} key={item.id} id={item.id} username={item.username} imgsrc={item.profile} content={item.content} subcontent={item.subcontent} func={handleDeleteChat} />
                ))
                }
            </div>
            {status ? getContentInput() : <Fragment></Fragment>}
        </div>
    )
}