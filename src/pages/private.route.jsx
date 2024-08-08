import { useContext } from "react"
import { AuthContext } from "../components/context/auth.context"
import { Link, Navigate } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        )
    }
    // return (
    //     <Navigate to={"/login"} replace />
    // )
    return (
        <Result
            status="403"
            title="Opps!!!"
            subTitle="Bạn cần đăng nhập để truy cập vào tài nguyên này!!!"
            extra={<Button type="primary">
                <Link href="/">back to homepage</Link>
            </Button>}
        />
    )

}
export default PrivateRoute;