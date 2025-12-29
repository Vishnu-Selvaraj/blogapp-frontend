import { queryClient } from "@/libs/mainQueryClient";
import {
  addBlogs,
  getAllBlogs,
  getBlogById,
  generateBlogContent,
  getAllCategories,
  updateBlogPublishStatus,
  deleteBlog,
  addComments,
  getBlogCommentsById,
  login,
  changeCommentStatus,
  deleteComment,
} from "@/services/api_services/adminServices";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useAdminLogin = (method, url) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await login(method, url, data);
      return response;
    },
  });
};

export const useGetAllBlogs = (method, url) => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await getAllBlogs(method, url);
    },
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });
};

export const useGetBlogById = (method, url, blogId) => {
  return useQuery({
    queryKey: ["blogs", blogId],
    queryFn: async () => {
      return await getBlogById(method, url);
    },
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });
};

export const useGetAllBlogsByCategoryIdOrTerm = (
  method,
  url,
  categoryId,
  searchTerm
) => {
  return useQuery({
    queryKey: ["blogs", categoryId, searchTerm],
    queryFn: async () => {
      return await getAllBlogs(method, url);
    },
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });
};

export const useGetAllCategories = (method, url) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getAllCategories(method, url);
    },
    refetchOnWindowFocus: false,
    staleTime: 100000,
  });
};

export const useGetBlogComments = (method, url, blogId) => {
  return useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      return await getBlogCommentsById(method, url);
    },
    enabled: Boolean(blogId),
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });
};

export const useAddBlogs = (method, url, headers) => {
  return useMutation({
    mutationFn: async (data) => {
      //data passed from addBlogMutationFn
      const response = await addBlogs(method, url, data, headers);
      return response;
    },
  });
};

export const useGenerateBlogContent = (method, url, headers) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await generateBlogContent(method, url, data, headers);
      return response;
    },
  });
};

export const useUpdateBlogPublishStatus = (method) => {
  return useMutation({
    mutationFn: async (url) => {
      const response = await updateBlogPublishStatus(method, url);
      return response;
    },
    //revalidating blogs data on success
    onSuccess: () => {
      return queryClient.invalidateQueries(["blogs"]);
    },
  });
};

export const useDeleteBlog = (method) => {
  return useMutation({
    mutationFn: async (url) => {
      const response = await deleteBlog(method, url);
      return response;
    },
    //revalidating blogs data on success of deleting
    onSuccess: () => {
      return queryClient.invalidateQueries(["blogs"]);
    },
  });
};

//Add ViewPage Comment
export const useAddComments = (method, url) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await addComments(method, url, data);
      return response;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["comments"]);
    },
  });
};

export const useAdminGetBlogsComments = (method, url) => {
  return useQuery({
    queryKey: ["blogComments", url],
    queryFn: async () => {
      return await getBlogCommentsById(method, url);
    },
    // enabled: Boolean(blogId),
    refetchOnWindowFocus: false,
    staleTime: 50000,
  });
};

export const useChangeCommentsStatus = (method) => {
  return useMutation({
    mutationFn: async (url) => {
      const response = await changeCommentStatus(method, url);
      return response;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["blogComments"]);
    },
  });
};

export const useDeleteComment = (method) => {
  return useMutation({
    mutationFn: async (url) => {
      const response = await deleteComment(method, url);
      return response;
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["blogComments"]);
    },
  });
};
