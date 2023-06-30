import { LinksContainer, StyledLink } from 'components/NavBar/NavBar.styled';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from 'redux/auth/operations';

function NavBar() {
  const { isLoggedIn, token } = useSelector(state => state.auth);
 const dispatch = useDispatch();

  const onLogout = () => {
    console.log('loggedout');
    dispatch(logout(token));
  };

  return (
    <LinksContainer>
      {isLoggedIn ? (
        <li>
          <StyledLink to="/contacts"> Contacts </StyledLink>
          <StyledLink to="/" onClick={onLogout}>
            
            Logout
          </StyledLink>
        </li>
      ) : (
        <>
          <li>
            <StyledLink to="/register"> Register </StyledLink>
          </li>
          <li>
            <StyledLink to="/login"> Login </StyledLink>
          </li>
        </>
      )}
    </LinksContainer>
  );
}
export default NavBar;
