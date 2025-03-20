/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const CommonProvider = ({ children }) => {
    const navigate = useNavigate()
    const base_url = import.meta.env.VITE_API_URL
    const [menuList, setMenuList] = useState({ loading: true, data: [] })
    const [countryList, setCountryList] = useState({ loading: true, data: [] })
    const [stateList, setStateList] = useState({ loading: true, data: [] })
    const [cityList, setCityList] = useState({ loading: true, data: [] })
    const [smsData, setSmsData] = useState({ loading: true, data: [] })
    const [mailList, setMailList] = useState({ loading: true, data: [] })
    const [userList, setUserList] = useState({ loading: true, data: [] , total:'' })
    const [orderList, setOrderList] = useState({ loading: true, data: [] })
    const [orderDetails, setOrderDetails] = useState({ loading: true, data: [] })
    const [promoCode, setPromoCode] = useState({ loading: true, data: [] })
    const [eventList, setEventList] = useState({ loading: true, data: [] , total:'' })
    const [orgList, setOrgList] = useState({ loading: true, data: [] })
    const [ allstateList , setallStateList] = useState({ loading: true, data: []  })
    const [ alldistrictList , setallDristrictList] = useState({ loading: true, data: []  })
    const [ customerDetails , setCustomerDetails] = useState({ loading: true, data: []  })
    const [ allCultColonyList , setallCultColonyList] = useState({ loading: true, data: [], total:'' })
    const [ associatedClientsList , setassociatedClientsList] = useState({ loading: true, data: [], total:'' })
    const [ allCultColonyanimal , setallCultColonyanimal] = useState({ loading: true, data: [], total:'' })
    const [eventDetails, setEventDetails] = useState({ loading: true, data: [] , total:[]  })
    const { Authtoken } = useAuthContext()

    const getMenuList = async () => {
        try {
            const response = await axios.get(`${base_url}/menu/list`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setMenuList({ data: response?.data?.data || [], loading: false })
            } else {
                // toast.error(response?.data?.message)
                setMenuList({ ...menuList, loading: false })
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || 'Server error');
            setMenuList({ ...menuList, loading: false })
        }
    }

    const getCountryList = async () => {
        try {
            setCountryList({ ...countryList, loading: true })
            const response = await axios.get(`${base_url}/country/getAll`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setCountryList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setCountryList({ ...countryList, loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setCountryList({ ...countryList, loading: false })
        }
    }


    const getStateList = async (id) => {
        try {
            setStateList({ data: [], loading: true })
            const response = await axios.get(`${base_url}/state/getAll/${id}`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setStateList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setStateList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setStateList({ data: [], loading: false })
        }
    }


    const getCityList = async (id) => {
        try {
            setCityList({ data: [], loading: true })
            const response = await axios.get(`${base_url}/city/getAll/${id}`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setCityList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setCityList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setCityList({ data: [], loading: false })
        }
    }


    const getSmsSetting = async () => {
        try {
            const response = await axios.get(`${base_url}/admin/sms/settings/details`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setSmsData({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setSmsData({ ...smsData, loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setSmsData({ ...smsData, loading: false })
        }
    }

    const SmsUpdateSetting = async (formData) => {
        try {
            const response = await axios.post(`${base_url}/admin/sms/settings/update`, formData, { headers: { 'Authorization': Authtoken } });
            const data = response.data;
            if (response.status === 200) {
                toast.success('pack updated successfully');
                getSmsSetting();  // Refresh the brand list after success
            } else {
                toast.error('Failed to update the pack');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setSmsData({ ...smsData, loading: false })
        }
    }



    const getEmailSubscribeList = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/subscribed-email/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setMailList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setMailList({ ...smsData, loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setMailList({ ...smsData, loading: false })
        }
    }


    const getUserList = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/user/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setUserList({ data: response?.data?.data || [], total: response.data.total ,loading: false })
            } else {
                toast.error(response?.data?.message)
                setUserList({ data: [], loading: false })
            }
        } catch (error) {

            setUserList({ data: [], loading: false })
        }
    }

    const switchUser = async (id, newStatus) => {
        try {
            const response = await axios.post(
                `${base_url}/admin/user/status/update/${id}`,
                { status: newStatus },
                { headers: { 'Authorization': Authtoken } }
            );
            const data = response.data;
            if (response.status === 200) {
                toast.success(response?.data?.message);
                getUserList(); 
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.success(error?.response?.data?.message);
        }
    };



    const getOrderList = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/order/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setOrderList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setOrderList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setOrderList({ data: [], loading: false })
        }
    }


    const getOrderDetails = async (id) => {
        try {
            const response = await axios.get(`${base_url}/admin/order/details/${id}`, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setOrderDetails({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setOrderDetails({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setOrderDetails({ data: [], loading: false })
        }
    }


    const getPromoCodeList = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/promo-code/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setPromoCode({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setPromoCode({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setPromoCode({ data: [], loading: false })
        }
    }

    const addPromoCode = async (formDataToSend) => {
        try {
            const response = await axios.post(
                `${base_url}/promo-code/add`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': Authtoken,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Coupon added successfully');
                navigate('/promo-code')
            } else {
                toast.error("Failed to add Coupon");
            }
        } catch (error) {
            console.error("Error adding Coupon:", error);
            toast.error("An error occurred while adding the Coupon");
        }
    };


    //    Event Management
    const getEventList = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/news-event/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setEventList({ data: response?.data?.data || [], total: response.data.total ,loading: false })
            } else {
                toast.error(response?.data?.message)
                setEventList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setEventList({ data: [], loading: false })
        }
    }

    const geteventDetail = async (id) => {
      try {
       
          const response = await axios.get(`${base_url}/news-event/details/${id}`,
          { headers: { 'Authorization': Authtoken }});
          if (response.status === 200) {
            setEventDetails({ data: response?.data?.data || [], total: response.data.total,  loading: false })
          } else {
              toast.error(response?.data?.message)
              setEventDetails({ data:[],  loading: false })
          }
      } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          setEventDetails({ data:[], loading: false })
      }
    }


    const addEvent = async (formDataToSend) => {
        try {
            const response = await axios.post(
                `${base_url}/admin/news-event/add`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': Authtoken,
                    }
                }
            );
            if (response.status === 200) {
                toast.success(response?.data?.message);
                navigate('/event-list')
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };


    const editEvent = async (id,dataToSend) => {
      try {
          const response = await axios.post(`${base_url}/admin/news-event/update/${id}`,dataToSend,
          { headers: { 'Authorization': Authtoken }}); 
          if (response.status === 200) {
            toast.success(response?.data?.message)
             navigate('/news-events')
          } else {
              toast.error(response?.data?.message)
      
          }
      } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
    
      }
    }


    const eventDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${base_url}/admin/news-event/delete/${id}`,
                { headers: { 'Authorization': Authtoken } }
            );

            if (response.status === 200) {
                toast.success(response?.data?.message);
                getEventList();
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const getorgList = async (dataToSend) => {
        try {
            setOrgList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/organization/list`, {...dataToSend},
            { headers: { Authorization: Authtoken } }
          );
          if (response.status === 200) {
            setOrgList({ data: response?.data?.data || [], total: response.data.total , loading: false });
          } else {
            setOrgList({ data: [], total:'', loading: false });
          }
        } catch (error) {
            setOrgList({ data: [], loading: false });
        }
      };


      const addCustomer  = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/user/add`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            navigate('/customer')
            getUserList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const getallstateList = async (data) => {
        try {
          const response = await axios.get(
            `${base_url}/admin/state/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallStateList({ data: response?.data?.data || [] , loading: false });
          } else {
            setallStateList({ data:[],  loading: false });
            toast.error("server errors");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };
    
    
      const getallDistrictList = async (state) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/state/district/list`,
            {state_id: state},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallDristrictList({ data: response?.data?.data || [] , loading: false });
          } else {
            setallDristrictList({ data:[],  loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const deleteCustomer = async (id) => { 
        try {
          const response = await axios.delete(
            `${base_url}/admin/user/delete/${id}`,
            { headers: { Authorization: Authtoken } }
          );
          
          if (response.status === 200) {
            toast.success(response?.data?.message)
            getUserList(); 
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
      }

      const getCustomerDetails = async (id) => {
        try {
          const response = await axios.get(
            `${base_url}/admin/user/details/${id}`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setCustomerDetails({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setCustomerDetails({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setCustomerDetails({ data: [], total: "", loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const editCustomer = async (id, formData) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/user/edit/${id}`,
            formData,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          const data = response.data;
          if (response.status === 200) {
            toast.success(response?.data?.message);
            navigate('/customer')
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const approvetransation = async (id,dataToSend) => {
        try {
           
          const response = await axios.post(
            `${base_url}/order/payment/update`,
            {...dataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          const data = response.data;
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getOrderDetails(id)
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getColonyCultList = async (dataToSend) => {
        try {
          setallCultColonyList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/cult/colony/list`,
            { ...dataToSend },
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallCultColonyList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setallCultColonyList({ data: [], loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          setallCultColonyList({ data: [], loading: false });
        }
      };

      const getColonyCultRemove = async (dataToSend) => {
        try {
          setallCultColonyanimal({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/colony/cult/animals`,
            { ...dataToSend },
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallCultColonyanimal({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setallCultColonyanimal({ data: [], loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          setallCultColonyanimal({ data: [], loading: false });
        }
      };

      const removeCult = async (dataToSend) => {
        try {
          const {id} = dataToSend
          setallCultColonyanimal({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/colony/item/remove/${id}`,
            { ...dataToSend },
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            toast.success(response?.data?.message);
            return
          } else {
            toast.error(response?.data?.message)
            return null
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          return null
        }
      };

      const addAssociatedClients  = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/client-associate/add`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getAssociatedCients()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

      const getAssociatedCients = async () => {
        try {
          setassociatedClientsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/client-associates/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setassociatedClientsList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setassociatedClientsList({ data: [], loading: false });
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
          setassociatedClientsList({ data: [], loading: false });
        }
      };

      const editAssociatedClients = async (id, formData) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/client-associate/edit/${id}`,
            formData,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          const data = response.data;
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getAssociatedCients()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


    const values = {
        getMenuList, menuList, countryList, getCountryList, getStateList, stateList, getCityList, cityList,
        getSmsSetting, smsData, SmsUpdateSetting, getEmailSubscribeList, mailList, getUserList, userList, switchUser, getOrderList, orderList, getOrderDetails, orderDetails, promoCode, getPromoCodeList, addPromoCode, addEvent, eventDelete, getEventList, eventList,getorgList,orgList,addCustomer,getallstateList,getallDistrictList,allstateList,alldistrictList,deleteCustomer,getCustomerDetails,customerDetails,editCustomer,approvetransation,getColonyCultList,allCultColonyList,getColonyCultRemove,allCultColonyanimal,removeCult,addAssociatedClients,editAssociatedClients,getAssociatedCients,associatedClientsList,geteventDetail,eventDetails,editEvent
    }
    return (
        <AppContext.Provider value={values} >
            {children}
        </AppContext.Provider>
    );
};

export const useCommonContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};