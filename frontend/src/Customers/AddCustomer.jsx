
import { useState, useEffect } from "react";
import "./Customer.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddCustomer({ editingCustomer, setVisible,loadCustomers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gstn, setGstn] = useState("");
  const [status, setStatus] = useState("");

  //const navigate = useNavigate();

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setEmail(editingCustomer.email);
      setArea(editingCustomer.area);
      setPhone(editingCustomer.phone);
      setAddress(editingCustomer.address);
      setCity(editingCustomer.city);
      setGstn(editingCustomer.gstn);
      setStatus(editingCustomer.status);
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
  }, [editingCustomer]);

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
      if (editingCustomer && editingCustomer._id) {
        res = await axios.put(
          `https://project-management-final-udxp.onrender.com/api/customers/${editingCustomer._id}`,
          customerData
        );
      } else {
        res = await axios.post(
          "https://project-management-final-udxp.onrender.com/api/customer",
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
          (editingCustomer && editingCustomer._id) ? `${data.name} is updated` : `${data.name} is created`

        );
      }
    } catch (err) {
      console.log("Error saving customer:", err);
      toast.error("Error saving customer");
    }
    setVisible(false);
    loadCustomers();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className="form-heading">
          {(editingCustomer && editingCustomer._id) ? "Edit Customer" : "Add Customer"}
        </h3>
        <div className="customer-form">
          <label>
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
            <input
              type="text"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="customer-form__input"
            />
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
        </div>
        <div className="customer-form__button-container">
          <button type="submit" className="customer-form__button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
