import React from 'react'
import { AiFillStar} from 'react-icons/ai';
import {Carousel} from 'react-bootstrap'
import { MetaData } from './MetaData';

export const Productvewers = ({product}) => {

    if (!product || !product.name) {
        return <div>No product data available.</div>;
    }

    const { Ratings} = product;

    // Calculate the star rating based on the product's ratings
    const starRating = () => {
      const rating = parseFloat(Ratings); // Convert Ratings to a number
      const filledStars = Math.floor(rating); // Get the integer part for filled stars
      const remainder = rating - filledStars; // Get the decimal part for half star (if needed)
  
      const stars = [];
      for (let i = 0; i < filledStars; i++) {
        stars.push(<AiFillStar key={i} color="gold" />);
      }
      if (remainder >= 0.5) {
        stars.push(<AiFillStar key={filledStars} color="gold" />);
      }
  
      return stars;
    };
  

  return (
   <>
  
  <MetaData title={product.name}/>

<div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-md-5 img-fluid" id="product_image">
                     
                     <Carousel pause="hover">

                        
                     {product.images && product.images.map(image =>
                                <Carousel.Item key={image._id}>
                                    <img
                                        className='d-block w-100 mt-5'
                                        src={`/E-commerce-website-Mern-stack${image.image}`}
                                        alt={product.name}
                                        height="400"
                                        width="300"
                                    />
                                </Carousel.Item>

                        )}


                     </Carousel>


                 
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # 387874kkfjkf</p>

                <hr/>

                <div className="rating-outer">
                <div className='rating-inner' style={{ width: `${Ratings / 5 * 100}%` }}></div>
                </div>
                <span>{starRating()}</span>
                <span id="no_of_reviews" className='text-white'> Reviews({product.NumbersOfReviews})</span>

                <hr/>

                <p id="product_price">{product.Price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>

                    <input type="number" className="form-control count d-inline" value="1" readOnly />

                    <span className="btn btn-primary plus">+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline mx-4">Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status">{product.stock > 0 ?<span className='text-success'>'Stock In'</span> :
                 <span className='text-danger'>'Out of Stock'</span>}</span></p>

                <hr/>

                <h4 className="mt-2 text-white">Description:</h4>
                <p>{product.Description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
				<button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div className="row mt-2 mb-5">
                    <div className="rating w-50">

                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">

                                        <ul className="stars" >
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                            <li className="star"><i className="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" className="form-control mt-3">

                                        </textarea>

                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>
</div>


    </div>





</>
  
  )
}

   
   
   
   
   
   
   
