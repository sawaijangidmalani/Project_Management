import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
const HeadTr = styled(Tr)`
  background-color: #5c9c5e;
  color: white;
`;

function AddPurchaseItem({setEditpo,setShowAddOrEdit}) {
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    loaditems();
    loadPrice();
  }, []);

  const loaditems = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/itemppos");
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (itemId) => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/itemppos/${itemId}`);
             console.log(data);
             
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.item.item} is deleted`);
        loaditems();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loadPrice = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/itemprices");
      setPrices(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleEditItem = (item) => {
    setEditpo(item);
    setShowAddOrEdit(true);
  };
  return (
    <Table>
      <thead>
        <HeadTr>
          <Th>Item</Th>
          <Th>Qty</Th>
          <Th>Unit Cost</Th>
          <Th>Purchase Price</Th>
          <Th>Invoice No</Th>
          <Th>Invoice Date</Th>
          <Th>Action</Th>
        </HeadTr>
      </thead>
      <tbody>
        {items?.map((item) => {
        //const purchasePrice = item.altqty * item.cost;
        return (
          <Tr key={item.id}>
            <Td>{item.item}</Td>
            <Td>{item.altqty}</Td>
            <Td>{item.cost}</Td>
            <Td>{item.pprice}</Td>
            <Td>{item.ivnumber}</Td>
            <Td>{"item.ivdate"}</Td>
            <Td>
              <button className="btns" onClick={()=>handleEditItem(item)}>Edit</button>
              <button className="btns" onClick={()=> handleDelete(item._id)}>Delete</button>
            </Td>
          </Tr>
        )})}
      </tbody>
    </Table>
  );
}

export default AddPurchaseItem;
