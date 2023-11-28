import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "axios";

export default function CategoryProductPage() {
  const [products, setProducts] = useState([]);
  let { slug } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async (req, res) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}api/v1/product/product-category/${slug}`
        );
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsByCategory();
  }, [slug]);

  return (
    <div className="row g-0">
      {products.length ? (
        products.map((product) => (
          <div key={product._id} className="col-xl-2 col-lg-3 col-md-4 col-6">
            <ProductCard key={product._id} product={product} />
          </div>
        ))
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
}
