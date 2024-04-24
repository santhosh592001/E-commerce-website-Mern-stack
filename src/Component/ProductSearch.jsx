import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../Component/Product';
import '../App.css';
import { Loadings } from '../Component/Loadings';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import { debounce } from 'lodash'; // Import debounce from lodash

function ProductSearch() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [priceRange, setPriceRange] = useState([1, 150000]); // Default price range
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Electronic",
    "Mobile Phone",
    "Laptop",
    "HeadPhone",
    "Home"
  ];

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  const debouncedHandlePriceChange = debounce((newPriceRange) => {
    setPriceRange(newPriceRange);
  }, 300);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `http://localhost:8000/api/v1/Products?keyword=${keyword}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&category=${encodeURIComponent(selectedCategory)}`;

    axios
      .get(apiUrl, { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.Products)) {
          setProducts(response.data.Products);
        } else {
          toast.error('Invalid data format received from the server.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        if (error.response) {
          const errorMessage =
            error.response.data.message ||
            'Failed to fetch products. Please try again later.';
          toast.error(errorMessage);
        } else {
          toast.error('Network error. Please check your connection.');
        }
        setLoading(false);
      });
  }, [keyword, priceRange, selectedCategory]); // Include selectedCategory in the dependency array

  const handlePriceChange = (newPriceRange) => {
    debouncedHandlePriceChange(newPriceRange);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products
    .filter(product => product.Price >= priceRange[0] && product.Price <= priceRange[1])
    .filter(product => selectedCategory ? product.Catagory.toLowerCase() === selectedCategory.toLowerCase() : true);

  return (
    <Fragment>
      {loading ? (
        <Loadings />
      ) : (
        <Fragment>
          <section>
            <h3 className='mt-5'>Product Price</h3>
            <div className='row'>
              <div className='col-md-3 mb-4'>
                <div className='mt-4'>
                  <Slider
                    range
                    marks={{ 1: '$1', 150000: '$1500000' }}
                    min={1}
                    max={150000}
                    defaultValue={priceRange}
                    style={{ width: '100%' }}
                    onChange={handlePriceChange}
                    onMouseUp={handlePriceChange}
                    handleRender={(renderProps) => {
                      const { 'aria-valuenow': ariaValueNow, ...otherProps } = renderProps.props;
                      const displayValue = `$${ariaValueNow}`;
                      return (
                        <Tooltip overlay={displayValue}>
                          <div {...otherProps} />
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                     
                <hr className='mt-5' />
                <div className='mt-3'>
                  <h3 className='mb-3'>Categories</h3>  
                  <ul className='pl-0'>
                    {categories.map(category => (
                      <li
                        key={category}
                        style={{ cursor: "pointer", listStyleType: "none", color: "white" }}
                        onClick={() => handleCategoryClick(category)}
                        className={category === selectedCategory ? 'selected-category' : ''}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='search-list d-flex justify-content-center'>
                  <ul className='row' style={{'listStyle':"none" , 'display':'flex' , 'justifyContent':'center'}}>
                    {filteredProducts
                      .slice((currentPage - 1) * 3, currentPage * 3)
                      .map((product) => (
                        <li key={product._id} className='col-12 col-md-4 mb-4'>
                          <Product product={product} />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className='d-flex justify-content-center mt-5'>
            <Pagination
              activePage={currentPage}
              onChange={setCurrentPageNo}
              totalItemsCount={filteredProducts ? filteredProducts.length : 0}
              itemsCountPerPage={3}
              nextPageText={'Next'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass={'page-item'}
              linkClass={'page-link'}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductSearch;
