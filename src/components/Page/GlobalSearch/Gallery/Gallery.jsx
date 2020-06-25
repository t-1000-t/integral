import React from "react";
import { NavLink } from "react-router-dom";
import T from "prop-types";
import routes from "../../../../routes/routes";
import stylish from "./Gallery.module.css";

const Gallery = ({ articles }) => (
  <>
    {articles.map((elem) => (
      <div key={elem.productID} className={stylish.nameProductMain}>
        <div className={stylish.fontProductMain}>{elem.name}</div>
        <div className={stylish.fontProductMain}>Код: {elem.product_code}</div>
        <NavLink
          className={stylish.NavLinkProd}
          to={`${routes.PRODUCT}/${elem.productID}`}
        >
          <div>
            <img
              className={stylish.imgMain}
              src={elem.small_image}
              alt={elem.product_code}
            />
          </div>
        </NavLink>
        <div className={stylish.fontPayProductMain}>
          {/* {elem.retail_price_uah} грн. */}
        </div>
        <div className={stylish.fontProductMain}>{elem.country}</div>
      </div>
    ))}
  </>
);

Gallery.propType = {
  PhotoCard: T.string.isRequired,
  articles: T.array.isRequired,
};

export default Gallery;
