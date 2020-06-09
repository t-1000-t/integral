const fetchFilter = async (note) => {
  const {
    category,

    // filter2,
    // filter3,
    // filter4,
    // filter5,
    // filter6,
  } = note;
  console.log("category", category);

  // console.log("filter2", filter2);
  // console.log("filter3", filter3);
  // console.log("filter4", filter4);
  // console.log("filter5", filter5);
  // console.log("filter6", filter6);
  try {
    return await fetch(
      `https://shop-integral.herokuapp.com/api/products_search/${category}/`
      // `http://localhost:5000/api/products_search/${category}/${filter1}/${filter2}/${filter3}/${filter4}/${filter5}/${filter6}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        return data;
      })
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchFilter };
