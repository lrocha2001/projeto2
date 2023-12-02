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
    return(
        <div>
            <Header />
            <HomeContainer>
                <Title title='Search Countries'/>
                <Search />
                <CountriesContainer>
                    <Country />
                    <Country />
                </CountriesContainer>
            </HomeContainer>
        </div>
    )
}

export default Home;