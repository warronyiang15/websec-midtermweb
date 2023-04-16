import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment } from 'react';

export default function Card(props){
    const f = `container mx-auto bg-slate-300 rounded-full w-[6rem] h-[6rem]  bg-cover bg-[url('${props.imgsrc}')] shadow-[0px_0px_20px_7px_rgba(0,0,0,0.5)]`


    const handleDelete = async(event) => {
        alert(1);
    }

    const getDeleteBtn = () => {
        return(
            <Fab onClick={handleDelete} color="error" aria-label="add" >
                <CloseIcon />
            </Fab>
        )
    }

    return (
        <div className="container mx-auto bg-white drop-shadow-2xl shadow-[-10px_0px_20px_7px_rgba(0,0,0,0.5)] shadow-cyan-500/50 h-[12rem] max-h-[12rem] min-h-[12rem] w-[65rem] flex md:flex-row justify-start my-8">
            <div className="flex-auto container mx-auto  drop-shadow-2xl h-full w-[3rem] flex md:flex-col justify-center items-center">
                <p className="text-center pb-4 font-mono ">{props.username}</p>
                <div className={f}></div>
            </div>
            <div className="flex-auto container mx-auto  drop-shadow-2xl h-full w-[40rem] flex md:flex-col">
                <div className="flex-auto container mx-auto flex md:flex-row border-b-2 overflow-auto  ">
                    <p className="text-left pt-4 font-mono ">{props.content}</p>
                </div>
                <div className="flex-auto container mx-auto flex md:flex-row overflow-auto ">
                    <p className="text-left pt-4 font-mono">{props.subcontent}</p>
                </div>
            </div>
            <div className="container mx-auto w-[5rem] pt-14">
                {props.user != null && (props.user.username === props.username) ? getDeleteBtn() : (null)}
            </div>
        </div>
    )
}