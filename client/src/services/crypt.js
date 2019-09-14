export default class Crypt {
    generateHash(data){
        return btoa(JSON.stringify(data))
    }
    
    getHashData(hash){
        return atob(hash)
    }
}