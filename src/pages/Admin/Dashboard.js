import React from 'react';
import className from 'classnames/bind';
import styles from './Admin.module.scss';

import Product from '../../components/Table/Product';
import Category from '../../components/Table/Category';
import Store from '../../components/Table/Store';
import Employee from '../../components/Table/Employee';

import AddCategory from '../../components/Form/Category';
import AddEmployee from '../../components/Form/Employee';
import AddProduct from '../../components/Form/Product';
import AddStore from '../../components/Form/Store';
const cx = className.bind(styles);
const Dashboard = () => {
  //  return <div>Dashboard</div>;
  return (
    <div>
        <nav className={cx("navbar navbar-inverse navbar-global navbar-fixed-top")}>
          <div className={cx("container-fluid")}>
            <div className={cx("navbar-header")}>
              <button type="button" className={cx("navbar-toggle collapsed")} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className={cx("sr-only")}>Toggle navigation</span>
                <span className={cx("icon-bar" )}/>
                <span className={cx("icon-bar" )}/>
                <span className={cx("icon-bar" )}/>
              </button>
              <a className="navbar-brand" href="#">Santhosh Vertical Nav Project</a>
            </div>
            <div id="navbar" className={cx("collapse navbar-collapse")}>
              <ul className={cx("nav navbar-nav navbar-user navbar-right")}>
                <li><a href="#"><span className={cx("glyphicon glyphicon-user")} /> Santhosh Giridara</a></li>
                <li><a href="#about"><span className={cx("glyphicon glyphicon-log-out" )}/> Logout</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <nav className={cx("navbar-primary")}>
          <a href="#" className={cx("btn-expand-collapse")}><span className={cx("glyphicon glyphicon-menu-left")} /></a>
          <ul className={cx("navbar-primary-menu")}>
            <li>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Dashboard</span></a>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Categories</span></a>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Employee</span></a>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Product</span></a>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Order</span></a>
              <a href="#"><span className={cx("glyphicon")}/><span className={cx("nav-label")}>Store</span></a>
            </li>
          </ul>
        </nav>
        <div className={cx("main-content")}>
          {/* <Product/> 
          <Category/>
          <Store/>
          <Employee/>
          <AddCategory/>
          <AddEmployee/>
          <AddStore/>
          <AddProduct/>*/}
          <AddProduct/>
        </div>
      </div>
  )
};

export default Dashboard;
