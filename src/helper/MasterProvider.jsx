/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { toast } from "react-toastify";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const MasterProvider = ({ children }) => {

  const base_url = import.meta.env.VITE_API_URL

  const [unitList, setUnitList] = useState({ total_page: 1, current_page: 1, loading: true, data: [] })
  const [allUnit, setAllUnit] = useState([])
  const [roomList, setRoomList] = useState({ total_page: 1, current_page: 1, loading: true, data: [] })
  const [allRoom, setAllRoom] = useState([])
  const [floorList, setFloorList] =  useState({ loading: true, data: [], total: "", })
  const [allFloor, setAllFloor] = useState([])
  
  const [material, setMaterial] = useState({ loading: true, data: [] })
  const [packingBox, setPackingBox] = useState({ loading: true, data: [] })
  const [smsSettingsList, setSmsSettingsList] = useState({ loading: true, data: [], total: "" });
  const [emailSettingsList, setEmailSettingsList] = useState({ loading: true, data: [], total: "" });
  const [whatsAppSettingsList, setWhatsAppSettingsList] = useState({ loading: true, data: [], total: "" });
  const [notificationSettingsList, setNotificationSettingsList] = useState({ loading: true, data: [], total: "" });
  const [ShippingAgencyList, setShippingAgencyList] = useState({ loading: true, data: [], total: "" });
  const [paymentMethodsList, setPaymentMethodsList] = useState({ loading: true, data: [], total: "" });
  const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })
  const [stateList, setstateList] = useState({ loading: true, data: [], total: "" });
  const [orgTypeList, setOrgTypeList] = useState({ loading: true, data: [], total: "" });
  const [orgList, setOrgList] = useState({ loading: true, data: [], total: "" });
  const [allorgtypeList, setallOrgTypeList] = useState({ loading: true, data: [], total: "" });
  const [districtList, setdistrictList] = useState({ loading: true, data: [], total: "" });
  const [cityList, setcityList] = useState({ loading: true, data: [], total: "" });
  const [speciesMasterList, setSpeciesMasterList] = useState({ loading: true, data: [], total: "" });
  const [orderMasterList, setorderMasterList] = useState({ loading: true, data: [], total: "" });
  const [allspecies, setallspecies] = useState({ loading: true, data: [] });
  const [vendorList, setVendorList] = useState({ loading: true, data: [], total: "", });
  const [rackList, setRackList] = useState({ loading: true, data: [], total: "", });
  const [roleList, setRoleList] = useState({ loading: true, data: [], total: "" });
  const [permissionList, setPermissionList] = useState({ loading: true, data: [], total: "" });
  const [userMagList, setUserMagList] = useState({ loading: true, data: [], total: "" });
  const [allShippingAgency, setAllShippingAgency] = useState({ loading: true, data: []});
  const [shippingAgency, setShippingAgency] = useState({ loading: true, data: [], total: "" });
  const [dropdownRoleList, setdropdownRoleList] = useState({ loading: true, data: [] });
  const [dropdownMenuList, setdropdownMenuList] = useState({ loading: true, data: [] });

  const { Authtoken } = useAuthContext()

  //  Unit fucntions




  const create_unit = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/unit/add`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const edit_unit = async (id, body) => {
    try {
      const { data } = await axios.put(`${base_url}/unit/update/${id}`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getUnitList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/unit-list`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUnitList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setUnitList({ data: [], loading: false });
        toast.error(response.data.message);
      }
    } catch (error) {
      setUnitList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllUnit = async () => {
    try {
      const { data } = await axios.get(`${base_url}/unit/getAll`, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setAllUnit(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //  Rooms functions

  const create_room = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/room/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getRoomList()
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };




  const edit_room = async (dataToSend) => {
    try {
      const { id } = dataToSend;
      const response = await axios.put(
        `${base_url}/room/update/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getRoomList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getRoomList = async (body) => {
    try {
      setRoomList({ ...roomList, loading: true })
      const { data } = await axios.post(`${base_url}/room-list`, body || {}, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setRoomList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page })
      } else {
        setRoomList({ ...roomList, loading: false })
        console.error(data.message)
      }
    } catch (error) {
      setRoomList({ ...roomList, loading: false })
    }
  }

  const getAllRoom = async () => {
    try {
      const { data } = await axios.get(`${base_url}/room/getAll`, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setAllRoom(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  //  Floor functions

  const create_floor = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/floor/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getFloorList()
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };



  const edit_floor = async (id, body) => {
    try {
      const { data } = await axios.put(`${base_url}/floor/update/${id}`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getFloorList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/floor-list`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setFloorList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setFloorList({ data: [], loading: false });
        toast.error(response.data.message);
      }
    } catch (error) {
      setFloorList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getAllFloor = async () => {
    try {
      const { data } = await axios.get(`${base_url}/floor/getAll`, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setAllFloor(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // rack function

  const create_rack = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/rack/add`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const edit_rack = async (id, body) => {
    try {
      const { data } = await axios.put(`${base_url}/rack/update/${id}`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getRacksList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/rack-list`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setRackList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setRackList({ data: [], loading: false });
        toast.error(response.data.message);
      }
    } catch (error) {
      setRackList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const create_material = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/bedding-material/add`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const edit_material = async (id, body) => {
    try {
      const { data } = await axios.put(`${base_url}/bedding-material/update/${id}`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getMaterialList = async () => {
    try {
      setMaterial({ ...material, loading: true })
      const { data } = await axios.get(`${base_url}/bedding-material/getAll`, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setMaterial({ loading: false, data: data.data })
      } else {
        setMaterial({ ...material, loading: false })
      }
    } catch (error) {
      setMaterial({ ...material, loading: false })
    }
  }

  const create_packing_box = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/packing-box/add`, body, { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }


  const edit_packing_box = async (id, formData) => {
    try {
      const response = await axios.put(
        `${base_url}/packing-box/update/${id}`,
        formData,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getPackingBoxList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      return error?.response?.data || null
    }
  };

  const getPackingBoxList = async () => {
    try {
      setPackingBox({ ...packingBox, loading: true })
      const { data } = await axios.post(`${base_url}/admin/packing-box/list`, {}, {
        headers: {
          'Authorization': Authtoken
        }
      })
      if (data.success) {
        setPackingBox({ loading: false, data: data.data })
      } else {
        setPackingBox({ ...packingBox, loading: false })
      }
    } catch (error) {
      setPackingBox({ ...packingBox, loading: false })
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

  const editSMSSettingsList = async (id, formDataToSend) => {
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

  const editEmailSettingsList = async (id, formDataToSend) => {
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
        // toast.error(response?.data?.message)
      }
    } catch (error) {
      setWhatsAppSettingsList({ data: [], loading: false });
      // toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const editWhatsAppSettingsList = async (id, formDataToSend) => {
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

  const editNotificationSettingsList = async (id, formDataToSend) => {
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

      }
    } catch (error) {
      setPaymentMethodsList({ data: [], loading: false });

    }
  };

  const editPaymentMethodsList = async (id, formDataToSend) => {
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
      setStoreSetting({ ...storeSetting, loading: true })
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
        `${base_url}/admin/shipping-agency/list`, {},
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

  const editShippingAgencyList = async (id, formDataToSend) => {
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
        `${base_url}/admin/states/list`, {},
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


  const editState = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/state/edit/${id}`,
        { ...formDataToSend },
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
        `${base_url}/admin/state/district/list`, { ...dataTosend },
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
        setdistrictList({ data: [], total: '', loading: false });
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setdistrictList({ data: [], loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };



  const addDistrict = async (formDataToSend) => {
    try {
      const { state_id } = formDataToSend
      const response = await axios.post(
        `${base_url}/admin/district/add`,
        { ...formDataToSend },
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
      const { state_id, district_id } = formDataToSend
      const response = await axios.post(
        `${base_url}/admin/district/edit/${district_id}`,
        { ...formDataToSend },
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
      const { district_id, state_id } = dataToDelete;
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
        `${base_url}/admin/org-type/list`, {},
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
        { ...formDataToSend },
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

  const editOrgType = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/org-type/update/${id}`,
        { ...formDataToSend },
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
        `${base_url}/org-type/list`, {},
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
        `${base_url}/admin/organization/list`, {},
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
        formDataToSend,
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


  const editOrg = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/organization/edit/${id}`,
        formDataToSend,
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


  const deleteOrg = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/organization/delete/${id}`,
        { headers: { Authorization: Authtoken } }
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
  }




  const getCityList = async (dataTosend) => {
    try {
      setcityList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/city/list`, { ...dataTosend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setcityList({
          data: response?.data?.data || [],
          total: response?.data?.total,
          loading: false,
        });
      } else {
        setcityList({ data: [], total: '', loading: false });
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setcityList({ data: [], loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };



  const addCity = async (dataToSend) => {
    try {
      const { state_id } = dataToSend
      const response = await axios.post(
        `${base_url}/city/add`,
        { ...dataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        const dataToSend = {
          state_id: state_id
        }
        getCityList(dataToSend)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const editCity = async (formDataToSend) => {
    try {
      const { state_id, city_id } = formDataToSend
      const response = await axios.put(
        `${base_url}/city/update/${city_id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        const dataToSend = {
          state_id: state_id
        }
        getCityList(dataToSend)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const cityDelete = async (dataToDelete) => {
    try {
      const { city_id, state_id } = dataToDelete;
      const response = await axios.delete(
        `${base_url}/admin/city/delete/${city_id}`,
        { headers: { Authorization: Authtoken } }
      );

      if (response.status === 200) {
        toast.success(response?.data?.message);
        const dataToSend = {
          state_id: state_id
        }
        getCityList(dataToSend);
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  }



  const getSpeciesMasterList = async (dataToSend) => {
    try {
      setSpeciesMasterList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/species-list`, { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setSpeciesMasterList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setSpeciesMasterList({ data: [], loading: false });
      }
    } catch (error) {
      setSpeciesMasterList({ data: [], loading: false });
    }
  };

  const getAllSpeciesList = async () => {
    try {
      const response = await axios.get(
        `${base_url}/admin/species/getAll`,
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallspecies({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallspecies({ data: [], loading: false });

      }
    } catch (error) {
      setallspecies({ data: [], loading: false });
    }
  };

  const addSpeciesMasterList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/species/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesMasterList()
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.success(error.response?.data?.message);
    }
  };


  const editSpeciesMasterList = async (id, dataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/admin/species/update/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getSpeciesMasterList()
      } else {
        toast.error("server errors");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteSpecies = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/species/delete/${id}`,

        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getSpeciesMasterList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const getOrderMasterList = async () => {
    try {
      const response = await axios.get(
        `${base_url}/order/status/list`,
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setorderMasterList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setorderMasterList({ data: [], loading: false });

      }
    } catch (error) {
      setorderMasterList({ data: [], loading: false });
    }
  };


  const addOrderMasterList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/order/status/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getOrderMasterList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };


  const editOrderStatus = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/order/status/edit/${id}`,
        dataToSend,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getOrderMasterList()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getvendorList = async (dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendors/list`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setVendorList({
          data: response?.data?.data || [],
          total: response.data.total,
          loading: false,
        });
      } else {
        setVendorList({ data: [], loading: false });
        toast.error(response.data.message);
      }
    } catch (error) {
      setVendorList({ data: [], loading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const addVendor = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendor/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editVendor = async (id, formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/vendor/update/${id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const deletevendor = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/vendor/delete/${id}`,
        { headers: { Authorization: Authtoken } }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success(response.data.message);
        getvendorList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  /** Role */
  const getRoleList = async () => {
    try {
      setRoleList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/all/admin/roles/list`,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setRoleList({ data: response?.data?.data || [], total: response.data.total, loading: false });
      } else {
        setRoleList({ data: [], total: '', loading: false });
      }
    } catch (error) {
      setRoleList({ data: [], loading: false });
    }
  };


  const addRole = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/role/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getRoleList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const editRoleList = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/role/update/${id}`,
        { ...dataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getRoleList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  /** Permission */
  const getDropDownRoleList = async () => {
    try {
      setdropdownRoleList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/role/list`,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setdropdownRoleList({ data: response?.data?.data || [], loading: false });
      } else {
        setdropdownRoleList({ data: [], loading: false });
      }
    } catch (error) {
      setdropdownRoleList({ data: [], loading: false });
    }
  };


  const getDropDownMenuList = async () => {
    try {
      setdropdownMenuList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/menu/list`,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setdropdownMenuList({ data: response?.data?.data || [], loading: false });
      } else {
        setdropdownMenuList({ data: [], loading: false });
      }
    } catch (error) {
      setdropdownMenuList({ data: [], loading: false });
    }
  };


  const getpermissionList = async (dataToSend) => {
    try {
      setPermissionList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/permission/list`, { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setPermissionList({ data: response?.data?.data || [], total: response.data.total, loading: false });
      } else {
        setPermissionList({ data: [], total: '', loading: false });
      }
    } catch (error) {
      setPermissionList({ data: [], loading: false });
    }
  };


  const addPermission = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/permission/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  const editpermissionList = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/permission/edit/${id}`,
        { ...dataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const Deletepermission = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/permission/delete/${id}`,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getpermissionList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  /** User management */
  const getUserMagList = async (dataToSend) => {
    try {
      setUserMagList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/sub-admin/list`, { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setUserMagList({ data: response?.data?.data || [], total: response.data.total, loading: false });
      } else {
        setUserMagList({ data: [], total: '', loading: false });
      }
    } catch (error) {
      setUserMagList({ data: [], loading: false });
    }
  };

  const addUserManagement = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-admin/add`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const editUserMagList = async (id, dataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-admin/update/${id}`,
        { ...dataToSend },
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const DeleteUserMag = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/sub-admin/delete/${id}`,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getUserMagList()
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  const getAllShippingAgency = async () => {
    try {
      setAllShippingAgency({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/shipping-agency/getAll`, 
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setAllShippingAgency({ data: response?.data?.data || [], loading: false });
      } else {
        setAllShippingAgency({ data: [], total: '', loading: false });
      }
    } catch (error) {
      setAllShippingAgency({ data: [], loading: false });
    }
  };





  const values = {
    create_unit, edit_unit, unitList, getUnitList, allUnit, getAllUnit, create_room, edit_room, roomList, getRoomList, getAllRoom, allRoom, create_floor, edit_floor, getFloorList, floorList, getAllFloor, allFloor, getRacksList, rackList, edit_rack, create_rack, create_material, edit_material, getMaterialList, material, getPackingBoxList, create_packing_box, edit_packing_box, packingBox, getSmsSettingsList, smsSettingsList, editSMSSettingsList, getEmailSettingsList, editEmailSettingsList, emailSettingsList, getWhatsAppSettingsList, whatsAppSettingsList, editWhatsAppSettingsList, getNotificationSettingsList, editNotificationSettingsList, notificationSettingsList, getPaymentMethodsList, paymentMethodsList, editPaymentMethodsList, deletePaymentMethodsList, deleteNotificationList, deleteWhatsAppList, deleteSmsNotificationList, deleteEmailList, getSettingDetails, storeSetting, edit_store_setting, getShippingAgencyList, ShippingAgencyList, AddShipping_agency, editShippingAgencyList, deleteShippingAgency, getStateList, stateList, addState, editState, StateDelete, addDistrict, editDistrict, getdistrictList, districtList, DistrictDelete, getOrgTypeList, orgTypeList, addOrgType, editOrgType, deleteOrgType, getAllOrgTypeList, allorgtypeList, addOrg, getOrgList, orgList, editOrg, deleteOrg, getCityList, cityList, addCity, editCity, cityDelete, getSpeciesMasterList, speciesMasterList, addSpeciesMasterList, editSpeciesMasterList, DeleteSpecies, getOrderMasterList, orderMasterList, addOrderMasterList, editOrderStatus, getAllSpeciesList, allspecies, getvendorList, addVendor, editVendor, deletevendor, vendorList,
    getDropDownRoleList, dropdownRoleList, getDropDownMenuList, dropdownMenuList, getpermissionList, permissionList, addPermission, editpermissionList, Deletepermission, getRoleList, roleList, addRole, editRoleList, getUserMagList,userMagList,addUserManagement,editUserMagList,DeleteUserMag,getAllShippingAgency,allShippingAgency,
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
