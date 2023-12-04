import styled from "styled-components";
import Logo from "../Logo";
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    padding: 32px;
    background-color: #f5f5f5; 
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const LinksContainer = styled.div`
    display: flex;
    gap: 2em;
`

const StylizedLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-size: 18px;
    font-weight: 600;
`

function Header() {
    return(
        <HeaderContainer>
            <Logo />
            <LinksContainer>
                <StylizedLink to='/'>Login</StylizedLink>
                <StylizedLink to='/country'>Add Countries</StylizedLink>
            </LinksContainer>
        </HeaderContainer>
    )
}

export default Header;