import styled from "styled-components";
import { Link } from 'react-router-dom';

const StylizedLink = styled(Link)`
    text-decoration: none;
`

function Logo() {
    return(
        <StylizedLink to='/'>InfoCountries</StylizedLink>
    )
}

export default Logo;