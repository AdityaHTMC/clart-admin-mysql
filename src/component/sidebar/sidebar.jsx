/* eslint-disable no-unused-vars */

import { useAppSelector } from "../../Redux/Hooks";
// import { useTranslation } from "@/app/i18n/client";
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { useCommonContext } from "../../helper/CommonProvider";
import { Spinner } from "reactstrap";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Sidebar = () => {
  const { sidebar } = useAppSelector((store) => store.LayoutReducer);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [subIndex, setSubIndex] = useState({ parentIndex: -1, activeIndex: -1 })
  const { menuList } = useCommonContext()


  const mainMenu = menuList?.data?.map((menuItem, i) => (
    <li key={i} className={i === activeIndex && "active"}>
      {menuItem.type === "sub" && (
        <a
          className={`sidebar-header ${subIndex?.parentIndex === i && 'active'}`}
          href="#"
          role="button"
          onClick={(e) => {
            e.preventDefault();
            setActiveIndex(activeIndex === i ? -1 : i);
          }}
        >
          <span>{menuItem.title}</span>
          <div className="pull-right">
            {activeIndex === i ? <FaChevronDown style={{margin: 0}} /> : <FaChevronRight style={{margin: 0}} />}
          </div>
        </a>
      )}

      {menuItem.type === "link" && (
        <Link to={`${menuItem?.path}`} className={`sidebar-header ${activeIndex === i ? "active" : ""}`} onClick={() => {
          setActiveIndex(i);
          setSubIndex({ parentIndex: -1, activeIndex: -1 });
        }}>
          {/* TODO: menu image */}
          <span>{menuItem.title}</span>
          {menuItem?.sub_menu?.length > 0 ? <i className="fa m-0 fa-angle-right pull-right"></i> : ""}
        </Link>
      )}

      {menuItem.sub_menu && (
        <ul className={`sidebar-submenu ${activeIndex === i ? "menu-open" : ""}`} style={activeIndex === i ? { opacity: 1, transition: "opacity 500ms ease-in" } : {}}>
          {menuItem?.sub_menu?.map((childrenItem, index) => (
            <li key={index}>
              {childrenItem?.type === "link" && (
                <Link
                  to={`${childrenItem.path}`}
                  className={subIndex?.activeIndex === index && subIndex?.parentIndex === i ? 'active' : ''}
                  onClick={() => {
                    setSubIndex({ parentIndex: i, activeIndex: index });
                  }}
                >
                  <i className="fa fa-circle"></i>
                  {childrenItem?.title}{" "}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  ));

  return (
    <Fragment>
      <div className={`page-sidebar ${sidebar && "open"}`}>
        <div className="main-header-left d-none d-lg-block">
          <div className="logo-wrapper justify-content-center">
            <Link to={`/dashboard`}>
              <img className="blur-up lazyloaded" src="https://res.cloudinary.com/dslcqudfq/image/upload/v1727337882/kazddbooefdnuv217qz9.jpg" alt="" style={{ width: '90%', objectFit: 'contain', height: '70px' }} />
            </Link>
          </div>
        </div>
        <div className="sidebar custom-scrollbar">
          {/* <UserPanel /> */}
          {menuList?.loading && (
            <div className="d-grid" style={{placeItems: 'center'}}>
              <Spinner color="secondary" className="my-4" />
            </div>
          )}

          {!menuList?.loading && menuList?.data?.length > 0 && (
            <ul className="sidebar-menu">{mainMenu}</ul>
          )}

          {!menuList?.loading && menuList?.data?.length === 0 && (
            <p className="text-muted text-center my-4" style={{ fontSize: 14 }}>No Menu found</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;