/* eslint-disable no-unused-vars */
import axios from 'axios';
import  { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { toast } from "react-toastify";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const MasterProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL

    const [unitList, setUnitList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allUnit, setAllUnit] = useState([])
    const [roomList, setRoomList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allRoom, setAllRoom] = useState([])
    const [floorList, setFloorList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allFloor, setAllFloor] = useState([])
    const [rackList, setRackList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [material, setMaterial] = useState({ loading: true, data: [] })
    const [packingBox, setPackingBox] = useState({ loading: true, data: [] })
    const [smsSettingsList, setSmsSettingsList] = useState({loading: true,data: [],total: ""});
    const [emailSettingsList, setEmailSettingsList] = useState({loading: true,data: [],total: ""});
    const [whatsAppSettingsList, setWhatsAppSettingsList] = useState({loading: true,data: [],total: ""});
    const [notificationSettingsList, setNotificationSettingsList] = useState({loading: true,data: [],total: ""});
    const [ShippingAgencyList, setShippingAgencyList] = useState({loading: true,data: [],total: ""});
    const [paymentMethodsList, setPaymentMethodsList] = useState({loading: true,data: [],total: ""});
    const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })
    const [stateList, setstateList] = useState({loading: true,data: [],total: ""});
    const [orgTypeList, setOrgTypeList] = useState({loading: true,data: [],total: ""});
    const [orgList, setOrgList] = useState({loading: true,data: [],total: ""});
    const [allorgtypeList, setallOrgTypeList] = useState({loading: true,data: [],total: ""});
    const [districtList, setdistrictList] = useState({loading: true,data: [],total: ""});
    const { Authtoken } = useAuthContext()

    //  Unit fucntions
    const create_unit = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/unit/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_unit = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/unit/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getUnitList = async (body) => {
        try {
            setUnitList({...unitList, loading: true})
            const {data} = await axios.post(`${base_url}/unit-list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setUnitList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setUnitList({...unitList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setUnitList({...unitList, loading: false})
        }
    }

    const getAllUnit = async () => {
        try {
            const {data} = await axios.get(`${base_url}/unit/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllUnit(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //  Rooms functions
    const create_room = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/room/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_room = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/room/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getRoomList = async (body) => {
        try {
            setRoomList({...roomList, loading: true})
            const {data} = await axios.post(`${base_url}/room-list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setRoomList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setRoomList({...roomList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setRoomList({...roomList, loading: false})
        }
    }

    const getAllRoom = async () => {
        try {
            const {data} = await axios.get(`${base_url}/room/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllRoom(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    //  Floor functions
    const create_floor = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/floor/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_floor = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/floor/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getFloorList = async (body) => {
        try {
            setFloorList({...floorList, loading: true})
            const {data} = await axios.post(`${base_url}/floor-list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setFloorList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setFloorList({...floorList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setFloorList({...floorList, loading: false})
        }
    }

    const getAllFloor = async () => {
        try {
            const {data} = await axios.get(`${base_url}/floor/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllFloor(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // rack function

    const create_rack = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/rack/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_rack = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/rack/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getRacksList = async (body) => {
        try {
            setRackList({...rackList, loading: true})
            const {data} = await axios.post(`${base_url}/rack-list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setRackList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setRackList({...rackList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setRackList({...rackList, loading: false})
        }
    }

    const create_material = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/bedding-material/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_material = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/bedding-material/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getMaterialList = async () => {
        try {
            setMaterial({...material, loading: true})
            const {data} = await axios.get(`${base_url}/bedding-material/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setMaterial({ loading: false, data: data.data})
            }else {
                setMaterial({...material, loading: false})
            }
        } catch (error) {
            setMaterial({...material, loading: false})
        }
    }

    const create_packing_box = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/packing-box/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const edit_packing_box = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/packing-box/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getPackingBoxList = async () => {
        try {
            setPackingBox({...packingBox, loading: true})
            const {data} = await axios.post(`${base_url}/admin/packing-box/list`, {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setPackingBox({ loading: false, data: data.data})
            }else {
                setPackingBox({...packingBox, loading: false})
            }
        } catch (error) {
            setPackingBox({...packingBox, loading: false})
        }
    }


    const getSmsSettingsList = async () => {
        try {
            setSmsSettingsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/admin/sms-settings/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setSmsSettingsList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setSmsSettingsList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setSmsSettingsList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editSMSSettingsList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/sms-settings/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getSmsSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };



      const getEmailSettingsList = async () => {
        try {
            setEmailSettingsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/admin/email-settings/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setEmailSettingsList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setEmailSettingsList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setEmailSettingsList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editEmailSettingsList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/email-settings/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getEmailSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const getWhatsAppSettingsList = async () => {
        try {
            setWhatsAppSettingsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/admin/whatsapp-settings/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setWhatsAppSettingsList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setWhatsAppSettingsList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setWhatsAppSettingsList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editWhatsAppSettingsList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/whatsapp-settings/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getWhatsAppSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };



      const getNotificationSettingsList = async () => {
        try {
            setNotificationSettingsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/admin/notification-settings/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setNotificationSettingsList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setNotificationSettingsList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setNotificationSettingsList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editNotificationSettingsList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/notification-settings/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getNotificationSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const getPaymentMethodsList = async () => {
        try {
            setPaymentMethodsList({ data: [], loading: true });
          const response = await axios.get(
            `${base_url}/admin/payment-methods/list`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setPaymentMethodsList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setPaymentMethodsList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setPaymentMethodsList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editPaymentMethodsList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/payment-method/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getPaymentMethodsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const deletePaymentMethodsList = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/payment-method/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getPaymentMethodsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const deleteNotificationList = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/notification-settings/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getNotificationSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const deleteWhatsAppList = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/whatsapp-settings/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getWhatsAppSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const deleteSmsNotificationList = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/sms-settings/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getSmsSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const deleteEmailList = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/email-settings/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getEmailSettingsList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const getSettingDetails = async () => {
        try {
            setStoreSetting({...storeSetting, loading: true})
          const response = await axios.get(
            `${base_url}/admin/store/setting/details`,
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setStoreSetting({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setStoreSetting({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setStoreSetting({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const edit_store_setting = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/store/setting/update`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getSettingDetails()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };
      
      const AddShipping_agency = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/shipping-agency/add`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getShippingAgencyList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };
      

      const getShippingAgencyList = async () => {
        try {
            setShippingAgencyList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/admin/shipping-agency/list`,{},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setShippingAgencyList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setShippingAgencyList({ data: [], loading: false });
            toast.error(response?.data?.message)
          }
        } catch (error) {
            setShippingAgencyList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editShippingAgencyList = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/shipping-agency/edit/${id}`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getShippingAgencyList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const deleteShippingAgency = async (id) => {
        try {
          const response = await axios.delete(
            `${base_url}/admin/shipping-agency/delete/${id}`,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getShippingAgencyList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const getStateList = async () => {
        try {
          const response = await axios.post(
            `${base_url}/admin/states/list`,{},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setstateList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setstateList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
          setstateList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Server error");
        }
      };

      const addState = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/state/add`,
            formDataToSend,
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getStateList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };
    

      const editState = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/state/edit/${id}`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getStateList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const StateDelete = async (id) => { 
        try {
          const response = await axios.delete(
            `${base_url}/admin/state/delete/${id}`,
            { headers: { Authorization: Authtoken } }
          );
          
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getStateList(); 
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      }

      const getdistrictList = async (dataTosend) => {
        try {
          setdistrictList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/admin/state/district/list`,{...dataTosend},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setdistrictList({
              data: response?.data?.data || [],
              total: response?.data?.total,
              loading: false,
            });
          } else {
            setdistrictList({ data: [],total:'', loading: false });
            toast.error(response?.data?.message);
          }
        } catch (error) {
          setdistrictList({ data: [], loading: false });
          toast.error(error.response?.data?.message || 'Server error');
        }
      };



      const addDistrict = async (formDataToSend) => {
        try {
          const { state_id} = formDataToSend
          const response = await axios.post(
            `${base_url}/admin/district/add`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getdistrictList(state_id)
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };
    
      const editDistrict = async (formDataToSend) => {
        try {
          const { state_id ,district_id} = formDataToSend
          const response = await axios.post(
            `${base_url}/admin/district/edit/${district_id}`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getdistrictList(state_id)
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };


      const DistrictDelete = async (dataToDelete) => { 
        try {
          const { district_id,state_id } = dataToDelete;
          const response = await axios.delete(
            `${base_url}/admin/district/delete/${district_id}`,
            { headers: { Authorization: Authtoken } }
          );
          
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getdistrictList(state_id); 
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      }


      const getOrgTypeList = async () => {
        try {
          setOrgTypeList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/admin/org-type/list`,{},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setOrgTypeList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setOrgTypeList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
          setOrgTypeList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Server error");
        }
      };

      const addOrgType = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/org-type/add`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getOrgTypeList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const editOrgType = async (id,formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/org-type/update/${id}`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getOrgTypeList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

      const deleteOrgType = async (id) => { 
        try {
          const response = await axios.delete(
            `${base_url}/org-type/delete/${id}`,
            { headers: { Authorization: Authtoken } }
          );
          
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getOrgTypeList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      }

      const getAllOrgTypeList = async () => {
        try {
          const response = await axios.post(
            `${base_url}/org-type/list`,{},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setallOrgTypeList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setallOrgTypeList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
          setallOrgTypeList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Server error");
        }
      };


      const getOrgList = async () => {
        try {
          setOrgList({ data: [], loading: true });
          const response = await axios.post(
            `${base_url}/admin/organization/list`,{},
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setOrgList({
              data: response?.data?.data || [],
              loading: false,
            });
          } else {
            setOrgList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
          setOrgList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Server error");
        }
      };

      const addOrg = async (formDataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/admin/organization/add`,
            {...formDataToSend},
            {
              headers: {
                Authorization: Authtoken,
              },
            }
          );
          if (response.status === 200) {
            toast.success(response?.data?.message);
            getOrgList()
          } else {
            toast.error(response?.data?.message)
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error.response?.data?.message || 'Server error');
        }
      };

     
    

    const values = {
        create_unit, edit_unit, unitList, getUnitList, allUnit, getAllUnit, create_room, edit_room, roomList, getRoomList, getAllRoom, allRoom, create_floor, edit_floor, getFloorList, floorList, getAllFloor, allFloor, getRacksList, rackList, edit_rack, create_rack, create_material, edit_material, getMaterialList, material, getPackingBoxList, create_packing_box, edit_packing_box, packingBox,getSmsSettingsList,smsSettingsList,editSMSSettingsList,getEmailSettingsList,editEmailSettingsList,emailSettingsList,getWhatsAppSettingsList,whatsAppSettingsList,editWhatsAppSettingsList,getNotificationSettingsList,editNotificationSettingsList,notificationSettingsList,getPaymentMethodsList,paymentMethodsList, editPaymentMethodsList,deletePaymentMethodsList,deleteNotificationList,deleteWhatsAppList,deleteSmsNotificationList,deleteEmailList,getSettingDetails,storeSetting, edit_store_setting,getShippingAgencyList,ShippingAgencyList,AddShipping_agency,editShippingAgencyList,deleteShippingAgency,getStateList,stateList,addState,editState,StateDelete,addDistrict,editDistrict,getdistrictList,districtList,DistrictDelete,getOrgTypeList,orgTypeList,addOrgType,editOrgType,deleteOrgType,getAllOrgTypeList,allorgtypeList,addOrg,getOrgList,orgList
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useMasterContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};
