import Form from "../../components/Form";
import Header from "../../components/Header";
import Title from "../../components/Title";
import styled from "styled-components";

const LoginContainer = styled.div`
    padding: 2em;
`

function Login() {
    return (
        <div>
            <Header />
            <LoginContainer>
                <Title title="Login"/>
                <Form />
            </LoginContainer>
        </div>
    )
}

export default Login;