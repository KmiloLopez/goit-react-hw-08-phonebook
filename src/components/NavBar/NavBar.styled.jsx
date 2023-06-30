import styled from "styled-components";
import { NavLink} from "react-router-dom";


export const StyledLink = styled(NavLink)`
    color: white;
    font-size: 30px;
    
    &.active {
      color: red;
      
    }
  `;

export const LinksContainer = styled.ul`
display: flex;
    background-color: #cfb5e6;
    list-style:none;
    height: 50px;
    padding-top: 40px;
    padding-left: 40px;
    
`
