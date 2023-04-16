import api from './axiosClient';

export const chat = {
    async getChat({}){
        const data = await api.get("/chat", {}).catch( (err) => {
            return {error: true, description: err.response.data.description }
        });
        if( !data.error ) return data.data;
        else return data;
    },
    async createChat({content}){
        const data = await api.post("/chat", {content}).catch( (err) => {
            return { error: true, description: err.response.data.description }
        })
        if( data.error) return data;
        else return data.data;
    },
    async deleteChat({id}){
        const data = await api.delete("/chat/" + id, {}).catch( (err) => {
            return { error: true, description: err.response.data.description }
        });
        if( data.error ){
            return data;
        }
        else return data.data;
    },
}