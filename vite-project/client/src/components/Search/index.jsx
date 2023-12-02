import styled from "styled-components";
import { FaSistrix } from "react-icons/fa6";

const StylizedForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3em;
`

const StylizedInput = styled.input`
    padding: 20px 12px;
    width: 634px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 6px;
    color: #333;
    position: relative;
`

const StylizedButton = styled.button`
    background-color: transparent;
    border: none;
    position: absolute;
    right: 450px;
`

function Search() {
    return (
        <StylizedForm>
            <StylizedInput placeholder="Search for Region (e.g., Europe)" />
            <StylizedButton type="submit"><FaSistrix style={{color: '#FFF', fontSize: '22px'}}/></StylizedButton>
        </StylizedForm>
    )
}

export default Search;