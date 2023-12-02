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
`

const Region = styled.p`
    width: 20%;
    color: #ACACAC;
    line-height: 24px;
`

const Currency = styled.h4`

`

function Country() {
    return(
        <StylizedCountry>
            <Title>Germany</Title>
            <Currency>EUR</Currency>
            <Region>Europe</Region>
        </StylizedCountry>
    )
}

export default Country;