/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { toast } from "react-toastify";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const SettingProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })
    const [storeMenu, setStoreMenu] = useState({ loading: true, data: [] })
    const [purchaseList, setPurchaseList] = useState({loading: true,data: [],total: "",});
    const [allvendorList, setallvendorList] = useState({ loading: true, data: [] });
    const [allBeddingList, setallBeddingList] = useState({ loading: true, data: [] });
    const [allPackingList, setallPackingList] = useState({ loading: true, data: [] });
    const [allColonyList, setallColonyList] = useState({ loading: true, data: [] });
    const [stockHistoryList, setStockHistoryList] = useState({loading: true,data: [],total: "",});
    const [dashboardCountList, setdashboardCountList] = useState({loading: true,data: []});
    const { Authtoken } = useAuthContext()

    const getSettingDetails = async (body) => {
        try {
            setStoreSetting({ ...storeSetting, loading: true })
            const { data } = await axios.get(`${base_url}/admin/store/setting/details`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.success) {
                setStoreSetting({ loading: false, data: data.data })
            } else {
                setStoreSetting({ ...storeSetting, loading: false })
                console.error(data.message)
            }
        } catch (error) {
            setStoreSetting({ ...storeSetting, loading: false })
        }
    }

    const edit_store_setting = async (body) => {
        try {
            const { data } = await axios.post(`${base_url}/store/setting/update`, body, { headers: { 'Authorization': Authtoken } });
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }
    
    const getStoreMenu = async () => {
        try {
            setStoreMenu({ ...storeMenu, loading: true })
            const { data } = await axios.get(`${base_url}/admin/store/menu/list`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.success) {
                setStoreMenu({ loading: false, data: data.data })
            } else {
                setStoreMenu({ ...storeMenu, loading: false })
                console.error(data.message)
            }
        } catch (error) {
            setStoreMenu({ ...storeMenu, loading: false })
        }
    }
    
    const reorderStoreMenu = async (body) => {
        try {
            const { data } = await axios.post(`${base_url}/store/menu/reorder`, body, { headers: { 'Authorization': Authtoken } });
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const reorderStoreSubMenu = async (body) => {
        try {
            const { data } = await axios.post(`${base_url}/store/sub-menu/reorder`, body, { headers: { 'Authorization': Authtoken } });
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getPurchaseList = async (dataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/inventory/purchase-stocks/list`,
            {...dataToSend},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setPurchaseList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setPurchaseList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
          setPurchaseList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };



      const getallvendorlist = async () => {
        try {
          const response = await axios.post(
            `${base_url}/all/vendors/list`,
            {},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallvendorList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallvendorList({ data: [], loading: false });
            // toast.error(response.data.message);
          }
        } catch (error) {
          setallvendorList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };
    
    
      const addPurchase = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/inventory/purchase-stock`,
            formDataToSend ,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            getPurchaseList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const getBeddingAlllist = async () => {
        try {
          const response = await axios.get(
            `${base_url}/bedding-material/getAll`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallBeddingList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallBeddingList({ data: [], loading: false });
            // toast.error(response.data.message);
          }
        } catch (error) {
          setallBeddingList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getPackingAlllist = async () => {
        try {
          const response = await axios.post(
            `${base_url}/admin/packing-box/getAll`,
            {},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallPackingList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallPackingList({ data: [], loading: false });
            // toast.error(response.data.message);
          }
        } catch (error) {
          setallPackingList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };



      const getColonyAlllist = async () => {
        try {
          const response = await axios.post(
            `${base_url}/colony/getAll`,
            {},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallColonyList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallColonyList({ data: [], loading: false });
          }
        } catch (error) {
          setallColonyList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getStockHistoryList = async () => {
        try {
          const response = await axios.post(
            `${base_url}/admin/inventory/stock/issues/list`,
            {},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setStockHistoryList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setStockHistoryList({ data: [], loading: false });
          }
        } catch (error) {
          setStockHistoryList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const addStockIssue = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/inventory/stock-issue`,
            formDataToSend ,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
            getStockHistoryList();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getDashboardCount = async () => {
        try {
          const response = await axios.get(
            `${base_url}/admin/dashboard/count`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setdashboardCountList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setdashboardCountList({ data: [], loading: false });
          }
        } catch (error) {
          setdashboardCountList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

    

    const values = {
        getSettingDetails, storeSetting, edit_store_setting, getStoreMenu, storeMenu, reorderStoreMenu, reorderStoreSubMenu,getPurchaseList,purchaseList,getallvendorlist,allvendorList,addPurchase,getBeddingAlllist,getPackingAlllist,allBeddingList,allPackingList,getColonyAlllist,allColonyList,getStockHistoryList,stockHistoryList,addStockIssue,getDashboardCount,dashboardCountList
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useSettingContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};
