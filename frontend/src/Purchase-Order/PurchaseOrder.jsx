import React, { useEffect, useState } from "react";
import AddPurchaseItem from "./AddPurchaseItem";
import AddOrEdit from "./AddOrEdit";
import axios from "axios";
import toast from "react-hot-toast";


const PurchaseOrder = ({purchaseEditing}) => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [customerPOs, setCustomerPOs] = useState([]); // This will hold the PO numbers for the selected customer
  const [customerpo, setCustomerpo] = useState("");
  const [purchase, setPurchase] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [showAddOrEdit, setShowAddOrEdit] = useState(false);
  const [editpo, setEditpo] = useState(null);

  useEffect(() => {
    if (purchaseEditing) {
      setCustomer(purchaseEditing.customer);
      setCustomerpo(purchaseEditing.customerpo);
      setPurchase(purchaseEditing.purchase);
      setDate(purchaseEditing.date);
      setStatus(purchaseEditing.status);
    } else {
      setCustomer("");
      setCustomerpo("");
      setDate("");
      setPurchase("");
      setStatus("");
    }
  }, [purchaseEditing]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/customerpos");
      setCustomers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCustomerChange = (event) => {
    const selectedCustomer = event.target.value;
    setCustomer(selectedCustomer);    
    const customerData = customers.find((c) => c.customern === selectedCustomer);
    if (customerData) {
      const poNumbers = Array.isArray(customerData.customerpo) ? customerData.customerpo : [customerData.customerpo];
      setCustomerPOs(poNumbers);
      setCustomerpo(""); 
    } else {
      setCustomerPOs([]); 
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(purchaseEditing && purchaseEditing._id){
        const { data } = await axios.put(`http://localhost:8000/api/purchases/${purchaseEditing._id}`, { customer, customerpo, date, status, purchase }, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (data.error) {
          console.log(data.error);
        } else {
          toast.success("Purchase updated successfully!");
        }

      } else{
        const { data } = await axios.post("http://localhost:8000/api/purchase", { customer, customerpo, date, status, purchase }, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (data.error) {
          console.log(data.error);
        } else {
          toast.success("Purchase created successfully!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddItemClick = () => {
    setShowAddOrEdit(true);
  };

  return (
    <>
      {showAddOrEdit ? (
        <AddOrEdit editpo={editpo} setShowAddOrEdit={setShowAddOrEdit} />
      ) : (
        <form onSubmit={handleSubmit} className="salesorder-form">
          <h3 className="salesorder-form-heading">Add / Edit Purchase Order</h3>
          
          <label htmlFor="customer" className="customer-salesorder_label">
            Customer:
          </label>
          <select
            id="customer"
            value={customer}
            onChange={handleCustomerChange}
            className="customer-salesorder_input"
          >
            <option value="" disabled>Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c.customern}>
                {c.customern}
              </option>
            ))}
          </select>

          <label htmlFor="customerpo" className="customer-salesorder_label">
            Customer PO:
          </label>
          <select
            id="customerpo"
            value={customerpo}
            onChange={(event) => setCustomerpo(event.target.value)}
            className="customer-salesorder_input"
            disabled={!customer}
          >
            <option value="" disabled>Select Customer PO</option>
            {customerPOs.map((po, index) => (
              <option key={index} value={po}>
                {po}
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

          <label htmlFor="purchase" className="invoice-salesorder_label">
            Invoice Number:
          </label>
          <input
            type="text"
            id="purchase"
            value={purchase}
            onChange={(event) => setPurchase(event.target.value)}
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
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit">Save</button>
          <button type="button" onClick={handleAddItemClick} className="add-item">
            Add Item
          </button>

          <AddPurchaseItem setShowAddOrEdit={setShowAddOrEdit} setEditpo={setEditpo}/>

          <div className="buttons-group">
            <button type="submit" className="btns">
              Save
            </button>
            <button className="btns">
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PurchaseOrder;
