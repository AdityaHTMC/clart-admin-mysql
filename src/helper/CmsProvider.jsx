/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const CMsProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [menuList, setMenuList] = useState({ loading: true, data: [] })
    const [cmsList, setCmsList] = useState({ loading: true, data: [] })
    const [currencyList, setCurrencyList] = useState({ loading: true, data: [] })
    const [allOrderlist, setAllOrderlist] = useState({ loading: true, data: [] ,total: ""})
    const [allOrderStatus, setallOrderStatus] = useState({ loading: true, data: [] })
    const [allCustomer, setAllCustomer] = useState({ loading: true, data: [] });
    const [packingbox, setpackingbox] = useState({ loading: true, data: [] });
    const [allanimal, setallanimal] = useState({ loading: true, data: [] });
    const { Authtoken } = useAuthContext()
    const AuthToken = localStorage.getItem('Authtoken')

    const getMenuList = async () => {
        try {
            const response = await axios.get(`${base_url}/menu/list`, { headers: { 'Authorization': Authtoken }});
            if (response.status === 200) {
                setMenuList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setMenuList({ ...menuList, loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setMenuList({ ...menuList, loading: false })
        }
    }

    const getCmsList = async (dataToSend) => {
      try {
        const response = await axios.post(
          `${base_url}/cms/list`,
          {...dataToSend},
          { headers: { 'Authorization': Authtoken } }
        );
        const data = response.data;
        if (response.status === 200) {
          setCmsList({ data: response?.data?.data || [], total:response.data.total, loading: false });
        } else {
          setCmsList({data: [],total:'', loading: false});
          toast.error(response?.data?.message)
        }
      } catch (error) {
          setCmsList({data: [], loading: false});
        toast.error(error.response?.data?.message || 'Server error');
      }
    };



    const addCms = async (formDataToSend) => {
      try {
        const response = await axios.post(
          `${base_url}/cms/add`,
          formDataToSend,  
          { 
            headers: { 
              Authorization: AuthToken,
            }
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message)
          getCmsList();  
        } else {
          toast.error(response?.data?.message)
        }
      } catch (error) {
        
        toast.error(error.response?.data?.message || 'Server error');
      }
    };


    const deleteCms = async (id) => {
      try {
        const response = await axios.delete(
          `${base_url}/cms/delete/${id}`,
          { 
            headers: { 
              Authorization: AuthToken 
            }
          }
        );
        if (response.status === 200) {
          toast.success(response?.data?.message)
          getCmsList();  // Refresh the banner list after success
        } else {
          toast.error(response?.data?.message)
        }
      } catch (error) {
        console.error("Error deleting CMS:", error);
        toast.error(error.response?.data?.message || 'Server error');
      }
    };

    const editcms = async (id, formData) => {
      try {
        const response = await axios.post(
          `${base_url}/cms/update/${id}`,
          formData,
          {
            headers: {
              Authorization: AuthToken,
            },
          }
        );
        const data = response.data;
        if (response.status === 200) {
          toast.success(response?.data?.message)
          getCmsList();  // Refresh the brand list after success
        } else {
          toast.error('Failed to update the CMS');
        }
      } catch (error) {
        console.error('Error updating CMS:', error);
        toast.error(error.response?.data?.message || 'Server error');
      }
    };

      const getCurrencyList = async (data) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/currency/details`,
            {},
            { headers: { 'Authorization': Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCurrencyList({ data: response?.data?.data || [], loading: false });
          } else {
            setCurrencyList({...currencyList, loading: false});
            toast.error("Failed to fetch Bag Type list");
          }
        } catch (error) {
          setCurrencyList({...currencyList, loading: false});
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const getAllOrderList = async (dataToSend) => {
        try {
          setAllOrderlist({ loading: true, data: [] ,total: ""})
            const response = await axios.post(
                `${base_url}/admin/orders/list`,
                {...dataToSend} ,
                { headers: { Authorization: Authtoken } }
            );
            if (response.status === 200) {
                setAllOrderlist({
                    data: response?.data?.data || [],
                    loading: false,
                    total: response.data.total,
                });
            } else {
                setAllOrderlist({ loading: false, data: [] });
            }
        } catch (error) {
            setAllOrderlist({ loading: false, data: [] });
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const getAllOrderStatus = async (data) => {
      try {
        const response = await axios.get(
          `${base_url}/admin/dashboard/order/count`,
          { headers: { 'Authorization': Authtoken } }
        );
        const data = response.data;
        if (response.status === 200) {
          setallOrderStatus({ data: response?.data?.data || [], loading: false });
        } else {
          setallOrderStatus({data:[], loading: false});
          toast.error("server errors");
        }
      } catch (error) {
        setallOrderStatus({data:[], loading: false});
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };


    const getCustomerDetail = async (data) => {
      try {
          setAllCustomer({ ...allCustomer, loading: true });
          const response = await axios.post(
              `${base_url}/admin/all/customers/list`,
              data ,
              { headers: { Authorization: Authtoken } }
          );
          if (response.status === 200) {
              setAllCustomer({
                  data: response?.data?.data || [],
                  loading: false,
              });
          } else {
              setAllCustomer({ data: [], loading: false });
          }
      } catch (error) {
          setAllCustomer({ data: [], loading: false });
          // toast.error("Failed to test list");
      }
  };


  const getpackingBox = async (data) => {
    try {
      setpackingbox({ ...allCustomer, loading: true });
      const response = await axios.post(
        `${base_url}/admin/all/customers/list`,
        data,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setpackingbox({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setpackingbox({ data: [], loading: false });
      }
    } catch (error) {
      setpackingbox({ data: [], loading: false });
      // toast.error("Failed to test list");
    }
  };


  const getAllAnimal = async () => {
    try {
      setallanimal({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/all/breeds/list`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallanimal({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallanimal({ data: [], loading: false });

      }
    } catch (error) {
      setallanimal({ data: [], loading: false });
    }
  };



    const values = {
        getMenuList, menuList , getCmsList ,cmsList ,addCms,deleteCms,editcms,getCurrencyList,currencyList,getAllOrderList,allOrderlist,getAllOrderStatus,allOrderStatus,getCustomerDetail,allCustomer,getpackingBox,packingbox,getAllAnimal,allanimal
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useCmsContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};