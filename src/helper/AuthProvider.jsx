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


    useEffect(() => {
        if((!initialLoading && !Authtoken)){
            navigate('/login')
        }
        if(initialLoading && !user && Authtoken){
            validate_admin()
        }       
    }, [initialLoading, user, Authtoken])

    const values = {
        Authtoken, user, admin_login, validate_admin, initialLoading, logout, API_ERROR
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
