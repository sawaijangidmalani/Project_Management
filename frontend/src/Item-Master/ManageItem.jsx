
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddItem from "./AddItem";
import ItemStockUtilization from "./ItemStockUtilization";
import ItemPrice from "./ItemPrice";
import { BiInfoCircle, BiPackage, BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Modal } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSelect = styled.select`
  width: 200px;
  height: 40px;
  background-color: white;
  color: #333;
  padding-left: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;
  gap: 15px;
`;

const StyledButton = styled.button`
  font-size: 16px;
  color: #ffffff;
  background-color: #4e647b;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

function ManageItem() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [showStock, setShowStock] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = () => {
    const filteredItems = items.filter((item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setItems(filteredItems);
  };

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    try {
      const { data } = await axios.get("https://project-management-final-udxp.onrender.com/api/suppliers");
      setSupplier(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const { data } = await axios.get("https://project-management-final-udxp.onrender.com/api/items");
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setVisible(true);
  };

  const handleDelete = async (itemId) => {
    try {
      const { data } = await axios.delete(`https://project-management-final-udxp.onrender.com/api/items/${itemId}`);
            console.log(data);
            
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.item.item} is deleted`);
        loadItems();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowStock = (item) => {
    setSelectedItem(item);
    setShowStock(true);
  };

  const handleShowItemPrice = (item) => {
    setSelectedItem(item);
    setShowItem(true);
  };

  return (
    <>

      <h1>Manage Items:</h1>
      <StyledDiv>
        <div>
          <StyledSelect
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          >
            {items?.map((item,index) => (
              <option key={index}>{item.item}</option>
            ))}
          </StyledSelect>
          <StyledSelect>
            {supplier.map((suppliers,index) => (
              <option key={index}>{suppliers.name}</option>
            ))}
          </StyledSelect>
        </div>
        <ButtonContainer>
          <StyledButton onClick={handleSearch}>Search</StyledButton>
          <StyledButton onClick={() => setVisible(true)}>Add Item</StyledButton>
        </ButtonContainer>
      </StyledDiv>
      <div>
        <h3>Item List:</h3>
        <div>
          <table className="table table-bordered table-striped table-hover shadow">
            <thead className="table-secondary">
              <tr>
                <th>Item Name</th>
                <th>Supplier</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Stock</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>{item.supplier?.name || "N/A"}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{item.stock}</td>
                  <td>{item.unit}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="buttons-group">
                      <button
                        className="btns"
                        onClick={() => handleEditItem(item)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="btns"
                        onClick={() => handleShowItemPrice(item)}
                      >
                        <BiPackage />
                      </button>
                      <button
                        className="btns"
                        onClick={() => handleDelete(item._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="btns"
                        onClick={() => handleShowStock(item)}
                      >
                        <BiInfoCircle />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddItem
          setVisible={setVisible}
          supplier={supplier}
          editingItem={editingItem}
          loadItems={loadItems}
        />
      </Modal>
      <Modal
        open={showStock}
        onOk={() => setShowStock(false)}
        onCancel={() => setShowStock(false)}
        footer={null}
      >
        <ItemStockUtilization item={selectedItem} />
      </Modal>
      <Modal
        open={showItem}
        onOk={() => setShowItem(false)}
        onCancel={() => setShowItem(false)}
        footer={null}
      >
        <ItemPrice setShowItem={setShowItem} item={selectedItem}/>
      </Modal>
    </>
  );
}

export default ManageItem;
