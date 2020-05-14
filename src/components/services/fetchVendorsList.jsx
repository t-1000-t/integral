const fetchVendors = async (prodID) => {
  try {
    return await fetch(
      `https://shop-integral.herokuapp.com/api/vendors/${prodID}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchVendors };
