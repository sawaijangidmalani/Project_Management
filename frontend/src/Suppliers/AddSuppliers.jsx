/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; 
import { Select } from "antd";
const { Option } = Select;
//import { useNavigate } from "react-router-dom";

function AddSuppliers({ editingSuppliers, setVisible}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gstn, setGstn] = useState("");
  const [status, setStatus] = useState("");

  // const navigate = useNavigate();

  useEffect(() => {
    if (editingSuppliers) {
      setName(editingSuppliers.name);
      setEmail(editingSuppliers.email);
      setArea(editingSuppliers.area);
      setPhone(editingSuppliers.phone);
      setAddress(editingSuppliers.address);
      setCity(editingSuppliers.city);
      setGstn(editingSuppliers.gstn);
      setStatus(editingSuppliers.status);
    } else {
      setName("");
      setEmail("");
      setArea("");
      setPhone("");
      setAddress("");
      setCity("");
      setGstn("");
      setStatus("");
    }
  }, [editingSuppliers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customerData = new FormData();
      customerData.append("name", name);
      customerData.append("email", email);
      customerData.append("phone", phone);
      customerData.append("area", area);
      customerData.append("address", address);
      customerData.append("city", city);
      customerData.append("gstn", gstn);
      customerData.append("status", status);

      let res;
      if (editingSuppliers && editingSuppliers._id) {
        res = await axios.put(
          `https://project-management-final-udxp.onrender.com/api/suppliers/${editingSuppliers._id}`,
          customerData
        );
      } else {
        res = await axios.post(
          "https://project-management-final-udxp.onrender.com/api/supplier",
          customerData,
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
          editingSuppliers && editingSuppliers._id
            ? `${data.name} is updated`
            : `${data.name} is created`,
            setVisible(false)
        );
      }
    } catch (err) {
      if (err.response.data && err.response.data.error) {
       toast.error(err.response.data.error);}
      console.log("Error saving customer:", err);
      toast.error("Error saving customer");
      setVisible(true);
    }
   
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="customer-form">
        <h3 className="form-heading">{editingSuppliers && editingSuppliers._id ? "Edit Supplier" : "Add Supplier"}</h3>
        <label className="customer-form__label">
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          Phone:
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          Address:
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          Area:
          <input
            type="text"
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <label className="customer-form__label">
          Status:
          <Select variant="false" className="form-select mb-3" size="large" placeholder="choose shipping" value={status} onChange={(value) => setStatus(value)}>
              <Option value="active">Actvie</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
        </label>
        <label className="customer-form__label">
          GSTN:
          <input
            type="text"
            name="gstn"
            value={gstn}
            onChange={(e) => setGstn(e.target.value)}
            className="customer-form__input"
          />
        </label>
        <div className="customer-form__button-container">
          <button type="submit" className="customer-form__button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSuppliers;
