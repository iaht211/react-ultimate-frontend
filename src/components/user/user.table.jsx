import { DeleteOutlined, SignatureOutlined } from '@ant-design/icons';
import { Popconfirm, Space, Table, message, notification } from 'antd';
import UserUpdate from './user.update.form';
import { useState } from 'react';
import UserDetail from './user.detail.form';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {

  const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize, setTotal } = props;
  const [isModelUpdate, setIsModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      await loadUser();
      notification.success({ message: "delete user", description: "Xoá người dùng thành công" });
    }
    else notification.error({ message: "delete user", description: res.message });

  }

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
      render: (_, record) => (
        <Space size="middle">
          <div>
            <a onClick={() => {
              setIsModalDetail(true)
              setDataUser(record)
            }
            }>{record._id}</a>
          </div>
        </Space>
      ),

    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" style={{ display: "flex", gap: "20px" }}>
          <SignatureOutlined style={{ cursor: "pointer", color: "orange" }}
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdate(true)
            }}
          />
          <Popconfirm
            title="Delete user"
            description="Are you sure to delete this user?"
            onConfirm={() => { handleDeleteUser(record._id) }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement='left'
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
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
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => { return (<div>{range[0]} - {range[1]} trên  {total} rows</div>) }
        }}
        onChange={onChange}
        loading={loadingTable}
      />
      <UserUpdate isModelUpdate={isModelUpdate}
        setIsModalUpdate={setIsModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser} />
      <UserDetail
        open={isModalDetail}
        setOpen={setIsModalDetail}
        dataUser={dataUser}
        setDataUser={setDataUser}
        loadUser={loadUser}
      />

    </>

  )
}
export default UserTable;