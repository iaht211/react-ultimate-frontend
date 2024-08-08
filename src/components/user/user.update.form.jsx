import { Input, Modal, notification } from "antd";

import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UserUpdate = (props) => {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const { isModelUpdate, setIsModalUpdate, dataUpdate, setDataUpdate, loadUser } = props;

    // const { loadUser } = props;
    const showModal = () => {
        setIsModalUpdate(true);
    };
    const handleOk = () => {
        setIsModalUpdate(false);
    };
    const handleCancel = () => {
        setIsModalUpdate(false);
    };

    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res && res.data) {
            notification.success({ message: "update user", description: "cập nhật user thành công" })
            await resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({ message: "update user", description: JSON.stringify(res.message) })
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdate(false);
        setId("");
        setFullName("");
        setPhone("");
        setDataUpdate(null)
    }
    return (
        <div className="user-form">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Modal title="Update User" open={isModelUpdate} onOk={() => { handleSubmitBtn() }} onCancel={resetAndCloseModal} maskClosable={false} okText="Update">
                    <div>
                        <span>ID</span>
                        <Input onChange={(event) => { setId(event.target.value) }} value={id} />
                    </div>
                    <div>
                        <span>Full Name</span>
                        <Input onChange={(event) => { setFullName(event.target.value) }} value={fullName} />
                    </div>
                    <div>
                        <span>Phone</span>
                        <Input onChange={(event) => { setPhone(event.target.value) }} value={phone} />
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default UserUpdate