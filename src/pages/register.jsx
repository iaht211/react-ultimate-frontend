import { Button, Col, Divider, Form, Input, notification, Row } from "antd"
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(">>> check values: ", values)
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )
        if (res.data) {
            notification.success({
                title: "register user",
                message: "tạo mới người dùng thành công"
            }
            )
            navigate("/login");
        } else {
            notification.error({
                title: "register user error",
                message: JSON.stringify(res.message)
            }
            )
        }
    }
    return (
        <>
            <div style={{ margin: "10px 15px" }}>
                <Form
                    form={form}
                    name="layout-multiple-horizontal"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3>
                    <Row justify={"center"}>
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Full Name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={6}>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        pattern: new RegExp(/\d+/g),
                                        message: "Wrong format!"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify={"center"}>
                        <Col xs={24} md={6}>
                            <div>
                                <Button onClick={() => { form.submit() }} type="primary">Register</Button>
                            </div>
                            <Divider></Divider>
                            <div>Đã có tài khoản? <Link to={"/login"}>Đăng nhập tại đây</Link></div>
                        </Col>
                    </Row>
                </Form>
            </div >
        </>
    )
}
export default RegisterPage;