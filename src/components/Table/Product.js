import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import { httpDeleteProduct, httpGetAllProduct } from '../../apiServices/productServices';
import className from 'classnames/bind';
import styles from './Table.module.scss';

const cx = className.bind(styles);
function Product() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        const response = await httpGetAllProduct();
        console.log(response);
        setProduct(response.data.content);
    };

    const navigate = useNavigate();
    const handleAdd = async () => {
        navigate("/admin/products/add");
    };
    const deleteData = async(id) => {
        if (window.confirm("Bạn có muốn xóa không?")) 
        {
            await httpDeleteProduct(id)
                .then(console.log("Deleted"))
                .catch(err => console.log(err));
                getAllProduct();
        }
        
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
                                                    ? (<td>Hoạt động</td>)
                                                    : (<td>Ẩn</td>)
                                                }
                                                <td><Link to={`/admin/products/${product.id}`} ><Icon icon='material-symbols:edit-square-outline-rounded' /> </Link>
                                                    |   {product.status === true
                                                            ? (<Icon icon='material-symbols:delete-outline' onClick={() => deleteData(product.id)}/>)
                                                            : (<Icon icon='material-symbols:auto-delete-outline'/>)
                                                        }
                                                        
                                                </td>
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