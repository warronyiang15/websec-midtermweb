import { prisma } from '../../../adapters';
import axios from 'axios';
import bcrypt from 'bcrypt';

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function createUser(req, res){

    // Input validness check
    if( !req.body.username || !req.body.password || !req.body.profile ){
        const ret = {
            "error": "Input invalid!"
        }
        return res.status(400).json(ret);
    }
    if( req.body.username === undefined || req.body.password === undefined || req.body.profile === undefined ){
        const ret = {
            "error": "Input invalid!"
        }
        return res.status(400).json(ret);
    }
    if( req.body.username === '' || req.body.password === '' || req.body.profile === '' ){
        const ret = {
            "error": "Input invalid!"
        }
        return res.status(400).json(ret);
    }
    if( req.body.username.length <= 0 || req.body.password.length <= 0 || req.body.profile.length <= 0 ){
        const ret = {
            "error": "Input invalid!"
        }
        return res.status(400).json(ret);
    }

    // Username validness checked
    if( req.body.username.length <= 0 || req.body.username.length > 10){
        const ret = {
            "error": "username must be at most 10 characters"
        }
        return res.status(400).json(ret);
    }
    const test = await prisma.user.findUnique({ where: { username: req.body.username } } );
    if( test !== null ){
        const ret = {
            "error": "User exists!"
        }
        return res.status(400).json(ret);
    }
    const username = req.body.username;
    
    // Password validness checked
    if( req.body.password.length <= 7 ){
        const ret = {
            "error": "password must be at least 8 characters"
        }
        return res.status(400).json(ret);
    }
    const saltRounds = 10
    const password = await bcrypt.genSalt(saltRounds).then(salt => {
        return bcrypt.hash(req.body.password, salt);
    })

    
    // profile validness checked
    const BASE_URL = `https://api.imgur.com/3/image`;
    const HEADER = ['data:image/jpeg;base64,', 'data:image/png;base64,', 'data:image/jpg;base64,',];
    let position = -1;
    let len = -1;
    for(let i = 0;i < HEADER.length;i++){
        position = req.body.profile.search(HEADER[i]);
        len = HEADER[i].length;
        if( position !== -1 ) break;
    }
    if( position === -1 ){
        // NOT VALID
        const ret = {
            "error": "NOT a VALID image"
        }
        return res.status(400).json(ret);
    }
    const img = req.body.profile.slice(position + len);


    const options = {
        method: 'POST',
        url: BASE_URL,
        headers: {
            'Authorization': 'Bearer ' + process.env.API_KEY,
            'Content-Type': 'multipart/form-data',
        },
        data: {
            'image': img,
            'type': 'base64string',
        },
    };
    const testresult = await axios(options);
    
    let profile = '';
    if( testresult.data.success === 'true' || testresult.data.success === true ){
        profile = testresult.data.data.link;
    }
    if( profile === '' ){
        const ret = {
            "error": "Failed to upload profile picture..."
        }
        return res.status(500).json(ret);
    }

    const user = await prisma.user.create(
        {
            data:{
                username: username,
                password: password,
                profile: profile,
            }
        }
    );

    const ret = {
        data:{
            username: username,
            profile: profile,
        }
    }

    return res.status(201).json(ret);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function validateUser(req, res){
    
    // find the user first
    const user = await prisma.user.findUnique({ where: { username: req.body.username }});
    if( user === null ){
        // Not found
        const ret = {
            "error" : "Failed to login",
        }
        return res.status(404).json(ret);
    }
    
    const passwordValidate = await bcrypt.compare(req.body.password, user.password)
    if( !passwordValidate ){
        const ret = {
            "error": "Failed to login",
        }
        return res.status(404).json(ret);
    }

    const ret = {
        username: user.username,
        profile: user.profile,
    }

    
    req.session.login = true;
    req.session.user = ret;
    return res.status(200).json(ret);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function logoutUser(req, res){
    req.session.login = false;
    req.session.user = null;
    const ret = {
        "description" : "success",
    }
    return res.status(200).json(ret);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function getStatus(req, res){
    
    if( !req.session || !req.session.login || !req.session.user ) {
        const ret = {
            "description": "Not logged in",
        }
        return res.status(404).json(ret);
    }
    
    if( req.session === undefined || req.session.login === undefined || req.session.user === undefined ){
        const ret = {
            "description": "Not logged in",
        }
        return res.status(404).json(ret);
    }

    if( req.session.login === false || req.session.user === null ){
        const ret = {
            "description": "Not logged in",
        }
        return res.status(404).json(ret);
    }

    return res.status(200).json(req.session.user);
}
