import React from "react";


const AddProducts = () => {
  const handleaddproducts = () => {
    // fetch("http://localhost:5000/addproduct", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(productsData),
    // }).then((res) => {
    //   console.log(res);
    // });
    alert('this feature is not available now')
  };
  return (
    <div className="container">
      <h3>Add new Products: </h3>
      <button onClick={handleaddproducts}>Add Product</button>
    </div>
  );
};

export default AddProducts;
