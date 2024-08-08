import { Button, Drawer } from 'antd';
const BookDetail = (props) => {
    const { openDetail, setOpenDetail, dataBook, setDataBook } = props;
    const showDrawer = () => {
        setOpenDetail(true);
    };
    const onClose = () => {
        setOpenDetail(false);
    };
    return (
        <>
            <Drawer title="Book detail" onClose={onClose} open={openDetail}>
                {dataBook ?
                    <>
                        <p>Id: {dataBook._id}</p>
                        <p>Tiêu đề: {dataBook.mainText}</p>
                        <p>Tác giả: {dataBook.author}</p>
                        <p>Thể loại: {dataBook.category}</p>
                        <p>Giá tiền: {dataBook.price}</p>
                        <p>Số lượng: {dataBook.quantity}</p>
                        <p>Đã bán: {dataBook.sold}</p>
                        <p>Thumnail: </p>
                        <div>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`} alt="" width={150} height={150} style={{ border: "1px solid #ccc" }} />
                        </div>
                    </>
                    :
                    <p>không có dữ liệu</p>
                }

            </Drawer>
        </>
    )
}
export default BookDetail;