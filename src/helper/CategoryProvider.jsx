/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const CategoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({ loading: true, data: [] })
  const [subcategory, setSubCategory] = useState([{ loading: true, data: [] }])
  const [productList, setProductList] = useState({loading: true,data: [],total: ""})
  const [allproductList, setallProductList] = useState({loading: true,data: []})
  const [prouctDetails, setProuctDetails] = useState({})
  const [BannerList, setBannerList] = useState({ data: [], loading: true })
  const [FaqList, setFaqList] = useState({ loading: true, data: [] })
  const AuthToken = localStorage.getItem('Authtoken')
  // console.log(AuthToken)
  const base_url = import.meta.env.VITE_API_URL

  const create_category = async (data) => {
    try {
      const response = await axios.post(`${base_url}/species/add`, data, { headers: { 'Authorization': AuthToken } });
      return response.data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getCategoryList = async (data) => {
    try {
      setCategory({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/species-list`, {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setCategory({ data: response?.data?.data || [], loading: false });
      } else {
        setCategory({ ...category, loading: false });

        toast.error('Failed to fetch category list');
      }
    } catch (error) {
      console.error('Error category List:', error);
      setCategory({ ...category, loading: false });
    }
  }

  const getSubCategoryList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-categories/list`, { parentId: data },
        { headers: { Authorization: AuthToken } }
      );
      // const data = response.data;
      if (response.status === 200) {
        setSubCategory({ data: response?.data?.data || [], loading: false });
      } else {
        setSubCategory({ ...subcategory, loading: false });

        toast.error('Failed to fetch subcategory list');
      }
    } catch (error) {
      console.error('Error subcategory List:', error);
      // toast.error('An error occurred while fetching the Category');
    }
  }

  const addCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/species/add`,
        formDataToSend,  // Pass FormData directly without spreading
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200) {
        toast.success('Category added successfully');
        getCategoryList();
      } else {
        toast.error("Failed to add Category");
      }
    } catch (error) {
      console.error("Error adding Category:", error);
      toast.error("An error occurred while adding the Category");
    }
  };

  const categoryDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/admin/species/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );

      if (response.status === 200) {
        toast.success('category deleted successfully');
        getCategoryList();
      } else {
        toast.error('Failed to category category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('An error occurred while deleting the category');
    }
  }


  const getproductList = async (dataToSend) => {
    try {
      setProductList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/breed/list`,dataToSend,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setProductList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setProductList({ data: [], loading: false });

      }
    } catch (error) {
      setProductList({ data: [], loading: false });
    }
  };

  const getproductDetails = async (id) => {
    try {
      const response = await axios.get(
        `${base_url}/admin/breed/details/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setProuctDetails(data);
      } else {
        setProuctDetails(null);
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  



  const addProduct = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/animal-list')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editProduct = async (id, formData) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/breed/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate('/animal-list')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      return error?.response?.data || null
    }
  };

  const ProductDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/admin/breed/delete/${id}`,
        { headers: { 'Authorization': AuthToken }}
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message)
        getproductList(); 
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }


  const getallproductList = async () => {
    try {
      setallProductList({ data: [], loading: true });
      const response = await axios.get(
        `${base_url}/admin/all/breeds/list`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setallProductList({
          data: response?.data?.data || [],
          loading: false,
        });
      } else {
        setallProductList({ data: [], loading: false });

      }
    } catch (error) {
      setallProductList({ data: [], loading: false });
    }
  };


  const getBannerList = async (data) => {
    try {
      setBannerList({ ...BannerList, loading: true })
      const response = await axios.post(
        `${base_url}/admin/banner/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setBannerList({ data: data.data, loading: false });
      } else {
        setBannerList({ data: [], loading: false });
        toast.error("Failed to fetch banner list");
      }
    } catch (error) {
      setBannerList({ data: [], loading: false });
    }
  };

  const addBanner = async (formDataToSend) => {
    try {
      const {data} = await axios.post(
        `${base_url}/banner/add`,
        formDataToSend,  // Pass FormData directly without spreading
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'multipart/form-data'  // Set correct content type for FormData
          }
        }
      );
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  };

  const editBranner = async (id, formData) => {
    try {
      const response = await axios.post(
        `${base_url}/banner/update/${id}`,
        formData,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data", // Set this for FormData
          },
        }
      );
      const data = response.data;
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  };

  const switchBranner = async (id, newStatus) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/banner/status/update/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: AuthToken,
            'Content-Type': 'application/json'
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('status updated successfully');
        getBannerList();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating the status');
    }
  };


  const bannerDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/banner/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );

      if (response.status === 200) {
        toast.success('Banner deleted successfully');
        getBannerList();
      } else {
        toast.error('Failed to delete Banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('An error occurred while deleting the Banner');
    }
  }

  // eslint-disable-next-line no-unused-vars
  const getFaqList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/faq/list`,
        {},
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (response.status === 200) {
        setFaqList({ data: response?.data?.data || [], loading: false });
      } else {
        setFaqList({ ...FaqList, loading: false });
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setFaqList({ ...FaqList, loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const addFaq = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/faq/add`,
        formDataToSend,
        {
          headers: {
            Authorization: AuthToken,
          }
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getFaqList();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast.error("An error occurred while adding the FAQ ");
    }
  }

  const editCategory = async (id, body) => {
    try {
      const {data} = await axios.put(`${base_url}/admin/species/update/${id}`, body, {
        headers: {
          'Authorization': AuthToken
        }
      });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

const editFaq = async (id, formDataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/faq/update/${id}`,
        { ...formDataToSend },
        {
          headers: {
            Authorization: AuthToken,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getFaqList();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error edited FAQ:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  const faqDelete = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/faq/delete/${id}`, {
        headers: { Authorization: AuthToken },
      });

      if (response.status === 200) {
        toast.success(response?.data?.message);
        getFaqList();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting Brand:", error);
      toast.error(error.response?.data?.message || "Server error");
    }
  }


  const values = {
    create_category, getCategoryList, category, getSubCategoryList, subcategory, categoryDelete, addCategory, addProduct, getproductList, productList, getproductDetails, prouctDetails, editProduct, ProductDelete, getBannerList, BannerList, addBanner, bannerDelete, editBranner, switchBranner, getFaqList, FaqList, addFaq,editFaq,faqDelete , editCategory,getallproductList,allproductList
  }
  return (
    <AppContext.Provider value={values}>
      {children}
    </AppContext.Provider>
  );
};

export const useCategoryContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('error');
  }
  return context
};
