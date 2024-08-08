import { Button, Drawer, Input, message, notification } from 'antd';
import { useEffect, useState } from 'react';
import { handleUpdateUserAvatarAPI, handleUploadFile } from '../../services/api.service';
const UserDetail = (props) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const { open, setOpen, dataUser, setDataUser, loadUser } = props;

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setDataUser(null)
        setOpen(false);
    };

    const onSelectFile = (event) => {
        console.log(event.target.files)
        if (event.target.files === null || event.target.files.length === 0) {
            console.log("check")
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUploadUserAvatar = async () => {
        const res = await handleUploadFile(selectedFile, "avatar")
        console.log("check res: ", res)
        if (res.data) {
            notification.success({
                message: "upload file",
                description: "Success upload file"
            })
            const newAvatar = res.data.fileUploaded;
            const resUpload = await handleUpdateUserAvatarAPI(newAvatar, dataUser._id, dataUser.fullName, dataUser.phone);
            if (resUpload.data) {
                setSelectedFile(null);
                setPreview(null);
                setOpen(false);
                loadUser();
                notification.success({
                    message: "update user",
                    description: "success update user"
                })
            }
            else {
                notification.error({
                    message: "Error update user avatar",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }
        else {
            notification.error({
                message: "upload file",
                description: JSON.stringify(res.message)
            }
            )
        }
    }
    return (
        <>
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                {dataUser ?
                    <>
                        <div>
                            <p>Id: {dataUser._id}</p>
                        </div>
                        <div>
                            <p>Full name: {dataUser.fullName}</p>
                        </div>
                        <div>
                            <p>Email: {dataUser.email}</p>
                        </div>
                        <div>
                            <p>Phone: {dataUser.phone}</p>
                        </div>
                        <div>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUser.avatar}`} alt="" width={150} height={150} style={{ border: "1px solid #ccc" }} />
                        </div>
                        <div>
                            <label htmlFor="btnUpload"
                                style={{
                                    display: "block",
                                    width: "fit-content",
                                    marginTop: "15px",
                                    padding: "5px 10px",
                                    backgroundColor: 'orange',
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    border: "1px solid #ccc"
                                }}>
                                Upload File
                            </label>
                            <input type='file' hidden id='btnUpload' onChange={(event) => { onSelectFile(event) }}></input>
                            {selectedFile
                                &&
                                <>
                                    <div style={{ margin: "10px 0", height: "100px", width: "150px" }}>
                                        <img src={preview} style={{ border: "1px solid #ccc", width: "100%", height: "100%" }} />

                                    </div>
                                    <Button type='primary' onClick={() => { handleUploadUserAvatar() }}>Save</Button>
                                </>
                            }
                        </div>
                    </> : <>
                        <p>Không có dữ liệu</p>
                    </>}
            </Drawer>
        </>
    )
}
export default UserDetail;