import React, { useEffect } from 'react';
import className from 'classnames/bind';
import styles from './About.module.scss';

import coffeeBerry from '../../assets/images/coffee-berry.jpg';
import coffeeBeans from '../../assets/images/coffee-beans.jpg';
import coffeePot from '../../assets/images/coffee-pot.jpg';

const cx = className.bind(styles);
const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className={cx('about')}>
            <div className={cx('cover')}>
                <div className={cx('story-photo')}></div>
                <div className={cx('bar')}>
                    <h2>Hành trình của GoGi</h2>
                </div>
            </div>
            <div className={cx('content')}>
                <p>Luôn tâm huyết với việc khai thác nguồn nông sản Việt Nam để tạo ra những ly thức uống tươi ngon, an toàn và giàu giá trị dinh dưỡng. Gogi mở cửa hàng đầu tiên vào năm 2013, mang trong mình lòng đam mê và khát vọng xây dựng một thương hiệu trà sữa thuần Việt, mang đậm hương vị quê hương GoGi tin rằng thưởng thức một ly trà sữa được pha chế từ trà Mộc Châu, trân châu từ sản dây Nghệ An hay mứt dâu tằm từ Đà Lạt sẽ là những trải nghiệm hoàn toàn khác biệt và tuyệt vời nhất cho những khách hàng của mình.</p>
                <p>GoGi cũng đã tin vào sức mạnh của cà phê nên cũng đã đưa cà phê vào thực đơn của mình. Bởi cà phê cung cấp một sự pha trộn phức hợp giữa màu sắc, mùi thơm và hương vị, giúp đánh thức chúng ta, là nguồn cung cấp chất chống oxy hóa lớn trong chế độ ăn uống và bảo vệ chống lại các bệnh khác nhau. Đó là một thức uống kỳ diệu, phải không? Đó là lý do tại sao chúng tôi thích phục vụ điều này.</p>
                <p>Hành trình đầy đam mê và tâm huyết này sẽ tiếp tục nhân rộng để lan tỏa những ly trà thuần khiết nông sản Việt đến mọi miền trên đất nước Việt Nam.</p>
            </div>
            <div className={cx('gallery')}>
                <img src={coffeeBerry} alt='Coffee berry'/>
                <img src={coffeeBeans} alt='Coffee beans'/>
                <img src={coffeePot} alt='Coffee pot'/>
            </div>
        </div>
    )
}

export default About;
