import { Button, Col, Form, Input, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { handleUpdateThumnailAPI, handleUploadFile, updateBookAPI } from "../../services/api.service";

const BookUpdate = (props) => {
    const [loading, setLoading] = useState(false);


    const { isModelUpdate, setIsModalUpdate, databookupdate, setDatabookupdate, loadBooks } = props;

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalUpdate(true);
    };

    const onFinish = async (values) => {
        const res = await updateBookAPI(values._id, values.mainText, values.author, values.price, values.quantity, values.category);
        if (res && res.data) {
            notification.success({
                message: "update book",
                description: "Success uodate book"
            })
        }
        else {
            notification.error({
                message: "failed update book",
                description: JSON.stringify(res.message)
            }
            )
        }
        setIsModalUpdate(false);
        loadBooks();
    }

    const resetAndCloseModal = () => {
        setIsModalUpdate(false);
    }

    // handle upload file
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        console.log(">> check preview file: ", preview)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0])
    }

    const handleUploadThumnail = async () => {
        const res = await handleUploadFile(selectedFile, "book")
        console.log(">>> check name: ", res)
        console.log(">>> check privew: ", preview)
        if (res.data) {
            notification.success({
                message: "upload file",
                description: "Success upload file"
            })
            const newAvatar = res.data.fileUploaded;
            const resUpload = await handleUpdateThumnailAPI(databookupdate._id, res.data.fileUploaded)
            if (resUpload.data) {
                setSelectedFile(null);
                setPreview(null);
                notification.success({
                    message: "update book",
                    description: "success update book"
                })
                form.setFieldsValue({ thumbnail: res.data.fileUploaded });
                setDatabookupdate((prev) => ({ ...prev, thumbnail: res.data.fileUploaded }));
            }
            else {
                notification.error({
                    message: "Error update book thumnail",
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
            {databookupdate !== null ?
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Modal title="Update" open={isModelUpdate} onOk={() => { form.submit() }} onCancel={resetAndCloseModal} maskClosable={false} okText="Save" loading={loading}>
                        <Form
                            form={form}
                            name="layout-multiple-horizontal"
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                _id: databookupdate._id,
                                mainText: databookupdate.mainText,
                                price: databookupdate.price,
                                quantity: databookupdate.quantity,
                                category: databookupdate.category,
                                author: databookupdate.author
                            }}
                        >
                            <h3 style={{ textAlign: "center" }}>Update Book</h3>
                            <Row justify={"center"}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Id"
                                        name="_id"
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
                                        label="Tiêu đề"
                                        name="mainText"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your title!',
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
                                        <Input onKeyDown={(event) => { if (event.key === 'Enter') form.submit() }} />
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
                            <div style={{ textAlign: "center" }}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${databookupdate.thumbnail}`} alt="" width={150} height={150} style={{ border: "1px solid #ccc" }} />
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <input type='file' onChange={(event) => { onSelectFile(event) }}></input>
                                {selectedFile
                                    &&
                                    <>
                                        <div style={{ margin: "10px 0", height: "100px", width: "150px", textAlign: "center" }}>
                                            <img src={preview} style={{ border: "1px solid #ccc", width: "100%", height: "100%", textAlign: "center" }} />
                                        </div>
                                        <Button type='primary' onClick={() => { handleUploadThumnail() }}>Save image</Button>
                                    </>
                                }
                            </div>
                        </Form>
                    </Modal>
                </div>

                :
                <span></span>
            }

        </>
    )
}
export default BookUpdate;