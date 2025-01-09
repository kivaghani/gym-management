import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/members';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000
});

export const getMonthlyJoined = async () => {
  try {
    const response = await axiosInstance.get('/monthly-member');
    return response.data;
  } catch (error) {
    console.error('Error fetching monthly joined members:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch monthly members');
  }
};

export const threeDayExpire = async () => {
  try {
    const response = await axiosInstance.get('/within-3-days-expiring');
    return response.data;
  } catch (error) {
    console.error('Error fetching expiring members:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch expiring members');
  }
};

export const foutToSevenDaysExpire = async () => {
  try {
    const response = await axiosInstance.get('/within-4-7-expiring');
    return response.data;
  } catch (error) {
    console.error('Error fetching expiring members:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch expiring members');
  }
};

export const expired = async () => {
  try {
    const response = await axiosInstance.get('/expired-member');
    return response.data;
  } catch (error) {
    console.error('Error fetching expired members:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch expired members');
  }
};

export const inActiveMembers = async () => {
  try {
    const response = await axiosInstance.get('/inactive-member');
    return response.data;
  } catch (error) {
    console.error('Error fetching inactive members:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch inactive members');
  }
};