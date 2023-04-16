import api from './axiosClient';

export const user = {
    async getUser({ username, password }){
        const data = await api.post("/users/login", { username, password }).catch( (err) => {
            return { error: true, description: err.response.data.error }
        });
        if( data.error ){
            return data;
        }
        else{
            return data.data;
        }
    },
    async createUser({ username, password, profile }) {
        const data = await api.post("/users/register", { username, password, profile } ).catch( (err) => {
            return { error: true, description: err.response.data.error }
        });
        if( data.error ){
            return data;
        }
        else{
            return {error: false, description: 'Success' };
        }
    },
    async getStatus(){
        const data = await api.get('/users/status', {}).catch( (err) => {
            return { error: true, 'description': err.response.data.description }
        });
        if( data.error ) return data;
        else return data.data;
    },
    async logoutUser(){
        const data = await api.post('/users/logout', {}).catch( (err) => {
            return { error: true,'description': err.response.data.description }
        })
        if( data.error ) return data;
        else return data.data;
    }
}