import React, { useState, useContext } from "react"
import { useEffect } from "react";
import Identicon from 'react-identicons';
import { UserContext } from "../../Provider/contractProvider";
import Loader from "../../Components/Loader/Loader";
import { Card } from 'antd';
import './Feed.scss'

const Feed = () => {
    const { Meta } = Card;
    const contractData = useContext(UserContext);
    const { contract, address } = contractData;
    const [post, setPost] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    const _fetchPost = async () => {
        setIsLoad(true);
        const data = await contract.getAllPosts();
        console.log(data);
        setPost(data);
        setIsLoad(false);
    }

    useEffect(() => {
        _fetchPost();
    }, [contract])

    return (
        <div>
            <Loader isLoading={isLoad}>
                <div className="feed">
                {
                    post.map((data, id) => {
                        return(
                            <Card
                            key = {id}
                            style={{
                                width: 700,
                            }}
                            className="card"
                            cover={
                                <img
                                    alt="example"
                                    src={`https://gateway.pinata.cloud/ipfs/${data.imageCID}`}
                                />
                            }
                        >
                            <Meta
                                avatar={<Identicon size={40} string="randomness" />}
                                title={data.captionText}
                                description={`By #${data.userName}`}
                            />
                        </Card>
                        )
                    })
                }
                </div>
            </Loader>
        </div>
    )
}

export default Feed;
