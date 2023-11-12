import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3300"
})

export const testAPIPost = {
    test(id: number, name: string){
        instance.post('/test', {id, name})
    }
}
export const testAPIGet ={
    test(){
        instance.get('/test')
    }
}