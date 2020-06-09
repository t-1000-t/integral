const fetchCategoryes = async () => {
  try {
    return await fetch(
      `https://shop-integral.herokuapp.com/api/productsallbase/`
    )
      .then((res) => res.json())
      .then((data) => data)
      .catch()
      .finally();
  } catch (err) {
    console.log(err);
  }
};

export default { fetchCategoryes };
