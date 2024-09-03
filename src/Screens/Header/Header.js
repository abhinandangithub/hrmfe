
// const signinDetails = (
//   <div className="sign-in-details">
//     <div className="list">
//       <h2>Registered Users</h2>
//       <p>Have an account? Sign in now.</p>
//       <Link to="./login">Sign In</Link>
//     </div>
//     <Divider />
//     <div className="list">
//       <h2>New Users</h2>
//       <p>New to DLT Wired? Create an account to get started today.</p>
//       <Link to="./registration">Create an Account</Link>
//     </div>
//   </div>
// )
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd'; // Assuming you're using Ant Design
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import logoWhite from '../../assets/images/logo.png'
import ChangeLanguage from '../../Components/ChangeLanguage/ChangeLanguage'
import T from '../../Components/Translate/Translate'
import './Header.scss'

const Header = ({ noMenu }) => {
  const [menuView, setMenuView] = useState('menu');
  const navigate = useNavigate();

  const responsiveMenu = () => {
    const x = document.getElementById('responsive-menu');

    if (x.style.display === 'block') {
      x.style.display = 'none';
      setMenuView('menu');
    } else {
      x.style.display = 'block';
      setMenuView('close');
    }
  };

  const onShowModules = () => {
    navigate('/');
    setTimeout(() => {
      const appView = document.getElementById('our-modules');
      if (appView) {
        appView.scrollIntoView();
      }
    }, 0);
  };

  return (
    <nav className="accounting-menu">
      <div className="container-fluid">
        <Row justify="center">
          <Col span={21}>
            <Row>
              <Col xs={{ span: 8, order: 1 }} sm={{ span: 8, order: 1 }} md={{ span: 8, order: 1 }} lg={{ span: 4, order: 1 }}>
                <div className="accounting-logo">
                  <Link to="/">
                    <img src={logoWhite} alt="Accqrate" />
                  </Link>
                </div>
              </Col>
              {!noMenu && (
                <>
                  <Col xs={{ span: 24, order: 3 }} sm={{ span: 24, order: 3 }} md={{ span: 8, order: 2 }} lg={{ span: 15, order: 2 }}>
                    <div className="responsive-menu" id="responsive-menu">
                      <div className="center-menu">
                        <ul>
                          <li>
                            <a onClick={onShowModules}>
                              <T>Modules</T>
                            </a>
                          </li>
                          {/* <li>
                                                        <Link to="/pricing">
                                                            <T>Pricing</T>
                                                        </Link>
                                                    </li> */}
                          <li>
                            <Link to="/about-us">
                              <T>About Us</T>
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact-us">
                              <T>Contact Us</T>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col xs={{ span: 16, order: 2 }} sm={{ span: 16, order: 2 }} md={{ span: 8, order: 3 }} lg={{ span: 5, order: 3 }}>
                    <div className="login-and-translate">
                      <div className="login-menu">
                        <Link to="/login">
                          <T>Login</T>
                        </Link>
                      </div>
                      <ChangeLanguage />
                      {/* responsive menu */}
                      <div className="mobile-menu-trigger">
                        {menuView === 'menu' ? (
                          <MenuOutlined onClick={responsiveMenu} />
                        ) : (
                          <CloseOutlined onClick={responsiveMenu} />
                        )}
                      </div>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </nav>
  );
};

export default Header;
