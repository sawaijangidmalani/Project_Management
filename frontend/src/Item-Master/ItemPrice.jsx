import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";


function ItemPrice({ setShowItem, item: selectedItem }) {
  const [itemprice, setItemsprice] = useState([]);
  const [editprice, setEditprice] = useState(null);

  const [formData, setFormData] = useState({
    price: "",
    qty: "",
    date: "",
  });

  useEffect(() => {
    loadItemsprice();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loadItemsprice = async () => {
    try {
      const { data } = await axios.get("https://project-management-final-udxp.onrender.com/api/itemprices");

      // Filter the item prices to only include those for the selected item
      const filteredPrices = data.filter(price => price.item === selectedItem.item);

      setItemsprice(filteredPrices);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editprice) {
        response = await axios.put(
          `https://project-management-final-udxp.onrender.com/api/itemprices/${editprice._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        response = await axios.post(
          "https://project-management-final-udxp.onrender.com/api/itemprice",
          { ...formData, item: selectedItem.item },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      const { data } = response;

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(
          editprice ? "Item Price Updated Successfully!" : "Item Price Added Successfully!"
        );
        loadItemsprice();
        setFormData({
          price: "",
          qty: "",
          date: "",
        });
        setEditprice(null);
        setShowItem(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  const handleEdit = (itemprice) => {
    setEditprice(itemprice);
    setFormData({
      price: itemprice.price,
      qty: itemprice.qty,
      date: itemprice.date,
    });
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://project-management-final-udxp.onrender.com/api/itemprices/${id}`
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Item Price is deleted`);
        loadItemsprice();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <h1>Add Price</h1>
      <h2>Item Name: {selectedItem.item}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleInputChange}
          placeholder="Quantity"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          placeholder="Date"
          required
        />
        <button type="submit">{editprice ? "Update" : "Submit"}</button>
      </form>
      <div>
        <h2>Item Prices for {selectedItem.item}:</h2>
        <table className="table table-bordered table-striped table-hover shadow">
          <thead className="table-secondary">
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {itemprice?.map((price) => (
              <tr key={price._id}>
                <td>{price.price}</td>
                <td>{price.qty}</td>
                <td>{price.date}</td>
                <td>
                  <div className="buttons-group">
                    <button className="btns" onClick={() => handleEdit(price)}>
                      <BiSolidEdit />
                    </button>
                    <button className="btns" onClick={() => handleDelete(price._id)}>
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ItemPrice;


