import { Col, Row } from 'antd'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import AiHoty from '../../assets/images/portfolio/ai-hoty.png'
import Aljaber from '../../assets/images/portfolio/aljaber.png'
import DataInternational from '../../assets/images/portfolio/data-international.png'
import Hoty from '../../assets/images/portfolio/hoty.png'
import iteron from '../../assets/images/portfolio/iteron.png'
import mcbitss from '../../assets/images/portfolio/mcbitss.png'
import Nbb from '../../assets/images/portfolio/nbb.png'
import stanger from '../../assets/images/portfolio/stanger.png'
import T from '../../Components/Translate/Translate'
import './Home.scss'

const portfolioSliderSettings = {
  arrows: true,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
  ]
}

export default class Portfolio extends React.PureComponent {
  render() {
    return (
      <section className="our-portfolio">
        <div className="container-fluid">
          <Row justify="center">
            <Col xs={{ span: 22 }} sm={{ span: 22 }} md={{ span: 21 }} lg={{ span: 21 }}>
              <h2>
                <T>Our Portfolio</T>
              </h2>
              <div className="portfolio-list">
                <Slider {...portfolioSliderSettings}>
                  <div className="list-items">
                    <img src={AiHoty} alt="AI HOTY" />
                  </div>
                  <div className="list-items">
                    <img src={Aljaber} alt="aljaber" />
                  </div>
                  <div className="list-items">
                    <img src={DataInternational} alt="data international" />
                  </div>
                  <div className="list-items">
                    <img src={Hoty} alt="AI HOTY" />
                  </div>
                  <div className="list-items">
                    <img src={Nbb} alt="National Bank of Bahrain" />
                  </div>
                  <div className="list-items">
                    <img src={stanger} alt="stanger" />
                  </div>
                  <div className="list-items">
                    <img src={mcbitss} alt="mcbitss" />
                  </div>
                  <div className="list-items">
                    <img src={iteron} alt="iteron" />
                  </div>
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    )
  }
}
