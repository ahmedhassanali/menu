import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./CardsSection.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchCategories } from "../../rtk/slices/CategoriesSlice";
import CategoryCard from "../components/Cards/CategoryCard";
import Header from "../components/Header/Header";
import NavBar from "../components/NavBar/NavBar";
import ContactUs from "../components/ContactUs/ContactUs";
import Footer from "../components/Footer/Footer";

const CategorySection = () => {
  const { i18n } = useTranslation();
  const categoriesData = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    AOS.init();
  });

  const categories = categoriesData.map((category) => {
    if (i18n.language === "ar") {
      return {
        id: category.id,
        name: category.name.ar,
        description: category.description.ar,
        image: category.image,
      };
    } else {
      return {
        id: category.id,
        name: category.name.en,
        description: category.description.en,
        image: category.image,
      };
    }
  });

  return (
    <>
      <NavBar />
      <Header />
      <div className="menu">
        {categories.map((item) => (
          <CategoryCard
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            id={item.id}
          />
        ))}
      </div>
      <ContactUs />
      <Footer />
    </>
  );
};

export default CategorySection;
