import Form from "../../components/Form";
import Header from "../../components/Header";
import Title from "../../components/Title";
import styled from "styled-components";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
    padding: 2em;
`

function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function sendRequest(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: login,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Header />
            <LoginContainer>
                <Title title="Login"/>
                <Form setLogin={setLogin} setPassword={setPassword} sendRequest={sendRequest} />
            </LoginContainer>
        </div>
    )
}

export default Login;
