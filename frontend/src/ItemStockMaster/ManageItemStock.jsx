
import styled from "styled-components";
import { useState } from "react";
import AddItem from "../Item-Master/AddItem";
import ItemStockDetail from "./ItemStockDetail";
import ItemPrice from "../Item-Master/ItemPrice";
import { BiPackage, BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

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

function ManageItemStock() {
  const [items, setItem] = useState([
    {
      id: 1,
      item: "tv",
      date: new Date().toLocaleDateString(),
      supplier: "Pm traders",
      category: "electric",
      brand: "samsung",
      price: 15000,
      unit: "pcs",
      qty: 55,
    },
    {
      id: 2,
      item: "phone",
      date: "22.4.2024",
      supplier: "mr traders",
      category: "electric",
      brand: "apple",
      price: 85000,
      unit: "pcs",
      qty: 55,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showStock, setShowStock] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filteredItem = items.filter((item) =>
      item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setItem(filteredItem);
  };

  const handleDelete = (id) => {
    const updatedItem = items.filter((item) => item.id !== id);
    setItem(updatedItem);
  };

  const handleAddCustomer = () => {
    setShowModal((show) => !show);
  };

  const handleItemdetail = () => {
    setShowStock((show) => !show);
  };

  const handleEdit = () => {
    setShowEdit((show) => !show);
  };

  const closeModel = () => {
    setShowEdit(false);
  };

  return (
    <>
      <h1>Manage Items Stock:</h1>
      <StyledDiv>
        <div>
          <StyledSelect
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          >
            {items.map((item) => (
              <option key={item.id}>{item.item}</option>
            ))}
          </StyledSelect>
          <StyledSelect>
            {items.map((item) => (
              <option key={item.id}>{item.supplier}</option>
            ))}
          </StyledSelect>
        </div>
        <ButtonContainer>
          <StyledButton onClick={handleSearch}>Search</StyledButton>
          <StyledButton onClick={handleAddCustomer}>
            Add Item Stock
          </StyledButton>
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
                <th>Unit</th>
                <th>Available Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.supplier}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>{item.unit}</td>
                  <td>{item.qty}</td>
                  <td>
                    <div className="buttons-group">
                      <button className="btns" onClick={handleEdit}>
                        <BiSolidEdit />
                      </button>
                      <button
                        className="btns"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete />
                      </button>
                      <button className="btns" onClick={handleItemdetail}>
                        <BiPackage />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <AddItem items={items} setItem={setItem} />}
      {showStock && <ItemStockDetail items={items} setItem={setItem} />}
      {showEdit && <ItemPrice onClose={closeModel} />}
    </>
  );
}

export default ManageItemStock;
