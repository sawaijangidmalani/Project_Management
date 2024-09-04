import { useEffect, useState } from "react";
import styled from "styled-components";
import AddSuppliers from "./AddSuppliers";
import Spinner from "../pages/Spinner";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Modal, Popconfirm } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
//import { BiSolidEdit } from "react-icons/bi";
//import { MdDelete } from "react-icons/md";

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

const StyledIn = styled.input`
  width: 200px;
  margin-top: 15px;
`;

function ManageSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSuppliers, setEditingSuppliers] = useState(null);
  const [visible, setVisible] = useState(false);

 //if(setShowModal) return <Spinner/>;
 const handleInputChange = (e) => {
  setSearchTerm(e.target.value);
};

  const handleSearch = () => {
    const filteredSuppliers = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuppliers(filteredSuppliers);
  };
  
  const handleEditSupplier = (suppliers) => {
    setEditingSuppliers(suppliers);
    setVisible(true);
  };
  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const { data } = await axios.get("https://project-management-final-udxp.onrender.com/api/suppliers");
      setSuppliers(data);
      //console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (supplierId) => {
    try {
      const { data } = await axios.delete(`https://project-management-final-udxp.onrender.com/api/suppliers/${supplierId}`);
         
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadSuppliers();
        toast.success(`"${data.name}" is deleted`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = (e) => {
  };

  return (
    <>
      <div>
        <h1>Manage Suppliers</h1>
        <StyledDiv>
          <StyledSelect
           
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          >
            {" "}
            {suppliers.map((customer) => (
              <option key={customer.id}>{customer.name}</option>
            ))}
          </StyledSelect>
          <ButtonContainer>
            <StyledIn
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search by name..."
            />
            <StyledButton onClick={handleSearch}>Search</StyledButton>
            <StyledButton onClick={() => setVisible(true)}>
              Add Supplier
            </StyledButton>
          </ButtonContainer>
        </StyledDiv>

        <div>
          <h3> Suppliers List:</h3>
          <table className="table table-bordered table-striped table-hover shadow">
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.area}</td>
                  <td>{supplier.status}</td>
                  <td>
                    <div className="buttons-group">
                    <button className="btns" onClick={() => handleEditSupplier(supplier)}>
                      <BiSolidEdit/>
                    </button>
                    <Popconfirm 
                     placement="topLeft"
                    title={`${supplier.name} is Delete!!`}
                    description="Are you sure to delete this supplier?"
                    onConfirm={() => handleDelete(supplier._id)}
                    onCancel={cancel}
                    okText="Delete">
                      <button className="btns">
                        <MdDelete />
                      </button>
                      </Popconfirm>
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
          <AddSuppliers
            editingSuppliers={editingSuppliers} setVisible={setVisible}
          />
        </Modal>
         
       
      </div>
    </>
  );
}
export default ManageSupplier;
