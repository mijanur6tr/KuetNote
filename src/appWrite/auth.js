// import apiService from '../services/api.js';

// export class AuthService {
//     async signUp ({email, password , name}){
//         try {
//             const response = await apiService.signUp({ email, password, name });
//             if (response.user) {
//                 // Store token
//                 localStorage.setItem('token', response.token);
//                 return response;
//             } else {
//                 return response;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async logIn ({email,password}){
//         try {
//             const response = await apiService.logIn({ email, password });
//             // Store token
//             localStorage.setItem('token', response.token);
//             return response;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCurrentUser (){
//         try {
//             const response = await apiService.getCurrentUser();
//             return response.user;
//         } catch (error) {
//             console.log("Auth service :: getCurrentUser error", error);
//             return null;
//         }
//     }

//     async logOut (){
//         try {
//             await apiService.logOut();
//             localStorage.removeItem('token');
//             return true;
//         } catch (error) {
//             console.log("Auth service :: logOut error", error);
//             return false;
//         }
//     }
// }

// const authService = new AuthService();

// export default authService;