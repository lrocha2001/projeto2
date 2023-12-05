import React, { useState } from 'react';
import styled from "styled-components";
import Title from "../../components/Title";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Country from "../../components/Country";

const HomeContainer = styled.div`
    padding: 2em;
`

const CountriesContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
    gap: 1em;
`

function Home() {
    const [search, setSearch] = useState('');
    const [countriesData, setCountriesData] = useState([]);

    async function sendRequest(e) {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:3000/country/${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
            }) 
    
            const data = await response.json();
    
            if(data && data.countries && data.countries.length === 0){
                console.log("Empty results");
                return;
            }
    
            setCountriesData(data.countries);
            console.log("countriesData = ", countriesData)
        } catch (error) {
            console.log(error);
        }
    
    }

    return(
        <div>
            <Header />
            <HomeContainer>
                <Title title='Search Countries'/>
                <Search setSearch={setSearch} sendRequest={sendRequest} />
                <CountriesContainer>
                    {Array.isArray(countriesData) && countriesData.map((country, index) => <Country key={index} countryName={country.countryName} language={country.language} region={country.region}/>)}
                </CountriesContainer>
            </HomeContainer>
        </div>
    )
}

export default Home;
