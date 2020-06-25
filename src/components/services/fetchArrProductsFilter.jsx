const fetchFilter = async (note) => {
  const { category } = note;

  try {
    return await fetch(
      `https://shop-integral.herokuapp.com/api/products_search/${category}/`
      // `http://localhost:5000/api/products_search/${category}/${filter1}/${filter2}/${filter3}/${filter4}/${filter5}/${filter6}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        return data;
      })
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchFilter };
