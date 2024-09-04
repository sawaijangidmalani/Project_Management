import React, { useEffect, useState } from "react";
import "./salesorder.css";
import AddSalesItem from "./AddSalesItem";
import AddEditPo from "./AddEditPo";
import axios from "axios";
import toast from "react-hot-toast";

const SalesOrder = ({ editingCpo }) => {
  const [customern, setCustomer] = useState("");
  const [customerpo, SetCustomerpo] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [addClick, setAddClick] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [edits, setEditing] = useState(null);
 

  useEffect(() => {
    loadCustomer();
  }, []);
  useEffect(() => {
    if (editingCpo && editingCpo._id) {
      setCustomer(editingCpo.customern?.name);
      SetCustomerpo(editingCpo.customerpo);
      setDate(editingCpo.date);
      setStatus(editingCpo.status);
    } else {
      setCustomer("");
      SetCustomerpo("");
      setDate("");
      setStatus("");
    }
  }, [editingCpo]);
  const loadCustomer = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/customers");
      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCpo && editingCpo._id) {
        const { data } = await axios.put(
          `http://localhost:8000/api/customerpos/${editingCpo._id}`,
          { customern, customerpo, date, status },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`"${data.customern}" is updated`);
          loadCustomer();
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/api/customerpo",
          { customern, customerpo, date, status },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`"${data.customern}" is created`);
            }
      }
    } catch (err) {
      console.log(err);
    }
    loadCustomer();
  };

  const handleAdd = () => {
    setAddClick(true);
  };
  
  
  return (
    <>
      {addClick ? (
        <AddEditPo setAddClick={setAddClick} edits={edits}/>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="salesorder-form">
            <h3 className="salesorder-form-heading">Add / Edit Customer PO </h3>
            <label htmlFor="customern" className="customer-salesorder_label">
              Customer:
            </label>
            <select
              name="customern"
              value={customern}
              onChange={(e) => setCustomer(e.target.value)}
              className="customer-salesorder_input"
            >
              {customers?.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <label htmlFor="date" className="date-salesorder_label">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="date-salesorder_input"
            />
            <label htmlFor="customerpo" className="invoice-salesorder_label">
              Customer PO
            </label>
            <input
              type="text"
              id="customerpo"
              value={customerpo}
              onChange={(e) => SetCustomerpo(e.target.value)}
              className="invoice-salesorder_input"
            />
            <label htmlFor="status" className="status-salesorder_label">
              Status:
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="status-salesorder_input"
            >
              <option value="active">active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button type="submit"> save</button>
            <button
              type="button"
              onClick={handleAdd}
              className="add-item"
              htmlFor="Add=Item"
            >
              Add Item
            </button>
          </form>
          <AddSalesItem setEditing={setEditing} setAddClick={setAddClick}/>
          <div className="buttons-group">
            <button type="submit" className="btns">
              Save
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SalesOrder;
