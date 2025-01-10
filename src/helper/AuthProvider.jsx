import axios from 'axios';
import  { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL

    const [user, setUser] = useState(null);
    const [Authtoken, setAuthtoken] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [subAdminList, setSubAdminList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [rolesList, setRolesList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [permissionList, setPermissionList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allRoles, setAllRoles] = useState([]);
    const [allPermission, setAllPermission] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const tk = localStorage.getItem('Authtoken')
        if(tk){
            setAuthtoken(tk)
        }else{
            setAuthtoken(null)
            setInitialLoading(false)
            navigate('/login')
        }
    }, [])

    const API_ERROR = (err) => {
        if(err?.response?.status === 401){
            toast.error('Session expired, please login again')
            localStorage.removeItem('Authtoken')
            setAuthtoken(null)
            setUser(null)
            window.location.reload()
        }else {
            toast.error( err?.response?.data?.message || 'Server error' );
        }
        console.log(err?.response?.data?.message || err?.message || '')
    }


    const admin_login = async (data) => {
        try {
            const response = await axios.post(`${base_url}/admin/login`, data);
            if(response.status === 200) {
                localStorage.setItem('Authtoken', response?.data?.token)
                setAuthtoken(response?.data?.token || null)
                toast.success('Logged in successfully');
                navigate('/', {replace: true})
            }else {
                toast.error(response?.data?.message)
            }
            return
        } catch (error) {
            API_ERROR(error)
            return
        }
    }

    const validate_admin = async () => {
        try {
            const response = await axios.post(`${base_url}/admin/validate`, {}, {
                headers: {
                    'Authorization': `${Authtoken}`
                }
            });
            if(response.status === 200) {
                setUser(response?.data?.user || null)
                if(location.pathname === '/login'){
                    navigate('/', {replace: true})
                }
            }else {
                navigate('/login', {replace: true})
                setAuthtoken(null)
                toast.error(response?.data?.message)
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            navigate('/login', {replace: true})
            setAuthtoken(null)
            toast.error('Server error');
        } finally {
            setInitialLoading(false)
        }
    }

    const logout = () => {
        setAuthtoken(null)
        localStorage.removeItem('Authtoken')
        setUser(null)
        window.location.reload()
    }

    const getSubAdminList = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/sub_admin/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setSubAdminList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setSubAdminList({...subAdminList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setSubAdminList({...subAdminList, loading: false})
        }
    }

    const getPermissionList = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/permissions/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setPermissionList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setPermissionList({...permissionList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            setPermissionList({...permissionList, loading: false})
            API_ERROR(error)
        }
    }

    const getAllPermission = async () => {
        try {
            const {data} = await axios.get(`${base_url}/permissions/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllPermission(data.data)
            }
        } catch (error) {
            API_ERROR(error)
        }
    }

    const create_permission = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/permissions/create`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    const update_permission = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/permissions/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    const getRolesList = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/role/list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setRolesList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page})
            }else{
                setRolesList({...rolesList, loading: false})
                console.error(data.message)
            }
        } catch (error) {
            API_ERROR(error)
            setRolesList({...rolesList, loading: false})
        }
    }

    const create_role = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/role/add`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    const update_role = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/role/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    const role_detail = async (id) => {
        try {
            const {data} = await axios.get(`${base_url}/admin/role/detail/${id}`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    // Roles list all
    const getAllRoles = async () => {
        try {
            const {data} = await axios.get(`${base_url}/role/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllRoles(data.data)
            }
        } catch (error) {
            API_ERROR(error)
        }
    }

    const create_sub_admin = async (body) => {
        try {
            const {data} = await axios.post(`${base_url}/admin/register`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }

    const update_sub_admin = async (id, body) => {
        try {
            const {data} = await axios.put(`${base_url}/sub-admin/update/${id}`, body, { headers: { 'Authorization': Authtoken }});
            return data
        } catch (error) {
            API_ERROR(error)
            return error?.response?.data || null
        }
    }


    useEffect(() => {
        if((!initialLoading && !Authtoken)){
            navigate('/login')
        }
        if(initialLoading && !user && Authtoken){
            validate_admin()
        }       
    }, [initialLoading, user, Authtoken])

    const values = {
        Authtoken, user, admin_login, validate_admin, initialLoading, logout, getSubAdminList, subAdminList, getPermissionList, getAllPermission, allPermission, create_permission, update_permission, permissionList, getRolesList, rolesList, getAllRoles, allRoles, create_role, update_role, create_sub_admin, update_sub_admin, role_detail, API_ERROR
    }
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};
