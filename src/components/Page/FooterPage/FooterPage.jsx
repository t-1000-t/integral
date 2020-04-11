import React from "react";
import stylish from "./FooterPage.module.css";
// npm install --save-dev @iconify/react @iconify/icons-ion

const FooterPage = () => {
  return (
    <div className={stylish.container}>
      <ul className={stylish.wrapper}>
        <li className={stylish.integral}></li>
        <li className={stylish.middleNavigation}>
          &copy; Integral<div className={stylish.basta}></div>
        </li>
        <li className={stylish.support}></li>
      </ul>
    </div>
  );
};

export default FooterPage;
