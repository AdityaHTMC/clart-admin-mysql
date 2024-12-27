/* eslint-disable no-unused-vars */
import { Fragment } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './screen/auth/Login'
import DashboardContainer from './screen/Home'
import SubCategoryPage from './screen/sub-category'
import SalesOrders from './screen/Orders'
import SalesTransaction from './screen/transaction'
import CreateCoupons from './screen/create-coupon'
import CreatePage from './screen/create-pages'
import Profile from './screen/Profile'
import ListCoupons from './screen/coupon-list'
import ListPages from './screen/pages-list'
import MenuList from './screen/menu-list'

import CommonLayout from './component/common/common-layout'
import { useAuthContext } from './helper/AuthProvider'
import ProductList from './screen/animals/productList'
import BannerList from './screen/setting/BannerList'
import FaqList from './screen/FaqList'
import CmsList from './screen/CmsList'
import CurrencyList from './screen/CurrencyList'
import Location from './screen/Location'
import SmsSettings from './screen/SmsSettings'
import SubscribeEmail from './screen/SubscribeEmail'
import SubCategoryList from './screen/SubCategoryList'
import StateList from './screen/StateList'
import CityList from './screen/CityList'
import UserList from './screen/UserList'
import OrderList from './screen/OrderList';
import OrderDetails from './screen/OrderDetails';
import AddCoupon from './screen/AddCoupon';
import PromoCodeList from './screen/PromoCodeList';
import { Unit } from './screen/production/unit';
import { RoomPage } from './screen/production/room';
import { RackPage } from './screen/production/rack';
import { BeddingMaterial } from './screen/non-stock/bedding-material';
import { PackingBox } from './screen/non-stock/packing-box';
import { AddProduct } from './screen/animals/add-product';
import { EditProduct } from './screen/animals/edit-prouct';
import { SubAdminManagement } from './screen/sub_admin/management';
import { PermissionManagement } from './screen/sub_admin/permission_management';
import { RoleManagement } from './screen/sub_admin/role_management';
import { StoreMenu } from './screen/setting/store-menu';
import { ColonyList } from './screen/colony/colony-list';
import { NotFound } from './screen/404';
import EventList from "./screen/EventList";
import AddEvent from "./screen/AddEvent";
import { FloorPage } from './screen/production/floor';
import EmailSettings from './screen/EmailSettings';
import WhatsAppSettings from './screen/WhatsAppSettings';
import NotificationSettings from './screen/NotificationSettings';
import PaymentMethods from './screen/PaymentMethods';
import StoreSettings from './screen/StoreSettings';
import ShippingAgency from './screen/Master/ShippingAgency';
import SpeciesManagement from './screen/species_management';

function App() {
  const { initialLoading } = useAuthContext()

  if (initialLoading) {
    return null
  }

  return (
    <Fragment>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<DashboardContainer />} />
          <Route path="/species-management" element={<SpeciesManagement />} />
          <Route path="/product/sub-category" element={<SubCategoryPage />} />
          <Route path="/animal-list" element={<ProductList />} />
          <Route path="/product-edit/:id" element={<EditProduct />} />
          <Route path="/banner-list" element={<BannerList />} />
          <Route path="/cms" element={<CmsList />} />
          <Route path="/currency" element={<CurrencyList />} />
          <Route path="/location-management" element={<Location />} />
          <Route path="/faqs" element={<FaqList />} />
          <Route path="/sms-setting" element={<SmsSettings />} />
          <Route path="/subscribed-email" element={<SubscribeEmail />} />
          <Route path="/subcategory-List/:id" element={<SubCategoryList />} />
          <Route path="/state-list/:id" element={<StateList />} />
          <Route path="/city-list/:id" element={<CityList />} />
          <Route path="/customer" element={<UserList />} />
          <Route path="/orders" element={<OrderList />} />

          <Route path="/orders-details/:id" element={<OrderDetails />} />

          <Route path="/addcoupons" element={<AddCoupon />} />

          <Route path="/promo-code" element={<PromoCodeList />} />

          <Route path="/sales/orders" element={<SalesOrders />} />
          <Route path="/sales/transactions" element={<SalesTransaction />} />
          <Route path="/create-coupons" element={<CreateCoupons />} />
          <Route path="/coupons-list" element={<ListCoupons />} />
          <Route path="/create-pages" element={<CreatePage />} />
          <Route path="/pages-list" element={<ListPages />} />
          <Route path="/menu-list" element={<MenuList />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/add-animal" element={<AddProduct />} />

          <Route path="/production-unit" element={<Unit />} />
          <Route path="/production-room" element={<RoomPage />} />
          <Route path="/production-floor" element={<FloorPage />} />
          <Route path="/production-rack" element={<RackPage />} />
          <Route path="/bedding-materials" element={<BeddingMaterial />} />
          <Route path="/packing-box" element={<PackingBox />} />
          <Route path="/colony-management" element={<ColonyList />} />
          <Route path="/email-settings" element={<EmailSettings />} />
          <Route path="/whatsapp-settings" element={<WhatsAppSettings />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/store-settings" element={<StoreSettings />} />
          <Route path="/Shipping-Agency" element={<ShippingAgency />} />
          <Route path="/user-management" element={<SubAdminManagement />} />
          <Route path="/permission-management" element={<PermissionManagement />} />
          <Route path="/role-management" element={<RoleManagement />} />
          <Route path="/store-menu" element={<StoreMenu />} />
          <Route path="/event-list" element={<EventList />} />
          <Route path="/add-event" element={<AddEvent />} />

          <Route path="*" element={<NotFound />} />

        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  )
}

export default App
