import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { getAllBookAPI } from "../services/api.service";
import BookForm from "../components/book/book.create";

const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadBooks = async () => {
        const res = await getAllBookAPI(current, pageSize);
        if (res.data && res.data.result) {
            setDataBooks(res.data.result)
            setTotal(res.data.meta.total)
        }
    }
    useEffect(() => {
        loadBooks();
    }, [current, pageSize])
    return (
        <>
            <BookForm
                loadBooks={loadBooks}
            ></BookForm>
            <BookTable
                dataBooks={dataBooks}
                loadBooks={loadBooks}
                current={current}
                pageSize={pageSize}
                total={total}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                setTotal={setTotal}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            ></BookTable>
        </>
    )
}
export default BookPage;