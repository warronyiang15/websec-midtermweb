import {useState, useEffect} from 'react';
import Card from '../components/Card';

export default function Chat(){
    return (
        <div className="container mx-auto  bg-slate-900 h-[50rem] max-h-[50rem] min-h-[50rem] flex md:flex-col justify-start overflow-auto">
           <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' /> 
           <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' /> 
           <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' /> 
           <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' /> 
           <Card username='Admin' content='hoho' subcontent='hehe' imgsrc='assets/bugcat.jpeg' /> 
        </div>
    )
}