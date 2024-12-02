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
    const [userList, setUserList] = useState({ loading: true, data: [] })
    const [orderList, setOrderList] = useState({ loading: true, data: [] })
    const [orderDetails, setOrderDetails] = useState({ loading: true, data: [] })
    const [promoCode, setPromoCode] = useState({ loading: true, data: [] })
    const [eventList, setEventList] = useState({ loading: true, data: [] })
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
            const response = await axios.post(`${base_url}/admin/users/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setUserList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setUserList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
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
                toast.success('status updated successfully');
                getUserList();  // Refresh the brand list after success
            } else {
                toast.error('Failed to update the status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('An error occurred while updating the status');
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
            const response = await axios.post(`${base_url}/admin/event/list`, {}, { headers: { 'Authorization': Authtoken } });
            if (response.status === 200) {
                setEventList({ data: response?.data?.data || [], loading: false })
            } else {
                toast.error(response?.data?.message)
                setEventList({ data: [], loading: false })
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Server error');
            setEventList({ data: [], loading: false })
        }
    }


    const addEvent = async (formDataToSend) => {
        try {
            const response = await axios.post(
                `${base_url}/admin/event/add`,
                formDataToSend,
                {
                    headers: {
                        'Authorization': Authtoken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.status === 200) {
                toast.success('Event added successfully');
                navigate('/event-list')
            } else {
                toast.error("Failed to add Event");
            }
        } catch (error) {
            console.error("Error adding Event:", error);
            toast.error("An error occurred while adding the Event");
        }
    };


    const eventDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${base_url}/admin/event/delete/${id}`,
                { headers: { 'Authorization': Authtoken } }
            );

            if (response.status === 200) {
                toast.success('Event deleted successfully');
                getEventList();
            } else {
                toast.error('Failed to delete Event');
            }
        } catch (error) {
            console.error('Error deleting Event:', error);
            toast.error('An error occurred while deleting the Event');
        }
    }



    const values = {
        getMenuList, menuList, countryList, getCountryList, getStateList, stateList, getCityList, cityList,
        getSmsSetting, smsData, SmsUpdateSetting, getEmailSubscribeList, mailList, getUserList, userList, switchUser, getOrderList, orderList, getOrderDetails, orderDetails, promoCode, getPromoCodeList, addPromoCode, addEvent, eventDelete, getEventList, eventList
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