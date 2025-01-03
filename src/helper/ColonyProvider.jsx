/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const ColonyProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [colonyList, setColonyList] = useState({total_page: 1, current_page: 1, loading: true, data: []})
    const [allSpecies, setAllSpecies] = useState([])
    const [allBreeds, setAllBreeds] = useState([])
    const { Authtoken } = useAuthContext()
    const [colonyData, setColonyData] = useState({loading: false, data: []})

    const getColonyList = async (body) => {
        try {
            setColonyList({ ...colonyList, loading: true })
            const { data } = await axios.post(`${base_url}/colony-list`, body || {}, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.success) {
                setColonyList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page })
            } else {
                setColonyList({ ...colonyList, loading: false })
                console.error(data.message)
            }
        } catch (error) {
            setColonyList({ ...colonyList, loading: false })
        }
    }

    const newStockEntry = async (id, body) => {
        try {
            const { data }  = await axios.put(`${base_url}/colony/new-entry/${id}`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const getAllSpecies = async (body) => {
        try {
            const { data }  = await axios.get(`${base_url}/species/getAll`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllSpecies(data.data)
            }
        } catch (error) {
            // return error?.response?.data || null
        }
    }
    const getAllBreeds = async (body) => {
        try {
            const { data }  = await axios.get(`${base_url}/admin/all/breeds/list`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setAllBreeds(data.data)
            }
        } catch (error) {
            // return error?.response?.data || null
        }
    }

    const newBirthEntry = async (id, body) => {
        try {
            const { data }  = await axios.put(`${base_url}/colony/birth-entry/${id}`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }
    
    const removeColonyItem = async (id, body) => {
        try {
            const { data }  = await axios.put(`${base_url}/colony/remove/${id}`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const removeBirthItem = async (id, body) => {
        try {
            const { data }  = await axios.put(`${base_url}/colony/birth-remove/${id}`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const searchColony = async (search) => {
        try {
            setColonyData({...colonyData, loading: true })
            const { data }  = await axios.get(`${base_url}/colony/search?keyword_search=${search}`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if(data.success){
                setColonyData({ loading: false, data: data.data })
            }else{
                setColonyData({data: [], loading: false })
            }
        } catch (error) {
            setColonyData({data: [], loading: false })
            return error?.response?.data || null
        }
    }

    const transferItem = async (body) => {
        try {
            const { data }  = await axios.post(`${base_url}/colony/transfer-entry`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }
    
    const birthTransferItem = async (body) => {
        try {
            const { data }  = await axios.post(`${base_url}/colony/birth/transfer-entry`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }
    

    const values = {
        getColonyList, colonyList, newStockEntry, getAllSpecies, allSpecies, newBirthEntry, removeColonyItem, removeBirthItem, transferItem, colonyData, searchColony, birthTransferItem, getAllBreeds, allBreeds
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export const useColonyContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('error');
    }
    return context
};
