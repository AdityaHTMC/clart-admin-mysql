/* eslint-disable no-unused-vars */
import { Fragment } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './screen/auth/Login'
import DashboardContainer from './screen/Home'

import CommonLayout from './component/common/common-layout'
import { useAuthContext } from './helper/AuthProvider'
import BannerList from './screen/setting/BannerList'
import FaqList from './screen/FaqList'
import CmsList from './screen/CmsList'
import SmsSettings from './screen/SmsSettings'
import SubscribeEmail from './screen/SubscribeEmail'
import SubCategoryList from './screen/SubCategoryList'
import OrderDetails from './screen/OrderDetails';
import { Unit } from './screen/production/unit';
import { RackPage } from './screen/production/rack';
import { BeddingMaterial } from './screen/non-stock/bedding-material';
import { PackingBox } from './screen/non-stock/packing-box';
import { AddAnimal } from './screen/animals/AddAnimal';
import { StoreMenu } from './screen/setting/store-menu';
import { ColonyList } from './screen/colony/colony-list';
import { NotFound } from './screen/404';
import { FloorPage } from './screen/production/floor';
import EmailSettings from './screen/EmailSettings';
import WhatsAppSettings from './screen/WhatsAppSettings';
import NotificationSettings from './screen/NotificationSettings';
import PaymentMethods from './screen/PaymentMethods';
import StoreSettings from './screen/StoreSettings';
import StateList from './screen/LocationManagement/StateList';
import DistrictList from './screen/LocationManagement/DistrictList';
import OrgType from './screen/Master/OrgType/OrgType';
import Organization from './screen/Organization/Organization';
import UserList from './screen/Customer/UserList';
import AddUser from './screen/Customer/AddUser';
import EditUser from './screen/Customer/EditUser';
import CityList from './screen/LocationManagement/CityList';
import SpeciesList from './screen/Master/SpeciesManagement/SpeciesList';
import OrderStatusList from './screen/Master/OrderStatus';
import RoomList from './screen/production/RoomList';
import AnimalList from './screen/animals/AnimalList';
import EditAnimal from './screen/animals/EditAnimal';
import ReviewsList from './screen/animals/ReviewsList';
import VendorManagement from './screen/StockManagement/VendorManagement';
import AllOrderList from './screen/OrderMenu/AllOrderList';
import AddOrder from './screen/OrderMenu/AddOrder';
import PermissionList from './screen/SubAdmin/PermissionList';
import RoleList from './screen/SubAdmin/RoleList';
import UserManagementList from './screen/SubAdmin/UserManagementList';
import PurchaseStock from './screen/non-stock/PurchaseStock';
import StockReport from './screen/non-stock/StockReport';
import UnPaidOrder from './screen/OrderMenu/UnpaidOrder';
import EditOrder from './screen/OrderMenu/EditOrder';
import ShippingAgency from './screen/Master/ShippingAgency';
import PendingOrder from './screen/OrderMenu/PendingOrder';
import CultColonyList from './screen/colony/CultColonyList';


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
          <Route path="/breed-management" element={<SpeciesList />} />
          <Route path="/animal-list" element={<AnimalList/>} />
          <Route path="/product-edit/:id" element={<EditAnimal/>} />
          <Route path="/banner-list" element={<BannerList />} />
          <Route path="/cms" element={<CmsList />} />
          <Route path="/faqs" element={<FaqList />} />
          <Route path="/sms-setting" element={<SmsSettings />} />
          <Route path="/subscribed-email" element={<SubscribeEmail />} />
          <Route path="/subcategory-List/:id" element={<SubCategoryList />} />
          <Route path="/city-list/:id" element={<CityList />} />
          <Route path="/customer" element={<UserList />} />
          <Route path="/add-customer" element={<AddUser />} />
          <Route path="/edit-customer/:id" element={<EditUser />} />

          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/order-edit/:id" element={<EditOrder />} />
          <Route path="/add-animal" element={<AddAnimal />} />
          <Route path="/cult-colony" element={<CultColonyList />} />
          <Route path="/production-unit" element={<Unit />} />
          <Route path="/production-room" element={<RoomList />} />
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
          <Route path="/store-menu" element={<StoreMenu />} />
          <Route path="/cms-list" element={<CmsList />} />
          <Route path="/location-management" element={<StateList />} />
          <Route path="/district-management/:id" element={<DistrictList />} />
          <Route path="/faq-management" element={<FaqList />} />
          <Route path="/org-type" element={<OrgType />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/order-status" element={<OrderStatusList />} />
          <Route path="/animal-reviews" element={<ReviewsList />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
          <Route path="/all-orders" element={<AllOrderList/>} />
          <Route path="/add-orders" element={<AddOrder/>} />
          
          <Route path="/permission-management" element={<PermissionList />} />
          <Route path="/role-management" element={<RoleList />} />
          <Route path="/user-management" element={<UserManagementList />} />
          <Route path="/purchase-to-stock" element={<PurchaseStock />} />
          <Route path="/stock-reports" element={<StockReport />} />
          <Route path="/finance" element={<UnPaidOrder />} />
          <Route path="/shipping-management" element={<ShippingAgency />} />
          <Route path="/pending-orders" element={<PendingOrder />} />

          <Route path="*" element={<NotFound />} />

        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  )
}

export default App
