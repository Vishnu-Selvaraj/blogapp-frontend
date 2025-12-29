"use client";
import React,{useState} from "react";
import CommentsList from "@/components/admin/comments/commentsList";
import CommentsTopMenuSection from "@/components/admin/comments/commentsTopMenu";
import CheckAuth from "@/services/check_auth/CheckAuth";

const AdminCommentPage = () => {

  const [status,setStatus] = useState(false)
  
  return (
    <CheckAuth>
      <section className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 space-y-3">
        <CommentsTopMenuSection status={status} setStatus={setStatus}/>
        <CommentsList status={status}/>
      </section>
    </CheckAuth>
  );
};

export default AdminCommentPage;
