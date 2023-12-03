import styled from "styled-components";
import PersonalizedButton from "../PersonalizedButton";

const FormContainer = styled.div`
    display: grid;
    place-items: center;
    margin-top: 5em;
`

const FormLogin = styled.form`
    background-color: #f5f5f5;
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
        border: 1px solid #ddd;
        width: 95%;
    }
`

function Form(props) {
    return(
        <FormContainer>
            <FormLogin onSubmit={(e) => props.sendRequest(e)}>
                <label htmlFor="login">Login</label>
                <input type="text" id="login" required onChange={(e) => props.setLogin(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required onChange={(e) => props.setPassword(e.target.value)}/>

                <PersonalizedButton text='Login'/>
            </FormLogin>
        </FormContainer>
    )
}

export default Form;