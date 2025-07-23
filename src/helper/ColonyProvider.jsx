/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useAuthContext } from './AuthProvider';
import { toast } from "react-toastify";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const ColonyProvider = ({ children }) => {

    const base_url = import.meta.env.VITE_API_URL
    const [allSpecies, setAllSpecies] = useState([])
    const [allBreeds, setAllBreeds] = useState([])
    const { Authtoken } = useAuthContext()
    const [colonyData, setColonyData] = useState({ loading: false, data: [] })
    const [colonyList, setColonyList] =  useState({ loading: true, data: [], total: "", })
    const [colonybreedList, setColonybreedList] =  useState({ loading: true, data: [], })
const [colonyHistory, setColonyHistory] = useState({ loading: true, data: [], total: "" })
    const getColonyList = async (dataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/colony-list`,
            { ...dataToSend },
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setColonyList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setColonyList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
            setColonyList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };


      const getColonyBreed = async (dataToSend) => {
        try {
          const response = await axios.post(
            `${base_url}/colony/animal/getAll`,
            { ...dataToSend },
            { headers: { Authorization: Authtoken } }
          );
          const data = response.data;
          if (response.status === 200) {
            setColonybreedList({
              data: response?.data?.data || [],
              total: response.data.total,
              loading: false,
            });
          } else {
            setColonybreedList({ data: [], loading: false });
            toast.error(response.data.message);
          }
        } catch (error) {
            setColonybreedList({ data: [], loading: false });
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      };

    const newStockEntry = async (id, body) => {
        try {
            const { data } = await axios.post(`${base_url}/colony/new-entry/${id}`, body, {
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
            const { data } = await axios.get(`${base_url}/admin/all/breeds/list`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.status === 200) {
                setAllSpecies(data.data)
            }
        } catch (error) {
            // return error?.response?.data || null
        }
    }
    const getAllBreeds = async (body) => {
        try {
            const { data } = await axios.get(`${base_url}/admin/all/breeds/list`, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.success) {
                setAllBreeds(data.data)
            }
        } catch (error) {
            // return error?.response?.data || null
        }
    }

    const newBirthEntry = async (id, body) => {
        try {
            const { data } = await axios.post(`${base_url}/colony/birth-entry/${id}`, body, {
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
            const { data } = await axios.post(`${base_url}/colony/item/remove/${id}`, body, {
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
            const { data } = await axios.post(`${base_url}/colony/birth/item/remove/${id}`, body, {
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
            setColonyData({ ...colonyData, loading: true })
            const { data } = await axios.post(`${base_url}/colony/getAll`, { keyword_search: search }, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.status === 200) {
                setColonyData({ loading: false, data: data.data })
            } else {
                setColonyData({ data: [], loading: false })
            }
        } catch (error) {
            setColonyData({ data: [], loading: false })
            return error?.response?.data || null
        }
    }

    const transferItem = async (body) => {
        try {
            const { data } = await axios.post(`${base_url}/colony/transfer-entry`, body, {
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
            const { data } = await axios.post(`${base_url}/colony/birth/transfer-entry`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            return data
        } catch (error) {
            return error?.response?.data || null
        }
    }
  const getColonyHistory = async (body) => {
        try {
            const { data } = await axios.post(`${base_url}/colony/history`, body, {
                headers: {
                    'Authorization': Authtoken
                }
            })
            if (data.status === 200) {
                setColonyHistory({
                    data: data.data || [],
                    total: data.total,
                    loading: false,
                });
            } else {
                setColonyHistory({ data: [], loading: false });
                toast.error(data.message);
            }
        } catch (error) {
            return error?.response?.data || null
        }
    }

    const values = {
        getColonyList, colonyList, newStockEntry, getAllSpecies, allSpecies, newBirthEntry, removeColonyItem, removeBirthItem, transferItem, colonyData, searchColony, birthTransferItem, getAllBreeds, allBreeds,getColonyBreed,colonybreedList,getColonyHistory, colonyHistory, setColonyHistory
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
