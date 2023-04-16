import { prisma } from '../../../adapters';
import axios  from 'axios';
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function getAllChat(req, res){
    const chatArray = await prisma.chat.findMany();
    if( chatArray === null ){
        const ret = {
            "description": "cannot fetch chat messages"
        }
        return res.status(500).json(ret);
    }
    
    let retArray = [];
    // return value should be { id, username, profile, content, subcontent}

    for(let i = 0;i < chatArray.length;i++){
        const chat = chatArray[i];
        const test = await prisma.userc.findUnique({ where: { username: chat.username } });
        if( test === null ) continue;
        const ret = {
            id: chat.id,
            username: chat.username,
            profile: test.profile,
            content: chat.content,
            subcontent: chat.subcontent
        }
        retArray.push(ret);
    }
    return res.status(200).json(retArray);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function deleteChat(req, res){
    const id = parseInt(req.params.id);
    if( isNaN(id) ){
        const ret = {
            "description": "Invalid id parameters!",
        }
        return res.status(400).json(ret);
    }
    
    // valid user input session first
    if( !req.session || !req.session.login || !req.session.user ){
        const ret = {
            "description": "Invalid operation!",
        }
        return res.status(400).json(ret);
    }
    if( req.session === undefined || req.session.login === undefined || !req.session.user === undefined ){
        const ret = {
            "description": "Invalid operation!",
        }
        return res.status(400).json(ret);
    }
    if( !req.session.login || req.session.user === null ){
        const ret = {
            "description": "Invalid operation!",
        }
        return res.status(400).json(ret);
    }

    const chat = await prisma.chat.findUnique({
        where: {id : id},
    });    

    if( chat.username !== req.session.user.username ){
        const ret = {
            "description": "Invalid operation!",
        }
        return res.status(400).json(ret);
    }

    await prisma.chat.delete({
        where: {id: id},
    });
    const ret = {
        "description": "Successfully deleted",
    }
    return res.status(200).json(ret);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function createChat(req, res){
    // 1. Examine login
    // 2. Examine session
    // 3. Examine content

    if( !req.session || !req.session.login || !req.session.user ) {
        const ret = {
            "description": "INVALID OPERATION",
        }
        return res.status(404).json(ret);
    }
    
    if( req.session === undefined || req.session.login === undefined || req.session.user === undefined ){
        const ret = {
            "description": "INVALID OPERATION",
        }
        return res.status(404).json(ret);
    }

    if( req.session.login === false || req.session.user === null ){
        const ret = {
            "description": "INVALID OPERATION",
        }
        return res.status(404).json(ret);
    }

    const BASE_URL = `https://api.openai.com/v1/chat/completions`;
    const options = {
        method: 'POST',
        url: BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY,
            'Content-Type': 'application/json',
        },
        data:{
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "Rephrase the following sentences or words: " + req.body.content}]
        }
    }

    const ai_response = await axios(options);
    let ai_msg = '';
    try{
        ai_msg = ai_response.data.choices[0].message.content;
    }catch(err){
        ai_msg = 'CHATGPT CANNOT RESOLVED';
    }

    const chat = await prisma.chat.create({
        data: {
            username: req.session.user.username,
            content: req.body.content,
            subcontent: ai_msg,
        }
    })

    if( chat === null ){
        const ret = {
            "description": "Could not create chat...",
        }
        return res.status(500).json(ret);
    }

    return res.status(201).json(chat);
}