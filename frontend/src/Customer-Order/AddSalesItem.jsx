import axios from "axios";
import { useEffect, useState } from "react";
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

function AddSalesItem({setAddClick, setEditing}) {
  const [itempo, setCustometpo] = useState([]);
  

  useEffect(() => {
    loadCPo();
  }, []);

  const loadCPo = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/itempos");
      setCustometpo(data);
      console.log(data)
    } catch (err) {
      console.error('Error loading items:', err);
      toast.error('Failed to load items');
    }
  };
  
  const handleDelete = async (itemId) => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/itempos/${itemId}`);
      console.log(data);
             
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.item.item} is deleted`);
        loadCPo();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditItem = (item) => {
    setEditing(item);
    setAddClick(true);
  };


  return (
    <Table>
      <thead>
        <HeadTr>
          <Th>Item</Th>
          <Th>Qty</Th>
          <Th>Unit Cost</Th>
          <Th>Tax</Th>
          <Th>Sales Price</Th>
          <Th>Action</Th>
        </HeadTr>
      </thead>
      <tbody>
        {itempo?.map((i, index) => {
          const cost = Number(i.cost);
          const tax = Number(i.tax);
         const salesPrice = i.altqty * cost + tax;
          return (
            <Tr key={index}>
              <Td>{i.item}</Td>
              <Td>{i.altqty}</Td>
              <Td>{i.cost}</Td>
              <Td>{i.tax}</Td>
              <Td>{salesPrice}</Td>
              <Td>
                <button className="btns" onClick={()=>handleEditItem(i)}>Edit</button>
                <button className="btns" onClick={()=> handleDelete(i._id)}>Delete</button>
              </Td>
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default AddSalesItem;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import styled from "styled-components";

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const Th = styled.th`
//   border: 1px solid #ddd;
//   padding: 8px;
//   text-align: left;
// `;

// const Td = styled.td`
//   border: 1px solid #ddd;
//   padding: 8px;
// `;

// const Tr = styled.tr`
//   &:nth-child(even) {
//     background-color: #f2f2f2;
//   }
// `;

// const HeadTr = styled(Tr)`
//   background-color: #5c9c5e;
//   color: white;
// `;

// function AddSalesItem({ setAddClick, setEditing }) {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     loadItems();
//   }, []);

//   const loadItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/itempos");
//       setItems(response.data);
//       console.log("Items loaded:", response.data);
//     } catch (err) {
//       console.error('Error loading items:', err);
//       toast.error('Failed to load items. Please check server logs for details.');
//     }
//   };

//   const handleDelete = async (itemId) => {
//     try {
//       const response = await axios.delete(`http://localhost:8000/api/itempos/${itemId}`);
//       const deletedItem = response.data;

//       if (deletedItem?.error) {
//         toast.error(deletedItem.error);
//       } else {
//         toast.success(`${deletedItem.item.item} is deleted`);
//         loadItems(); // Reload items after deletion
//       }
//     } catch (err) {
//       console.error('Error deleting item:', err);
//       toast.error('Failed to delete item. Please try again.');
//     }
//   };

//   const handleEditItem = (item) => {
//     setEditing(item);
//     setAddClick(true);
//   };

//   return (
//     <Table>
//       <thead>
//         <HeadTr>
//           <Th>Item</Th>
//           <Th>Qty</Th>
//           <Th>Unit Cost</Th>
//           <Th>Tax</Th>
//           <Th>Sales Price</Th>
//           <Th>Action</Th>
//         </HeadTr>
//       </thead>
//       <tbody>
//         {items?.map((i, index) => {
//           const cost = Number(i.cost);
//           const tax = Number(i.tax);
//           const salesPrice = i.altqty * cost + tax;
//           return (
//             <Tr key={index}>
//               <Td>{i.item}</Td>
//               <Td>{i.altqty}</Td>
//               <Td>{i.cost}</Td>
//               <Td>{i.tax}</Td>
//               <Td>{salesPrice}</Td>
//               <Td>
//                 <button className="btns" onClick={() => handleEditItem(i)}>Edit</button>
//                 <button className="btns" onClick={() => handleDelete(i._id)}>Delete</button>
//               </Td>
//             </Tr>
//           );
//         })}
//       </tbody>
//     </Table>
//   );
// }

// export default AddSalesItem;
