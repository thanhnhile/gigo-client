import React from 'react';
import ProductItem from './ProductItem';
import className from 'classnames/bind';
import styles from './Product.module.scss';

const cx = className.bind(styles);

function ListProduct(props) {
  //    const {HotSaleProducts} = props;
  const HotSaleProducts = [
    {
      id: 1,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 2,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 3,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 4,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 5,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
    {
      id: 6,
      name: 'CloudFee Hạnh Nhân Nướng',
      image:
        'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
      price: '49.000',
      description:
        'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
    },
  ];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <div className={cx('product product--flexbox')}>
          {props.title && <h2>{props.title}</h2>}
          <div className={cx('product__wrapper')}>
            {props.product.map((product, index) => (
              <ProductItem product={product} key={index}></ProductItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // function ListProduct({ products, title }) {
  //   //    const {HotSaleProducts} = props;
  //   const HotSaleProducts = [
  //     {
  //       id: 1,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //     {
  //       id: 2,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //     {
  //       id: 3,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //     {
  //       id: 4,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //     {
  //       id: 5,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //     {
  //       id: 6,
  //       name: 'CloudFee Hạnh Nhân Nướng',
  //       image:
  //         'https://product.hstatic.net/1000075078/product/1665655231_cloudfee-roasted-almond_fd7f9778e1814e81bc049f991ffacf60.jpg',
  //       price: '49.000',
  //       description:
  //         'Vị đắng nhẹ từ cà phê phin truyền thống kết hợp Espresso Ý, lẫn chút ngọt ngào của kem sữa và lớp foam trứng cacao, nhấn thêm hạnh nhân nướng thơm bùi, kèm topping thạch cà phê dai giòn mê ly. Tất cả cùng quyện hoà trong một thức uống làm vị giác "thức giấc", thơm ngon hết nấc.',
  //     },
  //   ];
  //   return (
  //     <div className={cx('wrapper', 'container')}>
  //       <div className={cx('content')}>
  //         <div className={cx('product', 'product--flexbox')}>
  //           {title && <h2>{title}</h2>}
  //           <div className={cx('product__wrapper')}>
  //             {products
  //               ? products.map((product, index) => (
  //                   <ProductItem product={product} key={index}></ProductItem>
  //                 ))
  //               : 'Không có sản phẩm nào'}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}

export default ListProduct;
