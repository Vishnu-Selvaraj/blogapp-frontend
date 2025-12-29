import { api } from "@/utils/axiosInstance";
const commonAPI = async (method, url, data = null, headers = {}) => {
  try {
    const res = await api({
      method,
      url,
      data,
      // headers: headers ? headers : { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    throw error.response || error;
  }
};

export default commonAPI;
