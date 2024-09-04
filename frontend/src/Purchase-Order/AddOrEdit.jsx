import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddOrEdit = ({editpo,setShowAddOrEdit}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [cost, setCost] = useState("");
  const [pprice, setPprice] = useState("");
  const [avlqty, setAvlqty] = useState("");
  const [altqty, setAltqty] = useState("");
  const [remqty, setRemqty] = useState("");
  const [ivnumber, setIvnumber] = useState("");
  const [ivdate, setIvdate] = useState("");
  

  useEffect(() => {
    loadItems();
  }, []);
  useEffect(() => {
    if (editpo) {
      setItem(editpo.item);
      setAvlqty(editpo.avlqty);
      setAltqty(editpo.altqty);
      setCost(editpo.cost);
      setPprice(editpo.pprice);
      setRemqty(editpo.remqty);
      setIvnumber(editpo.ivnumber);
      setIvdate(editpo.ivdate);
    } else {
      setItem("");
      setAvlqty("");
      setAltqty("");
      setCost("");
      setPprice("");
      setRemqty("");
      setIvnumber("");
      setIvdate("");
    }
  }, [editpo]);
  const loadItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/items");
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleItemChange = (e) => {
    const selectedItemName = e.target.value;
    setItem(selectedItemName);
    const selectedItem = items.find((item) => item.item === selectedItemName);
    const availableQty = selectedItem ? selectedItem.stock : "";
    setAvlqty(availableQty);
    setRemqty(availableQty - altqty); // Calculate the initial remaining quantity
  };

  useEffect(() => {
    setRemqty(avlqty - altqty); // Recalculate remaining qty when altqty or avlqty changes
  }, [altqty, avlqty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editpo && editpo._id){
        const { data } = await axios.put(
          `http://localhost:8000/api/itemppos/${editpo._id}`,
          { item, avlqty, altqty, remqty, ivnumber, ivdate,cost,pprice },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`${data.item} Item details is Updated `);
          setShowAddOrEdit(false);
        
        }

      } else {
        const { data } = await axios.post(
          "http://localhost:8000/api/itemppo",
          { item, avlqty, altqty, remqty, ivnumber, ivdate,cost,pprice },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`${data.item} Item details is Created `);
          setShowAddOrEdit(false);        
        }

      }
     
     
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="salesorder-form">
        <h3 className="salesorder-form-heading">Add / Edit Item</h3>
        <label htmlFor="item" className="customer-salesorder_label">
          Item Name:
        </label>
        <select
          id="item"
          value={item}
          onChange={handleItemChange}
          className="customer-salesorder_input"
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item._id} value={item.item}>
              {item.item}
            </option>
          ))}
        </select>
        <label htmlFor="avlqty" className="availableQty-salesorder_label">
          Available Qty:
        </label>
        <input
          type="number"
          id="avlqty"
          value={avlqty}
          onChange={(e) => setAvlqty(e.target.value)}
          className="availableQty-salesorder_input"
          readOnly
        />
        <label htmlFor="altqty" className="qtyAllocated-salesorder_label">
          Allocated Qty:
        </label>
        <input
          type="number"
          id="altqty"
          value={altqty}
          onChange={(event) => setAltqty(event.target.value)}
          className="qtyAllocated-salesorder_input"
        />
        <label htmlFor="remqty" className="remainingQty-salesorder_label">
          Remaining Qty:
        </label>
        <input
          type="number"
          id="remqty"
          value={remqty}
          onChange={(event) => setRemqty(event.target.value)}
          className="remainingQty-salesorder_input"
          readOnly
        />
        <label htmlFor="cost" className="remainingQty-salesorder_label">
          Unit Cost :
        </label>
        <input
          type="text"
          id="cost"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
          className="remainingQty-salesorder_input"
        />
        <label htmlFor="pprice" className="remainingQty-salesorder_label">
          Purchase Price :
        </label>
        <input
          type="text"
          id="pprice"
          value={pprice}
          onChange={(event) => setPprice(event.target.value)}
          className="remainingQty-salesorder_input"
        />
        <label htmlFor="ivnumber" className="remainingQty-salesorder_label">
          Invoice Number:
        </label>
        <input
          type="text"
          id="ivnumber"
          value={ivnumber}
          onChange={(event) => setIvnumber(event.target.value)}
          className="remainingQty-salesorder_input"
        />
        <label htmlFor="ivdate" className="remainingQty-salesorder_label">
          Invoice Date:
        </label>
        <input
          type="date"
          id="ivdate"
          value={ivdate}
          onChange={(event) => setIvdate(event.target.value)}
          className="remainingQty-salesorder_input"
        />

        <div className="buttons-group">
          <button type="submit" className="btns">
            Save
          </button>
          </div>
      </form>
    </>
  );
};

export default AddOrEdit;
