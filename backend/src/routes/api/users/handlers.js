
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function createUser(req, res){
    const user = {
        'username': 'noyet',
        'password': 'noyetlah',
        'profile': 'noyet.png',
    };
    return res.json(user);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function validateUser(req, res){
    const user = {
        'username': 'warron',
        'password': '123',
        'profile': 'assets.png',
    };
    return res.json(user);
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
*/
export async function getUser(req, res){
    const username = parseInt(req.params.username);
    console.log(username);
    if( username === '' || username === null ) {
        return res.status(404).json({ error: 'Invalid username' });
    }
    const user = {
        'username': username,
        'password': '123',
        'profile': 'assets.png',
    };
    return res.json(user);
}


