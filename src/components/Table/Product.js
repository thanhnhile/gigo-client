import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpGetAllProduct } from '../../apiServices/productServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Product() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const getAllProduct = async () => {
            const response = await httpGetAllProduct();
            console.log(response);
            setProduct(response.data.content);
        };
        getAllProduct();
    }, []);

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/products/add");
    };
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <div className={cx("content")}>
                        <div className={cx("table-title")}>
                            <h2>Danh sách sản phẩm</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")} onClick={() => handleAdd()}>+ Thêm </button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table>
                                <thead>
                                    <tr>
                                        <th width="10%" scope="col">ID</th>
                                        <th width="20%" scope="col">Tên sản phẩm</th>
                                        <th width="15%" scope="col">Giá</th>
                                        <th width="35%" scope="col">Mô tả</th>
                                        <th width="10%" scope="col">Trạng thái</th>
                                        <th width="10%" scope="col">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((product, index) => {
                                        return (
                                            <tr className>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td className={cx("col-justify")}>{product.description}</td>
                                                {product.status === true
                                                    ? (<td>Đang bán</td>)
                                                    : (<td>Hết</td>)
                                                }
                                                <td><Link to={`/admin/products/edit/${product.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
                                                    | <Link to={'/admin/products/add'} ><Icon icon='material-symbols:delete-outline' /></Link></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Product;