import { Button, Input, message, Modal, notification } from "antd";

import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { loadUser } = props;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phoneNumber);
        if (res && res.data) {
            notification.success({ message: "create user", description: "tạo mới user thành công" })
            await resetAndCloseModal();
            await loadUser();
        }
        else {
            notification.error({ message: "create user", description: JSON.stringify(res.message) })
        }
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword;
        setPhoneNumber("");
    }

    return (
        <div className="user-form">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>User table</h3>
                <Button type="primary" onClick={() => showModal(true)}>Create user</Button>
                <Modal title="Create" open={isModalOpen} onOk={() => { handleSubmitBtn() }} onCancel={resetAndCloseModal} maskClosable={false} okText="Create">
                    <div>
                        <span>Full Name</span>
                        <Input onChange={(event) => { setFullName(event.target.value) }} value={fullName} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input onChange={(event) => { setEmail(event.target.value) }} value={email} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password onChange={(event) => { setPassword(event.target.value) }} value={password} />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input onChange={(event) => { setPhoneNumber(event.target.value) }} value={phoneNumber} />
                    </div>
                </Modal>
            </div>
        </div>
    )
}
export default UserForm;