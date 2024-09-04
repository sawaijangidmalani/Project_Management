import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddEditPo = ({ edits }) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState("");
  const [avlqty, setAvlqty] = useState("");
  const [altqty, setAltqty] = useState("");
  const [cost, setCost] = useState("");
  const [tax, setTax] = useState("");
  const [remqty, setRemqty] = useState("");
  const [ivnumber, setIvnumber] = useState("");
  const [ivdate, setIvdate] = useState("");

  useEffect(() => {
    if (edits) {
      setItem(edits.item);
      setAvlqty(edits.avlqty);
      setAltqty(edits.altqty);
      setCost(edits.cost);
      setTax(edits.tax);
      setRemqty(edits.remqty);
      setIvnumber(edits.ivnumber);
      setIvdate(edits.ivdate);
    } else {
      setItem("");
      setAvlqty("");
      setAltqty("");
      setCost("");
      setTax("");
      setRemqty("");
      setIvnumber("");
      setIvdate("");
    }
  }, [edits]);

  useEffect(() => {
    loadItems();
  }, []);

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
      if (edits && edits._id) {
        const { data } = await axios.put(
          `http://localhost:8000/api/itempos/${edits._id}`,
          { item, avlqty, altqty, remqty, ivnumber, ivdate, cost, tax },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`${data.item} Item details Deleted `);
        }
      } else {
        const { data } = await axios.post(
          "http://localhost:8000/api/itempo",
          { item, avlqty, altqty, remqty, ivnumber, ivdate, cost, tax },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success(`${data.item} Item details is Created `);
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
          {items.map((item,index) => (
            <option key={index} value={item.item}>
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
          Cost:
        </label>
        <input
          type="text"
          id="cost"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
          className="remainingQty-salesorder_input"
        />
        <label htmlFor="tax" className="remainingQty-salesorder_label">
          Tax:
        </label>
        <input
          type="text"
          id="tax"
          value={tax}
          onChange={(event) => setTax(event.target.value)}
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

export default AddEditPo;
