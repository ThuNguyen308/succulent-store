import React from 'react'
import {useSearch} from '../context/search'
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
    const [value, setValue] = useSearch();
    return (
        <div className="row g-0">
            {/* <p>Tìm kiếm từ khóa <b>"{value.keyword}"</b></p> */}
            {value.results.length
              ? (value.results.map(product => 
                  <div key={product._id} className="col-lg-3 col-md-4 col-6">
                    <ProductCard key={product._id} product={product}/>
                  </div>
                )
              ) : (<div>No product found</div>)
            }
        </div>
    )
}
