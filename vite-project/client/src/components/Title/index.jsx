import styled from "styled-components";

const StylizedTitle = styled.h1`
    color: #333; 
    font-size: 28px;
    text-align: center;
`

function Title(props) {
    return (
        <StylizedTitle>{props.title}</StylizedTitle>
    )
}

export default Title;