import styled from "styled-components";

const StylizedButton = styled.button`
    border: none;
    background-color: #4285f4; 
    padding: 10px;
    border-radius: 5px;
    color: #FFF;
    font-weight: 700;
    width: 100%;
    transition: all 0.2s;

}
`

function PersonalizedButton(props) {
    return (
        <StylizedButton>{props.text}</StylizedButton>
    )
}

export default PersonalizedButton;