import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { ReactComponent as CloseIcon } from '../assets/icon/close.svg';
import { useDispatch } from 'react-redux';
import { login } from 'src/store/slices/authSlice';
import { useNavigate } from 'react-router';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(68, 68, 68, 0.25);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    width: 400px;
    height: 240px;
    background: #fff;
    border-radius: 5px;
    position: relative;
`;

const Title = styled.h3`
    text-align: center;
    margin: 50px 0;
`;

const Button = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    padding: 4px;
    background: #fff;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    width: 200px;
    margin: 0 auto;
`;

const LoginModal = (props: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const { open, setOpen } = props;

    const dispath = useDispatch();

    const navigate = useNavigate();

    return (
        <Container>
            <Modal>
                <Title>Login</Title>
                <Button onClick={() => setOpen(false)}><CloseIcon width='14px' height='14px' /></Button>
                <ButtonWrapper>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            dispath(login({ credentail: credentialResponse.credential }));
                            setOpen(false);
                            navigate('/');
                        }}
                        onError={() => { console.log('Login Failed'); }}
                    />
                </ButtonWrapper>
            </Modal>
        </Container>
    )
}

export default LoginModal;