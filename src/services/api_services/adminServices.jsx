import commonAPI from "../commonApi";

export const login = async (method,url,data) => {
  const response = await commonAPI(method,url,data);
  return response;
};

export const getAllBlogs = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const getBlogById = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const getAllCategories = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const addBlogs = async (method,url,data,headers) => {
  const response = await commonAPI(method,url,data,headers);
  return response;
};

export const addComments = async (method,url,data) => {
  const response = await commonAPI(method,url,data);
  return response;
};


export const changeCommentStatus = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const getBlogCommentsById = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const deleteComment = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};


export const generateBlogContent = async (method,url,data,headers) => {
  const response = await commonAPI(method,url,data,headers);
  return response;
};

export const updateBlogPublishStatus = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};

export const deleteBlog = async (method,url) => {
  const response = await commonAPI(method,url);
  return response;
};