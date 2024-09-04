
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PurchaseOrder from "./PurchaseOrder";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Modal } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";

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

const StyledLabel = styled.label`
  font-size: 16px;
  margin: 10px;
`;

const StyledInput = styled.input`
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



function ManagePurchase() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [purchaseData, setPurchaseData] = useState([]);
  const [purchaseEditing, setPurchaseE] = useState(null);


  useEffect(() => {
    loadPurchase();
  }, [])

  const loadPurchase = async () => {
    try {
      const { data } = await axios.get("https://project-management-final-udxp.onrender.com/api/purchases")
      console.log(data);
      
      setPurchaseData(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleDelete = async (itemId) => {
    try {
      const { data } = await axios.delete(`https://project-management-final-udxp.onrender.com/api/purchases/${itemId}`);
      console.log(data);

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.item.customer?.name} is deleted`);
        loadPurchase();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditPurchase = (item) => {
    setPurchaseE(item);
    setVisible(true);
  };
  return (
    <>
      <h1>Manage Purchases</h1>
      <StyledDiv>
        <StyledSelect>
          <option>customer </option>

        </StyledSelect>
        <StyledLabel htmlFor="orderDate">Order Date:</StyledLabel>
        <StyledInput
          type="date"
          id="orderDate"
          value={selectedDate}
          onChange={"handleDateChange"}
        />
        <StyledSelect>
          <option></option>
          <option></option>
          <option></option>
        </StyledSelect>
        <ButtonContainer>
          <StyledButton onClick={""}>Search</StyledButton>
          <StyledButton onClick={() => setVisible(true)}>Add Purchase Order</StyledButton>
        </ButtonContainer>
      </StyledDiv>
      <div>
        <h3>Order List:</h3>
        <table className="table table-bordered table-striped">          <thead className="table-secondary">
          <tr>
            <th>Customer Name</th>
            <th>Purchase Order</th>
            <th>Customer PO</th>
            <th>Total Purchase</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
          <tbody>
            {purchaseData.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.customer?.name}</td>
                <td>{purchase.purchase}</td>
                <td>{purchase.customerpo}</td>
                <td>{purchase.total}</td>
                <td>{purchase.date}</td>
                {/* <td>{moment(purchase?.date).fromNow}</td> */}
                <td>{purchase.status}</td>

                <td>
                  <div className="buttons-group">
                    <button onClick={() => handleEditPurchase(purchase)} className="btns">
                      <BiEdit />
                    </button>
                    <button onClick={() => handleDelete(purchase._id)} className="btns">
                      <BiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <PurchaseOrder
          purchaseEditing={purchaseEditing}
        />
      </Modal>
    </>
  );
}

export default ManagePurchase;

