import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import '../ProductDetails.css'
import { Loadings } from './Loadings';
import { Productvewers } from './Productvewers';


export const ProductDetails = () => {

    const { id } = useParams(); // Get the product ID from route parameters

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8000/api/v1/Singleproduct/${id}`, { headers: { Accept: 'application/json' } })
                .then(response => {
                    console.log(response.data);
                    if (response.data.success) {
                        setProduct(response.data.Product); // Note the uppercase 'P' in 'Product'
                    } else {
                        console.error('Invalid data format received from the server.');
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <>
            {loading ? (
                <Loadings />
            ) : (
                <div className='product-views'>

                    <Productvewers product={product}/>
                   
                </div>
            )}
        </>
    )
}

export default ProductDetails