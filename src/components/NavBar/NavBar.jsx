import {LinksContainer, StyledLink, } from "components/NavBar/NavBar.styled"


function NavBar(){
    return(
        <LinksContainer>
        <li>
            <StyledLink to="/register"> Register </StyledLink>
          </li>
          <li>
            <StyledLink to="/login"> Login </StyledLink>
          </li>
          <li>
            <StyledLink to="/contacts"> Contacts </StyledLink>
          </li>
        
        </LinksContainer>
    )
}
export default NavBar;