import { useEffect, useState } from "react";
import ListProduct from "../../components/Product/ListProduct";
import { httpGetProductLiked } from "../../apiServices/accountServices";

const ListProductLiked = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProductsLiked = async () => {
            const response = await httpGetProductLiked();
            setProducts(response.data);
        };
        getProductsLiked();
    }, []);

    return (
        <div className='container'>
            <div className='header'>
                <h2>SẢN PHẨM YÊU THÍCH &nbsp;</h2>
            </div>
            {products.length > 0
                ? <ListProduct product={products} />
                : 'Chưa có sản phẩm yêu thích'
            }
        </div>
    );
}
export default ListProductLiked;