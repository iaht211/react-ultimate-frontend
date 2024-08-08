import { Menu, message, notification } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, LoginOutlined, AliwangwangFilled, AliwangwangOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Children, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        if (location && location.pathname) {
            const allRoutes = ["users", "books"];
            const currentRoute = allRoutes.find(item => `/${item}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent('home');
            }
        }
    }, [location])

    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res && res.data) {
            setUser(
                {
                    email: "",
                    phone: "",
                    fullName: "",
                    role: "",
                    avatar: "",
                    id: ""
                }
            )
            localStorage.removeItem("access_token");
            message.success("Logout thành công!!!")
            navigate("/");
        }
    }

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to="/books">Book</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        ...!user.id ? [{
            label: <Link to="/login">Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []
        ,
        ...user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: <><span onClick={handleLogout}>Logout</span></>,
                    key: "logout"
                }
            ]
        }] : []
        ,

    ];

    const onClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
}
export default Header;