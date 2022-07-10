import { React, useContext, useEffect, useState } from "react"
import DashboardWithNavigation from "../Dasboard";
import PostCard from "../../../Components/PostCard/PostCard";
import './Post.scss'
import { UserContext } from "../../../Provider/contractProvider";

const Post = () => {
    const contractData = useContext(UserContext);
    const [post, setPost] = useState([]);

    const _fetchPost = async () => {
       const userPosts = await contractData.contract.getPost();
       console.log(userPosts);
       setPost(userPosts);
    }

    useEffect(() => {
       _fetchPost();
    }, [contractData])
    return(
        <div>
            <div className="page-container">
                {post.map((data, id) => <PostCard key={id} postData={data} />)}
            </div>
        </div>
    )
}

export default DashboardWithNavigation(Post);