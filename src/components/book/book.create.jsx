import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import { useState } from "react";
import { createBookAPI } from "../../services/api.service";

const BookForm = (props) => {
    const [loading, setLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form] = Form.useForm();

    const { loadBooks } = props;

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const resetAndCloseModal = () => {
        setIsModalOpen(false);
    }

    const onFinish = async (values) => {
        setLoading(true)
        console.log("check data: ", values)
        const res = await createBookAPI(values.mainText, values.author, values.price, values.quantity, values.category);
        if (res && res.data) {
            notification.success({
                title: "Create Book",
                description: "Create book success!!!"
            })
            loadBooks();
        }
        setLoading(false)
        setIsModalOpen(false);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Book Form</h3>
                <Button type="primary" onClick={() => showModal(true)}>Create book</Button>
                <Modal title="Create" open={isModalOpen} onOk={() => { form.submit() }} onCancel={resetAndCloseModal} maskClosable={false} okText="Create" okButtonProps={{ loading: loading }}>
                    <Form
                        form={form}
                        name="layout-multiple-horizontal"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <h3 style={{ textAlign: "center" }}>Đăng nhập tài khoản</h3>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Tiêu đề"
                                    name="mainText"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your title!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your price!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your category!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} placeholder="Arts" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="quantity"
                                    name="quantity"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your quantity!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="author"
                                    name="author"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your author!',
                                        },
                                    ]}
                                >
                                    <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        </>

    )
}
export default BookForm;