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

function Form() {
    return(
        <FormContainer>
            <FormLogin>
                <label htmlFor="user">User</label>
                <input type="text" id="user" required/>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required/>

                <PersonalizedButton text='Login'/>
            </FormLogin>
        </FormContainer>
    )
}

export default Form;