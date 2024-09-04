import { useEffect, useState } from "react";
import styled from "styled-components";
import AddCustomer from "./AddCustomer";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Modal, Popconfirm,Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";


const { Option } = Select;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledIn = styled.input`
  width: 200px;
  height: 40px;
  margin-top: 15px;
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
  font-size: 15px;
  font-weight: 800;
  color: #fffcfc;
  background-color: #124E66;
  margin-top: 15px;
  height: 50px;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(8, 65, 83);
  }

  &:focus {
    outline: none;
  }
`;

function ManageCustomer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [visible, setVisible] = useState(false);
  const [editingCustomers, setEditingCustomers] = useState(null);
  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    loadCustomers();
  };
  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSearch = () => {
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Update the state with filtered customers
    setCustomers(filteredCustomers);
  };

  const loadCustomers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/customers");
      setCustomers(data);
      //console.log(data)
    } catch (err) {
      console.log(err);
   }
    
  };

  const handleDelete = async (customerId) => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/customers/${customerId}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        loadCustomers();
        toast.success(`"${data.name}" is deleted`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEditCustomer = (customers) => {
    setEditingCustomers(customers);
    setVisible(true);
  };
  return (
    <>
      <div className="container mt-4">
        <h1>Manage Customers</h1>
        <StyledDiv>
          <div>
          {/* <Select variant="false" className="form-select mb-3" size="large" placeholder="choose categories" showSearch value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}>
          {customers.map((customer) => (
                <Option key={customer.id}>{customer.name}</Option> ))}
            </Select> */}
            <StyledSelect
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            >
              {customers.map((customer) => (
                <option key={customer.id}>{customer.name}</option>
              ))}
            </StyledSelect>
          </div>
          <ButtonContainer>
            <StyledIn
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search by name..."
            />
            <StyledButton onClick={() => handleSearch()}>Search</StyledButton>
            <StyledButton onClick={() => setVisible(true)}>Add Customer</StyledButton>
          </ButtonContainer>
        </StyledDiv>

        <div>
          <h3>Customer List:</h3>
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
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.area}</td>
                  <td>{customer.status}</td>
                  <td>
                    <div className="buttons-group">
                    <button className="btns" onClick={() => handleEditCustomer(customer)}>
                      <BiSolidEdit/>
                    </button>
                    <Popconfirm 
                     placement="topLeft"
                    title={`${customer.name} is Delete!!`}
                    description="Are you sure to delete this customer?"
                    onConfirm={() => handleDelete(customer._id)}
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
          <AddCustomer editingCustomer={editingCustomers} setVisible={setVisible} loadCustomers={loadCustomers}/>
        </Modal>
      </div>
    </>
  );
}

export default ManageCustomer;
