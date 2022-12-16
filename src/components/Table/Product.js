import React, { useEffect, useState } from 'react'
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
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-12")}>
                    <from>
                        <div className={cx("table-title")}>
                            <h2>Product</h2>
                            <div className={cx("table-subtitle-right")}>
                                <button className={cx("btn-add")}>+ New</button>
                            </div>
                        </div>
                        <div className={cx("table-content")}>
                            <table className={cx("table table-striped")}>
                                <thead>
                                    <tr>
                                        <th width="10%" scope="col">ID</th>
                                        <th width="20%" scope="col">Name</th>
                                        <th width="15%" scope="col">Price</th>
                                        <th width="35%" scope="col">Description</th>
                                        <th width="10%" scope="col">Status</th>
                                        <th width="10%" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((product, index) => {
                                        return (
                                            <tr className>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.description}</td>
                                                <td>{product.status}</td>
                                                <td>Edit | Delete</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div>
                            </div>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    )
}
export default Product;