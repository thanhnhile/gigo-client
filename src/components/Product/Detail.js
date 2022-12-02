import className from 'classnames/bind';
import styles from './Product.module.scss';
const product = {
    id: 1,
    name: 'CloudFee Hạnh Nhân Nướng',
    image: 'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
    price: '49.000',
    description: 'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
}
const cx = className.bind(styles);
function ProductDetail(props) {

    return (
        <div className={cx("container")}>
            <div className={cx("left-column")}>
                <img src={product.image} alt="" />
            </div>

            <div className={cx("right-column")}>
                <div className={cx("product-description")}>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                </div>

                <div className={cx("product-configuration")}>
                    <div className={cx("product-size")}>
                        <span>Chọn Size</span>
                        {/* <div className={cx("size-choose")}>
                            <div>
                                <input type="radio" id="s" name="size" value="s" checked/>
                                    <label for="s" className="radio-tile-label"><span>Nhỏ + 0đ</span></label>
                            </div>
                            <div>
                                <input type="radio" id="m" name="size" value="m"/>
                                    <label for="m" className="radio-tile-label"><span>Vừa + 6.000đ</span></label>
                            </div>
                            <div>
                                <input type="radio" id="l" name="size" value="l"/>
                                    <label for="l" ><span>Lớn + 10.000đ</span></label>
                            </div>
                        </div> */}
                        <div className="switch-field">
                            <div>
                                <input type="radio" id="radio-one" name="switch-one" value="s" checked />
                                <label for="radio-one">Nhỏ + 0đ</label>
                            </div>
                            <div>
                                <input type="radio" id="radio-two" name="switch-one" value="m" />
                                <label for="radio-two">Vừa + 6.000đ</label>
                            </div>
                            <div>
                                <input type="radio" id="radio-three" name="switch-one" value="l" />
                                <label for="radio-three">Lớn + 10.000đ</label>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={cx("product-price")}>
                    <span>{product.price}</span>
                    <a href="#" className={cx("cart-btn")}>Add to cart</a>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail