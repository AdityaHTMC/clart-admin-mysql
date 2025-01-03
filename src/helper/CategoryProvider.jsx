/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

const AppContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState({ loading: true, data: [] })
  const [subcategory, setSubCategory] = useState([{ loading: true, data: [] }])
  const [productList, setProductList] = useState({ total_page: 1, current_page: 1, loading: true, data: [] })
  const [prouctDetails, setProuctDetails] = useState({})
  const [BannerList, setBannerList] = useState({ data: [], loading: true })
  const [FaqList, setFaqList] = useState({ loading: true, data: [] })
  const AuthToken = localStorage.getItem('Authtoken')
  // console.log(AuthToken)
  const base_url = import.meta.env.VITE_API_URL

  const create_category = async (data) => {
    try {
      const response = await axios.post(`${base_url}/service/category/add`, data, { headers: { 'Authorization': AuthToken } });
      return response.data
    } catch (error) {
      return error?.response?.data || null
    }
  }

  const getCategoryList = async (data) => {
    try {
      setCategory({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/admin/category/list`, {},
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
      // toast.error('An error occurred while fetching the Category');
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
        `${base_url}/category/add`,
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
      const response = await axios.get(
        `${base_url}/category/delete/${id}`,
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

  const getproductList = async (body) => {
    try {
      setProductList({ ...productList, loading: true })
      const { data } = await axios.post(`${base_url}/admin/species-list`, body || {}, {
        headers: {
          'Authorization': AuthToken
        }
      })
      if (data.success) {
        setProductList({ loading: false, data: data.data, total_page: data.pages, current_page: data.page })
      } else {
        setProductList({ ...productList, loading: false })
        console.error(data.message)
      }
    } catch (error) {
      setProductList({ ...productList, loading: false })
    }
  }


  const getproductDetails = async (id) => {
    try {
      const response = await axios.get(
        `${base_url}/admin/species/details/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      const data = response.data;
      if (data.success) {
        setProuctDetails(data.data);
      } else {
        setProuctDetails(null);
        toast.error(res.message);
      }
      return data
    } catch (error) {
      toast.error("An error occurent while fetching product detail")
    }
  };


  const addProduct = async (formDataToSend) => {
    try {
      const { data } = await axios.post(`${base_url}/species/add`, formDataToSend, { headers: { Authorization: AuthToken, 'Content-Type': 'multipart/form-data' } });
      return data
    } catch (error) {
      console.error("Error adding Product:", error);
      return error?.response?.data || null
    }
  };

  const editProduct = async (id, formData) => {
    try {
      const response = await axios.put(
        `${base_url}/admin/species/update/${id}`,
        formData,
        {
          headers: {
            Authorization: AuthToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      return data
    } catch (error) {
      console.error("Error updating Species:", error);
      return error?.response?.data || null
    }
  };

  const ProductDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${base_url}/species/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );

      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }

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
        toast.error("Failed to fetch varity list");
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
            'Content-Type': 'application/json'
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
      toast.error(error.response?.data?.message || 'Server error');
    }
  }


  const editFaq = async (id,formDataToSend) => {
    try {
      const response = await axios.put(
        `${base_url}/faq/update/${id}`,
        {...formDataToSend},  
        { 
          headers: { 
            Authorization: AuthToken,
            'Content-Type': 'application/json' 
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
      console.error("Error edited FAQ:", error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  };


  const faqDelete = async (id) => { 
    try {
      const response = await axios.delete(
        `${base_url}/faq/delete/${id}`,
        { headers: { Authorization: AuthToken } }
      );
      
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getFaqList(); 
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error('Error deleting Brand:', error);
      toast.error(error.response?.data?.message || 'Server error');
    }
  }


  const values = {
    create_category, getCategoryList, category, getSubCategoryList, subcategory, categoryDelete, addCategory, addProduct, getproductList, productList, getproductDetails, prouctDetails, editProduct, ProductDelete, getBannerList, BannerList, addBanner, bannerDelete, editBranner, switchBranner, getFaqList, FaqList, addFaq,editFaq,faqDelete
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
