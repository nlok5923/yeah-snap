import { useState, useContext, useEffect } from "react"
import './Create.scss'
import { Select, Spin } from "antd"
import DashboardWithNavigation from "../Dasboard"
import { message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { UserContext } from "../../../Provider/contractProvider";
import Loader from "../../../Components/Loader/Loader"
import IPFS from "ipfs-mini";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const { Dragger } = Upload;

const CreatePage = () => {
    const [file, setFile] = useState(null);
    const contractData = useContext(UserContext);
    const { contract, address } = contractData;
    const [title, setPostTitle] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const [userName, setUserName] = useState('');

    const props = {
        name: 'file',
        multiple: false,
        listType: 'picture',
        accept: ".png,.jpg,.jpeg",
        beforeUpload(file) {
            console.log(file);
            setFile(file);
            return false;
        },
        iconRender() {
            return <Spin></Spin>;
        },
        onChange(info) {
            const { status } = info.file;

            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },

        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const upload = async () => {

        if (contract == null) {
            toast.error("Please connect your metamask!");
        } else {
            setIsLoad(true);
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                data: formData,
                headers: {
                    'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                    'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            const addPostTxn = await contract.addPost(res.data.IpfsHash, title, address, userName);
            const status = await addPostTxn.wait();
            setIsLoad(false);
            console.log(status + " " + addPostTxn);
            toast.success("Yoo!! Posted Successfully");
        }
    }

    return (
        <div>
            <Toaster />
            <Loader isLoading={isLoad}>
                <div className="create-page">
                    <div className="create-page-header">
                        <h1>
                            Add post
                        </h1>
                    </div>
                    <div className="create-page-container">
                        <div className="create-page-container-title">
                            <h1 className="field-label"> Your username </h1>
                            <input type="text" name="title"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your username" className="course-inputStyle" />
                        </div>
                        <div className="create-page-container-title">
                            <h1 className="field-label"> Post caption </h1>
                            <input type="text" name="title"
                                onChange={(e) => setPostTitle(e.target.value)}
                                placeholder="Add an appropriate caption" className="course-inputStyle" />
                        </div>
                        <div className="create-page-container-cover-image">
                            <h1 className="field-label">Upload image</h1>
                            <div className="create-page-container-cover-image-upload">
                                <Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                        band files
                                    </p>
                                </Dragger>
                            </div>
                        </div>

                        <div className="create-page-container-create-btn">
                            <button
                                onClick={() => upload()}
                            > Create </button>
                        </div>
                    </div>
                </div>
            </Loader>
        </div>
    )
}

export default DashboardWithNavigation(CreatePage);