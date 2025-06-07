import config from "../conf/conf";
import {Account, ID , Databases , Storage, Client, Query ,} from "appwrite";

export class Service {
    client = new Client();
    database;
    storage;

    constructor(){
        this.client
                    .setEndpoint(config.appwriteUrl)
                    .setProject(config.appwriteProjectId)
        this.database = new Databases(this.client) ;
        this.storage = new Storage(this.client)  ;      
    }

// create , delete , update , get a post(list) , get multiple posts (query)

    async createPost ({title, slug , content , featuredImage , status , userId}){
        try {
            return await this.database.createDocument (
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,

                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            
            )
            
        } catch (error) {
            console.log("appwrite service :: create post :: error",error)
        }
    }

    async updatePost ({title, content , slug, featuredImage , status}){
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,

                {
                    title,
                    content,
                    featuredImage,
                    status
                }

            )
        } catch (error) {
            console.log("Appwrite service :: update post :: error",error)
        }
    }

    async deletePost (slug){
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: delete post :: error",error);
            return false;
        }
    }

    async getPost (slug){
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite service :: get post :: error",error)
              return false;
        }
    }

    async getPosts (){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Appwrite service :: update post :: error",error);
            return false;
        }
    }

// file upload , file delete 

    async creteFile (file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique,
                file,
            )
        } catch (error) {
             console.log("Appwrite service :: create file :: error",error);
             return flase;
        }
    }

    async deleteFile (fileID){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileID,
            )
            return true;
        } catch (error) {
             console.log("Appwrite service :: delete file :: error",error);
             return false;
        }
    }

    previewFile (fileID){

        try {
             this.storage.getFilePreview(
                config.appwriteBucketId,
                fileID,
            )
        } catch (error) {
              console.log("Appwrite service :: preview file :: error",error);
        }
    }


}

const service = new Service();
export default service;