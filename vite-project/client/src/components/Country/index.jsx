import styled from "styled-components";

const StylizedCountry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    gap: 3em;
    width: 35%;
    font-color: black;
`

const Title = styled.h2`
    font-weight: 500;
    color: #ACACAC;
`

const Region = styled.p`
    width: 20%;
    color: #ACACAC;
    line-height: 24px;
`

const Language = styled.h4`
    width: 20%;
    color: #ACACAC;
`

function Country(props) {
    return(
        <StylizedCountry>
            <Title>{props.countryName}</Title>
            <Language>{props.language}</Language>
            <Region>{props.region}</Region>
        </StylizedCountry>
    )
}

export default Country;