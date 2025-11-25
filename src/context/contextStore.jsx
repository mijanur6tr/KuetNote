import { createContext ,useState,useEffect} from "react";
// import authService from "../appWrite/auth";
import service from "../appWrite/config";
import { useSelector } from "react-redux";



export const ContextStore = createContext(null)

const ContextStoreProvider = (props) => {

  const user = useSelector((state)=>state.auth.userData);

const [postList,setPostList] = useState([])
const [myPostList,setMyPostList] = useState([])
// const [user,setUser] = useState(null)
const [loading, setLoading] = useState(true)


// const getUser = async ()=>{
//     try {
//         const res = await authService.getCurrentUser();
//         if(res){
//             setUser(res)  
//         }
//     } catch (error) {
//         console.log(error.message)
//     }
// }

const fetchPosts = async () => {
  try {
    const postdatas = await service.getPosts();
    if (postdatas && Array.isArray(postdatas.documents)) {
      setPostList(postdatas.documents);
     
    } else {
      console.warn("postdatas.documents is not an array", postdatas.documents);
    }
  } catch (error) {
    console.log(error.message);
  }
};


const fetchMyPost = async ()=>{
    try {
        if(user){
            const res = await service.getMyPosts(user.$id)
            if(res){
                setMyPostList(res.documents)
            }else{
                console.log("No post found in MyPost")
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}


 useEffect(() => {
    
    const fetchData = async () => {
      try {
           await fetchPosts();
           await fetchMyPost();
      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user,postList])

const contextValue = {
    postList,
    myPostList,
    user,
    loading,
    fetchMyPost,
    fetchPosts,
    // getUser,
    
}

    return (
        <ContextStore.Provider value={contextValue}>
            {props.children}
        </ContextStore.Provider>
    )

}

export default ContextStoreProvider;