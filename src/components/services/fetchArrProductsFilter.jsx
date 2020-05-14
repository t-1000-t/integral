const fetchFilter = async (note) => {
  const { category, vendor } = note;
  console.log("category", category);
  console.log("vendor", vendor);
  try {
    return await fetch(
      //   `http://localhost:5000/api/products_search/${category}/${vendor}`
      `https://shop-integral.herokuapp.com/api/products_search/${category}/${vendor}`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchFilter };
