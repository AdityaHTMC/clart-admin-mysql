/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const SettingProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })
    const [storeMenu, setStoreMenu] = useState({ loading: true, data: [] })

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

    const values = {
        getSettingDetails, storeSetting, edit_store_setting, getStoreMenu, storeMenu, reorderStoreMenu, reorderStoreSubMenu
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
