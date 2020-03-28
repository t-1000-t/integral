import React, { Component } from "react";
import stylish from "./AboutPage.module.css";

class AboutPage extends Component {
  render() {
    return (
      <div className={stylish.wrapper}>
        <div className={stylish.container}>
          Информация о магазине Integral
          <div className={stylish.iconLogo}></div>
          <iframe
            title="myFrame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d861.8796958335039!2d32.64200982926102!3d46.66527241904154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c410179bfbaab9%3A0x80e075338214cd9b!2z0JjQndCi0JXQk9Cg0JDQmywg0J7QntCeLCDQmtCe0JzQnNCV0KDQp9CV0KHQmtCQ0K8g0JPQoNCj0J_Qn9CQ!5e1!3m2!1sru!2sua!4v1585412008403!5m2!1sru!2sua"
            className={stylish.mapIntegral}
          ></iframe>
        </div>
      </div>
    );
  }
}

export default AboutPage;
