import React, { Fragment, useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios';
import Pagination from 'react-js-pagination';
import Product from './Product';
import { Loadings } from './Loadings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(currentPage);
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/v1/Products', { headers: { Accept: 'application/json' } })
      .then((response) => {
        console.log(response.data); // Check the data structure
        if (response.data.success && Array.isArray(response.data.Products)) {
          setProducts(response.data.Products); // Access Products array from response
        } else {
          toast.error('Invalid data format received from the server.', { position: 'top-center' }); // Position error toast at top-right
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        if (error.response) {
          const errorMessage = error.response.data.message || 'Failed to fetch products. Please try again later.';
          toast.error(errorMessage, { position: 'top-center' }); // Position error toast at top-right
        } else {
          toast.error('Network error. Please check your connection.', { position: 'top-right' }); // Position error toast at top-right
        }
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loadings/>
      ) : (
        <Fragment>
          <section>
            <h3 className='mt-5 pb-4'>Latest Products</h3>
            <div className='product-list'>
              <ul>
                {products
                  .slice((currentPage - 1) * 3, currentPage * 3) // Adjust based on itemsCountPerPage
                  .map((product) => (
                  <Product key={product._id} product={product}/>
                  ))}
              </ul>
            </div>
          </section>
          <div className='pageniation d-flex justify-content-center mt-5'>
            <Pagination
              activePage={currentPage}
              onChange={setCurrentPageNo}
              totalItemsCount={products ? products.length : 0}
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
};

export default Home;
