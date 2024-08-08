import { DeleteOutlined, ReadOutlined, SignatureOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import BookDetail from './book.detail';
import BookUpdate from './book.update';
import { deleteBookAPI } from '../../services/api.service';
const BookTable = (props) => {
    const { dataBooks, current, pageSize, total, setCurrent, setPageSize, setTotal, loadBooks } = props;
    const [openDetail, setOpenDetail] = useState(false);
    const [dataBook, setDataBook] = useState(null);
    const [isModelUpdate, setIsModalUpdate] = useState(false);
    const [databookupdate, setDatabookupdate] = useState(null);
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{index + 1 + (pageSize * (current - 1))}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <div>
                            <a onClick={() => {
                                setOpenDetail(true)
                                setDataBook(record)
                            }}>{record._id}</a>
                        </div>
                    </>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle" style={{ display: "flex", gap: "20px" }}>
                    <SignatureOutlined style={{ cursor: "pointer", color: "orange" }} onClick={() => {
                        setIsModalUpdate(true)
                        setDatabookupdate(record);
                    }}
                        databookupdate={databookupdate} />
                    <Popconfirm
                        title="Delete user"
                        description="Are you sure to delete this user?"
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                        onConfirm={() => { handleDeleteBook(record._id) }}
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }}
                            databookupdate={databookupdate}

                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            setCurrent(+pagination.current)
        }
        if (pagination && pagination.pageSize) {
            setPageSize(+pagination.pageSize)
        }
    }

    const handleDeleteBook = async (_id) => {
        const res = await deleteBookAPI(_id);
        if (res.data) {
            notification.success({ message: "delete book", description: "Xoá book thành công" });
        }
        else notification.error({ message: "delete book", description: res.message });
        await loadBooks();
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên  {total} rows</div>) }
                }}
                onChange={onChange}
            />
            <BookDetail
                openDetail={openDetail}
                setOpenDetail={setOpenDetail}
                dataBook={dataBook}
                setDataBook={setDataBook} />
            <BookUpdate
                isModelUpdate={isModelUpdate}
                setIsModalUpdate={setIsModalUpdate}
                databookupdate={databookupdate}
                setDatabookupdate={setDatabookupdate}
                loadBooks={loadBooks}
            />
        </>
    )
}

export default BookTable;