import styled from "styled-components";
import Title from "../../components/Title";
import Header from "../../components/Header";
import PersonalizedButton from "../../components/PersonalizedButton";
import { useState } from "react";

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
    const [countryName, setCountryName] = useState('');
    const [language, setLanguage] = useState('');
    const [region, setRegion] = useState('');

    async function sendRequest(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://localhost:3000/country', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    countryName: countryName,
                    language: language,
                    region: region
                }),
            });

            if (!response.ok) {
                throw new Error('Error');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <Header />
            <CountryContainer>
                <Title title='Add Countries'/>
                <FormContainer>
                    <Form onSubmit={(e) => sendRequest(e)}>
                        <label htmlFor="countryName">Country Name</label>
                        <input type="text" id="countryName" onChange={(e) => setCountryName(e.target.value)}/>

                        <label htmlFor="language">Language</label>
                        <input type="text" id="language" onChange={(e) => setLanguage(e.target.value)}/>

                        <label htmlFor="region">Region</label>
                        <input type="text" id="region" onChange={(e) => setRegion(e.target.value)}/>

                        <PersonalizedButton text="Add"/>
                    </Form>
                </FormContainer>
            </CountryContainer>
        </div>
    )
}

export default Country;