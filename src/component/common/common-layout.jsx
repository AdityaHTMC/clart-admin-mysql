import { useEffect } from "react";
import { useCommonContext } from "../../helper/CommonProvider";
import Footer from "../footer/footer";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { Outlet } from "react-router-dom";

const CommonLayout = () => {

    const { getMenuList } = useCommonContext()

    useEffect(() => {
        getMenuList()
    }, [])

    return (
        <div>
            <div className="page-wrapper">
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    {/* <RightChatList /> */}
                    <div className="page-body">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
            {/* <Customizer /> */}
        </div>
    );
};

export default CommonLayout;