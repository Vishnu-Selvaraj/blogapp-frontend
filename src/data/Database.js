import dashImg from "../../public/assests/images/navimg1.svg";
import addBlog from "../../public/assests/images/navimg2.svg";
import blogList from "../../public/assests/images/navimg3.svg";
import comments from "../../public/assests/images/navimg4.svg";
import cardImg1 from "../../public/assests/images/cardImg1.svg";
import cardImg2 from "../../public/assests/images/cardImg2.svg";
import cardImg3 from "../../public/assests/images/cardImg3.svg";

export const adminMenu = [
  {
    name: "Dashboard",
    icon: dashImg,
    path: "/dashboard" || '/',
  },
  {
    name: "Add blogs",
    icon: addBlog,
    path: "/addBlogs",
  },
  {
    name: "Blog lists",
    icon: blogList,
    path: "/listBlogs",
  },
  {
    name: "Comments",
    icon: comments,
    path: "/comments",
  },
];

export const dashboardMenu = [
  {
    name: "Blogs",
    icon: cardImg1,
    count:0
  },
  {
    name: "Comments",
    icon: cardImg2,
    count:0
  },
  {
    name: "Drafts",
    icon: cardImg3,
    count:0
  },
];

// export const blogFormOptions = [
//   "All",
//   "Technology",
//   "Startup",
//   "Lifestyle",
//   "Finance",
// ];
