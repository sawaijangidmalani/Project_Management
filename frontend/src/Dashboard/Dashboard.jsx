
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function isDateString(dateString) {
  return !isNaN(Date.parse(dateString));
}

function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear(); 
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  gap: 10px;
`;

const StyledSelect = styled.select`
  width: 180px;
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

const StyledTable = styled.table`
  width: 370px;
  font-size: 18px;
`;

const StyledInput = styled.input`
  width: 100px;
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

function Dashboard() {

  const [cpo, setCpo] = useState([]);
  const cpoAmount = cpo.reduce((acc, item) => acc + (item.qty * item.price), 0);

  const [purchasePo, setPurchase] = useState([]);
  const orderAmount = purchasePo.reduce((acc, sale) => acc + (sale.qty * sale.price), 0);
  //const RemAmount = rems.reduce((acc, rem) => acc + (rem.qty * rem.price), 0);
  
  useEffect(()=>{
    loadCPO();
    loadPPO();
  },[])
  const loadCPO = async() => {
    try{
      const {data} = await axios.get("http://localhost:8000/api/itempos")
      setCpo(data);
    } catch(err){
      console.log(err);
      
    }
  }
  const loadPPO = async() => {
    try{
      const {data} = await axios.get("http://localhost:8000/api/itemppos")
      setPurchase(data);
    } catch(err){
      console.log(err);
      
    }
  }
  function handleDateChange(event) {
    const selectedDate = event.target.value;
    if (isDateString(selectedDate)) {
      console.log("Valid date:", selectedDate);
    } else {
      console.log("Invalid date:", selectedDate);
    }
  }

  const todayDate = getTodayDate();

  return (
    <>
      <h1>Dashboard - Profit & Loss</h1>
      <StyledDiv>
        <div>
          <StyledSelect value="customer name">
            <option>Customer 1</option>
            <option>Customer 2</option>
            <option>Customer 3</option>
          </StyledSelect>
          <StyledLabel htmlFor="orderDate">Order Date:</StyledLabel>
          <StyledInput
            type="date"
            id="orderDate"
            onChange={handleDateChange}
            max={todayDate}
          />
          To
          <StyledInput
            type="date"
            id="endDate"
            onChange={handleDateChange}
            max={todayDate}
          />
          <StyledSelect>
            <option>Customer PO1</option>
            <option>Customer PO2</option>
            <option>Customer PO3</option>
          </StyledSelect>
          <StyledSelect>
            <option>cpo order 1</option>
            <option>cpo order 2</option>
            <option>cpo order 3</option>
          </StyledSelect>
        </div>
        <ButtonContainer>
          <StyledButton>Search</StyledButton>
        </ButtonContainer>
      </StyledDiv>
      
      <StyledDv>
        <div className="tables">
          <h3>Customer PO Details:</h3>
          <StyledTable className="table table-bordered table-striped table-hover shadow">
            <thead className="table-secondary">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cpo?.map((item) => (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.avlqty}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          
          <h3>Order Amount: </h3>
        </div>
        <div>
          <h3>Purchase Order</h3>
          <StyledTable className="table table-bordered table-striped table-hover shadow">
            <thead className="table-secondary">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {purchasePo.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.item}</td>
                  <td>{sale.avlqty}</td>
                  <td>{sale.pprice}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <h3>Item Cost : {cpoAmount}</h3>
        </div>
        <div>
          <h3>Remaining Purchase Order</h3>
          <StyledTable className="table table-bordered table-striped table-hover shadow">
            <thead className="table-secondary">
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {purchasePo.map((rem) => (
                <tr key={rem.id}>
                  <td>{rem.item}</td>
                  <td>{rem.remqty}</td>
                  <td>{rem.pprice}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>
          <h3>Remaining cpo: </h3>
        </div>
      </StyledDv>
      
      <h2>Profit/Loss: {(orderAmount - cpoAmount)}</h2>
    </>
  );
}

export default Dashboard;
