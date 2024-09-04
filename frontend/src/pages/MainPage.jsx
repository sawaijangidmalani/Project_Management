
import { NavLink} from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-top: 25px;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-800);
    font-size: 1.6rem;
    color:darkgray;
    font-weight: 800;
    padding: 1.2rem 1.5rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;
function MainPage(){
  
  return(
  <>
  <NavList>
    <li><StyledNavLink to="/dashboard">  Dashboard</StyledNavLink></li>
    <li><StyledNavLink to="/customer">  Customer</StyledNavLink></li>
    <li><StyledNavLink to="/suppliers">  Suppliers</StyledNavLink></li>
    <li><StyledNavLink to="/items">  Items Master</StyledNavLink></li>
    <li><StyledNavLink to="/sales">  Customer PO</StyledNavLink></li>
    <li><StyledNavLink to="/purchaseorder">  Purchase Order</StyledNavLink></li>
    {/* <li><StyledNavLink to="/itemstock">  Item Stock Master</StyledNavLink></li> */}
  </NavList>
 
  </>)
}
export default MainPage;


