// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import SalesOrder from "./CustomerPo";
// import { BiEdit, BiTrash } from "react-icons/bi";
// import { Modal } from "antd";
// import axios from "axios";
// import toast from "react-hot-toast";

// // Styled components
// const StyledDiv = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const StyledSelect = styled.select`
//   width: 200px;
//   height: 40px;
//   background-color: white;
//   color: #333;
//   padding-left: 10px;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;
//   margin: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const StyledLabel = styled.label`
//   font-size: 16px;
//   margin: 10px;
// `;

// const StyledInput = styled.input`
//   width: 200px;
//   height: 40px;
//   background-color: white;
//   color: #333;
//   padding-left: 10px;
//   font-size: 16px;
//   border: none;
//   border-radius: 5px;
//   margin: 10px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   padding: 20px;
//   gap: 15px;
// `;

// const StyledButton = styled.button`
//   font-size: 16px;
//   color: #ffffff;
//   background-color: #4e647b;
//   border: none;
//   padding: 10px;
//   border-radius: 5px;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:focus {
//     outline: none;
//   }
// `;

// function Sales() {
//   const [visible, setVisible] = useState(false);
//   const [customerpo, setCustomerpo] = useState([]);
//   const [editingCpo, setEditingCpo] = useState(null);

//   useEffect(() => {
//     loadCpo();
//   }, []);

//   const loadCpo = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8000/api/customerpos");
//       setCustomerpo(data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleEditItem = (item) => {
//     setEditingCpo(item);
//     setVisible(true);
//   };

//   const handleDelete = async (itemId) => {
//     try {
//       const { data } = await axios.delete(`http://localhost:8000/api/customerpos/${itemId}`);
//       if (data?.error) {
//         toast.error(data.error);
//       } else {
//         toast.success(`${data.item.customern.name} is deleted`); // Display customer name
//         loadCpo();
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <h1>Manage Customer PO</h1>
//       <StyledDiv>
//         <StyledSelect>
//           {customerpo.map((po) => (
//             <option key={po._id} value={po._id}>
//               {po.customern?.name} {/* Access customer name */}
//             </option>
//           ))}
//         </StyledSelect>
//         <StyledLabel htmlFor="orderDate">Order Date:</StyledLabel>
//         <StyledInput
//           type="date"
//           id="orderDate"
//           value={""}
//           onChange={""}
//         />
//         <StyledSelect>
//           {customerpo.map((invoice, index) => (
//             <option key={index} value={invoice.customerpo}>
//               {invoice.customerpo}
//             </option>
//           ))}
//         </StyledSelect>
//         <ButtonContainer>
//           <StyledButton onClick={() => { /* handleSearch function */ }}>Search</StyledButton>
//           <StyledButton onClick={() => setVisible(true)}>
//             Add Customer PO
//           </StyledButton>
//         </ButtonContainer>
//       </StyledDiv>
//       <div>
//         <h3>Customer PO List:</h3>
//         <table className="table table-bordered table-striped">
//           <thead className="table-secondary">
//             <tr>
//               <th>Customer Name</th>
//               <th>Invoice No</th>
//               <th>Date</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {customerpo.map((c, index) => (
//               <tr key={index}>
//                 <td>{c.customern?.name}</td> {/* Display customer name */}
//                 <td>{c.customerpo}</td>
//                 <td>{new Date(c.date).toLocaleDateString()}</td> {/* Format date */}
//                 <td>{c.total}</td>
//                 <td>{c.status}</td>
//                 <td>
//                   <div className="buttons-group">
//                     <button onClick={() => handleEditItem(c)} className="btns">
//                       <BiEdit />
//                     </button>
//                     <button onClick={() => handleDelete(c._id)} className="btns">
//                       <BiTrash />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Modal
//         open={visible}
//         onOk={() => setVisible(false)}
//         onCancel={() => setVisible(false)}
//         footer={null}
//       >
//         <SalesOrder editingCpo={editingCpo} />
//       </Modal>
//     </>
//   );
// }

// export default Sales;


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SalesOrder from "./CustomerPo";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Modal } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

// Styled components
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

function Sales() {
  const [visible, setVisible] = useState(false);
  const [customerpo, setCustomerpo] = useState([]);
  const [editingCpo, setEditingCpo] = useState(null);
  const [orderDate, setOrderDate] = useState("");

  useEffect(() => {
    loadCpo();
  }, []);

  const loadCpo = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/customerpos");
      setCustomerpo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditItem = (item) => {
    setEditingCpo(item);
    setVisible(true);
  };

  const handleDelete = async (itemId) => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/customerpos/${itemId}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.item.customern.name} is deleted`); // Display customer name
        loadCpo();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>Manage Customer PO</h1>
      <StyledDiv>
        <StyledSelect>
          {customerpo.map((po) => (
            <option key={po._id} value={po._id}>
              {po.customern?.name} {/* Access customer name */}
            </option>
          ))}
        </StyledSelect>
        <StyledLabel htmlFor="orderDate">Order Date:</StyledLabel>
        <StyledInput
          type="date"
          id="orderDate"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)} // Update the state with the selected date
        />
        <StyledSelect>
          {customerpo.map((invoice, index) => (
            <option key={index} value={invoice.customerpo}>
              {invoice.customerpo}
            </option>
          ))}
        </StyledSelect>
        <ButtonContainer>
          <StyledButton onClick={() => { /* handleSearch function */ }}>Search</StyledButton>
          <StyledButton onClick={() => setVisible(true)}>
            Add Customer PO
          </StyledButton>
        </ButtonContainer>
      </StyledDiv>
      <div>
        <h3>Customer PO List:</h3>
        <table className="table table-bordered table-striped">
          <thead className="table-secondary">
            <tr>
              <th>Customer Name</th>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {customerpo.map((c, index) => (
              <tr key={index}>
                <td>{c.customern?.name}</td> {/* Display customer name */}
                <td>{c.customerpo}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td> {/* Format date */}
                <td>{c.total}</td>
                <td>{c.status}</td>
                <td>
                  <div className="buttons-group">
                    <button onClick={() => handleEditItem(c)} className="btns">
                      <BiEdit />
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="btns">
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
        <SalesOrder editingCpo={editingCpo} />
      </Modal>
    </>
  );
}

export default Sales;
