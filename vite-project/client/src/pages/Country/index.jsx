import styled from "styled-components";
import Title from "../../components/Title";
import Header from "../../components/Header";
import PersonalizedButton from "../../components/PersonalizedButton";

const FormContainer = styled.div`
    display: grid;
    place-items: center;
    margin-top: 5em;
`

const Form = styled.form`
    background-color: #f5f5f5; /* Cor de fundo mais clara */
    padding: 24px;
    border-radius: 16px;
    width: 30vw;

    label {
        display: block;
        margin-bottom: 10px;
    }

    input {
        display: block;
        margin-bottom: 2em;
        padding: 10px;
        border-radius: 10px;
        border: none;
        width: 95%;
    }
`

const CountryContainer = styled.div`
    padding: 3em;
`

function Country() {
    return(
        <div>
            <Header />
            <CountryContainer>
                <Title title='Add Countries'/>
                <FormContainer>
                    <Form>
                        <label htmlFor="countryName">Country Name</label>
                        <input type="text" id="countryName"/>

                        <label htmlFor="currency">Currency</label>
                        <input type="text" id="currency"/>

                        <label htmlFor="region">Region</label>
                        <input type="text" id="region"/>

                        <PersonalizedButton text="Add"/>
                    </Form>
                </FormContainer>
            </CountryContainer>
        </div>
    )
}

export default Country;