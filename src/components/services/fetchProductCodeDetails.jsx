const fetchCodeDetails = async (prodID) => {
  try {
    return await fetch(
      `https://shop-integral.herokuapp.com/api/product/product_code/${prodID}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchCodeDetails };
