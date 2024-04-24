import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MetaData } from './MetaData';

export default function Product({ product }) {
  const { Ratings, NumbersOfReviews } = product;

  // Calculate the star rating based on the product's ratings
  const starRating = () => {
    const rating = parseFloat(Ratings);
    const filledStars = Math.floor(rating);
    const remainder = rating - filledStars;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<AiFillStar key={i} color="gold" />);
    }
    if (remainder >= 0.5) {
      stars.push(<AiFillStar key={filledStars} color="gold" />);
    }

    return stars;
  };

  // Construct the image URL based on the base URL and product image path
  const imageURL = `${window.location.origin}/E-commerce-website-Mern-stack${product.images[0].image}`;

  return (
    <Fragment>
      <MetaData title={'Buy Pro'} />
      <div className='Shopping-product'>
        <div className='card d-flex justify-content-center p-3' style={{ width: '260px' }}>
          <img
            src={product.images && product.images.length > 0 ? imageURL : 'fallback_image_url'}
            id='Image'
            alt={product.name}
            className='card-img-top'
          />
          <div className='card-body'>
            <Link to={`/Productviews/${product._id}`} id='heading' className='text-center'>
              {product.name}
            </Link>
            <div className='ratings mt-auto mb-3'>
              <div className='rating-outer'>
                <div className='rating-inner' style={{ width: `${Ratings / 5 * 100}%` }}></div>
              </div>
              <span>{starRating()}</span>
              <span className='mx-2'>(Reviews: {NumbersOfReviews})</span>
            </div>
            <p className='text-dark'>Price of {product.Price}</p>
            <Link to={`/Productviews/${product._id}`} className='w-100 btn- btn bg-primary text-white'>
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
