import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import slide from '../../assets/images/slide.jpg';

const Slider = () => {
  return (
    <section>
      <Carousel autoPlay showThumbs={false} showArrows={true} interval='2000'>
        <div>
          <img alt='' src={slide} />
        </div>
        <div>
          <img alt='' src={slide} />
        </div>
        <div>
          <img alt='' src={slide} />
        </div>
      </Carousel>
    </section>
  );
};

export default Slider;
