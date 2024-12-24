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

      
      
    

    const values = {
        create_unit, edit_unit, unitList, getUnitList, allUnit, getAllUnit, create_room, edit_room, roomList, getRoomList, getAllRoom, allRoom, create_floor, edit_floor, getFloorList, floorList, getAllFloor, allFloor, getRacksList, rackList, edit_rack, create_rack, create_material, edit_material, getMaterialList, material, getPackingBoxList, create_packing_box, edit_packing_box, packingBox,getSmsSettingsList,smsSettingsList,editSMSSettingsList,getEmailSettingsList,editEmailSettingsList,emailSettingsList
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
