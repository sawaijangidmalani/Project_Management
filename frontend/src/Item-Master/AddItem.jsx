
import axios from "axios";
import React, { useEffect, useState} from "react";
import toast from "react-hot-toast";

const AddItem = ({editingItem, setVisible, supplier,loadItems }) => {

  const initialData = {
    item: "",
    supplier: "",
    category: "",
    brand: "",
    description: "",
    unit: "",
    price: "",
    stock:"",
    status: "",
  };
  const [formData, setFormData] = useState({ ...initialData });

  useEffect(() => {
    if (editingItem && editingItem._id) {
      setFormData(editingItem);
    } else {
      setFormData({ ...initialData });
    }
  }, [editingItem]);
 
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingItem && editingItem._id) {
        res = await axios.put(
          `http://localhost:8000/api/items/${editingItem._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        res = await axios.post(
          "http://localhost:8000/api/item",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      const { data } = res;
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(
          editingItem && editingItem._id
            ? `"${data.item}" is Update`
            : `"${data.item}" is Created`,
            setVisible(false),
            
        );
        loadItems();
      }
    } catch (err) {
      if (err.response.data && err.response.data.error) {
       toast.error(err.response.data.error);}
      console.log("Error saving customer:", err);
      //toast.error("Error saving customer");
      setVisible(true);
    }
       setFormData({ ...initialData });
  };

  return (
    <>
     
            <form onSubmit={handleSubmit} className="customer-form">
              <h3 className="form-heading">Add / Edit Item</h3>
              <label htmlFor="name" className="customer-form__label">
                Item Name:
              </label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                className="customer-form__input"
              />

              <label htmlFor="supplier" className="customer-form__label">
                Supplier:
              </label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleInputChange}
                className="customer-form__input"
              >
                {supplier.map((item,index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label htmlFor="category" className="customer-form__label">
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="customer-form__input"
              />
              <label htmlFor="brand" className="customer-form__label">
                Brand:
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="customer-form__input"
              />
               <label htmlFor="brand" className="customer-form__label">
                Stock :
              </label>
              <input
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="customer-form__input"
              />

              <label htmlFor="description" className="customer-form__label">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="customer-form__input"
              />

              <label htmlFor="unit" className="customer-form__label">
                Unit:
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="customer-form__input"
              >
                <option value="KG">KG</option>
                <option value="PCS">PCS</option>
              </select>
              {/* <label htmlFor="price" className="customer-form__label">
                Price:
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="customer-form__input"
              /> */}

              <label htmlFor="status" className="customer-form__label">
                Status:
              </label>
              <input
                type="checkbox"
                name="status"
                checked={formData.status === "active"}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.checked ? "active" : "inactive" })
                }
                className="customer-form__input"
              />

              <div className="customer-form__button-container">
                <button type="submit" className="customer-form__button">
                  Save
                </button>
               </div>
            </form>
    </>
  );
};

export default AddItem;
