import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success("Success login!")
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        }
        else {
            notification.error(
                {
                    title: "Failed login!",
                    description: JSON.stringify(res.message)
                }
            )
        }
        setLoading(false)

    }
    return (
        <div >
            <Form
                form={form}
                name="layout-multiple-horizontal"
                layout="vertical"
                onFinish={onFinish}
            >
                <h3 style={{ textAlign: "center" }}>Đăng nhập tài khoản</h3>
                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
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
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={6}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button onClick={() => { form.submit() }} type="primary" loading={loading}>Login</Button>
                            <div><Link to={"/login"}>Go to home page <ArrowRightOutlined /></Link></div>
                        </div>
                        <Divider></Divider>
                        <div>Chưa có tài khoản ? <Link to={"/register"}>Đăng ký tại đây</Link></div>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
export default LoginPage;