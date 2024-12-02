/* eslint-disable no-unused-vars */
import { setOpenCloseSidebar, setRightSidebar } from "../../Redux/LayoutReducer";
import { Fragment, useState } from "react";
import { AlignLeft, Bell, Maximize2, MessageSquare, MoreHorizontal } from "react-feather";
import { Badge, Col, Row } from "reactstrap";
// import Language from "./Language";
import SearchHeader from "./search";
import UserMenu from "./user-menu";
import Notification from "./notification";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";

const Header = () => {
    const { sidebar, rightSidebar } = useAppSelector((store) => store.LayoutReducer);
    const dispatch = useAppDispatch();
    const [fullScreen, setFullScreen] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [navMenus, setNavMenus] = useState(false);

    const toggle = () => {
        setNavMenus(!navMenus);
    };

    const goFull = (isFullScreen) => {
        setFullScreen(isFullScreen);
        if (isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };
    return (
        <Fragment>
            <div className={`page-main-header ${sidebar && "open"}`}>
                <Row className="main-header-right">
                    <div className="main-header-left d-lg-none col-auto">
                        <div className="logo-wrapper">
                            <a href="#">
                                <img className="blur-up lazyloaded" style={{ width: '90%' }} src='https://res.cloudinary.com/dslcqudfq/image/upload/v1727337882/kazddbooefdnuv217qz9.jpg' alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="mobile-sidebar col-auto p-0">
                        <div className="media-body text-end switch-sm">
                            <label className="switch">
                                <a
                                    role="button"
                                    onClick={() => {
                                        dispatch(setOpenCloseSidebar(toggleSidebar));
                                        setToggleSidebar(!toggleSidebar);
                                    }}
                                >
                                    <AlignLeft />
                                </a>
                            </label>
                        </div>
                    </div>
                    <Col au className="nav-right ">
                        <ul className={"nav-menus " + (navMenus ? "open" : "")}>
                          
                            <li>
                            <UserMenu />
                            </li>
                        </ul>
                        <div className="d-lg-none mobile-toggle pull-right" onClick={toggle}>
                            <MoreHorizontal />
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default Header;
