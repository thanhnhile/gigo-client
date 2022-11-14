import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const Slider = () => {
  return (
    <section>
      <Carousel autoPlay showThumbs={false} showArrows={true} interval="3000">
        <div>
          <img
            alt=""
            src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
          />
        </div>
        <div>
          <img
            alt=""
            src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
          />
        </div>
        <div>
          <img
            alt=""
            src="https://file.hstatic.net/1000075078/file/web_desktop_d158a17fa9e64ead95e49c8772b69284.jpg"
          />
        </div>
      </Carousel>
    </section>
  )
}

export default Slider
