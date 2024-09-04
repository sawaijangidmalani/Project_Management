import styled from "styled-components";

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
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

function ItemStockUtilization({ item: selectedItem }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Item Stock Utilization</h2>
      <StyledItem>
        <h4><span>Item Name: </span>{selectedItem.item}</h4>
        <h4><span>Item Category:</span> {selectedItem.category}</h4>
        <h4><span>Brand: </span>{selectedItem.brand}</h4>
      </StyledItem>
      <StyledItem>
        <div>
          <h3>Item Stock:</h3>
          <Table>
            <thead>
              <HeadTr>
                <Th>Date</Th>
                <Th>Qty</Th>
                <Th>Unit</Th>
                <Th>Purchase Price</Th>
              </HeadTr>
            </thead>
            <tbody>
              <Tr>
                <Td>{selectedItem.date}</Td>
                <Td>{selectedItem.stock}</Td>
                <Td>{selectedItem.unit}</Td>
                <Td>{selectedItem.price}</Td>
              </Tr>
            </tbody>
          </Table>
        </div>
        <div>
          <h3>Item Utilization:</h3>
          <Table>
            <thead>
              <HeadTr>
                <Th>PO Date</Th>
                <Th>Qty</Th>
                <Th>Unit</Th>
                <Th>Purchase Order</Th>
              </HeadTr>
            </thead>
            <tbody>
              <Tr>
                <Td>{selectedItem.date}</Td>
                <Td>{selectedItem.qty}</Td>
                <Td>{selectedItem.unit}</Td>
                <Td>{selectedItem.po}</Td>
              </Tr>
            </tbody>
          </Table>
        </div>
      </StyledItem>
      <StyledItem>
        <span>Total Item Stock: {selectedItem.stock} </span>
        <span>Item Utilization: </span>
        <span>Available Stock: </span>
      </StyledItem>
    </>
  );
}

export default ItemStockUtilization;
