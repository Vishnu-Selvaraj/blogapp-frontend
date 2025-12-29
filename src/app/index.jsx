"use client";
import NavbarAdmin from "@/components/admin/Navbar";
import CardSection from "@/components/Home/cardSection";
import CategorySection from "@/components/Home/categoriesSection";
import Footer from "@/components/Home/footer";
import HeroSection from "@/components/Home/heroSection";
import SubscribeBlog from "@/components/Home/subscribeBlog";
import { useState } from "react";

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchByName, setsearchByName] = useState("");

  return (
    <>
      <NavbarAdmin isUser={true} />
      <HeroSection setSearchTerm={setsearchByName} />
      <CategorySection setSelectedCategoryId={setSelectedCategoryId} />
      <CardSection categoryId={selectedCategoryId} searchTerm={searchByName} />
      <SubscribeBlog />
      <Footer />
    </>
  );
}
