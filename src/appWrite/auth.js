import { Client, Account, ID } from "appwrite";
import config from '../conf/conf.js'

export class AuthSevice {
    client= new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
            
    }

    async signUp ({email, password , name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,name)

            if (userAccount) {
                //give the access to log in
                return this.logIn({email,password})
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async logIn ({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser (){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getUser error",error)
        }
        return null;
    }

    async logOut (){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logOut error",error)
        }
    }

}

const authService = new AuthSevice();

export default authService;