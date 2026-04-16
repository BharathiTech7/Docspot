import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import p2 from '../../images/p2.png';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from 'mdb-react-ui-kit';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    type: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/register', user);
      if (res.data.success) {
        message.success('Registered Successfully');
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-white shadow-sm py-3" style={{ borderBottom: '1px solid #eaeaea' }}>
        <Container fluid className="px-4 px-md-5">
          <Navbar.Brand>
            <Link to="/" className="fw-bold fs-3 text-dark text-decoration-none">
              <span style={{ color: '#2b6cb0' }}>Doc</span>Spot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 shadow-none" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center gap-4">
              <Link to="/" className="text-dark fw-semibold text-decoration-none custom-nav-link">Home</Link>
              <Link to="/login" className="text-dark fw-semibold text-decoration-none custom-nav-link">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-dark text-white text-decoration-none fw-bold rounded shadow-sm custom-reg-btn">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <MDBContainer className="my-5">
        <MDBCard style={{ border: 'none' }}>
          <MDBRow style={{ background: 'rgb(190, 203, 203)' }} className="g-0 border-none p-3">
            <MDBCol md="6">
              <MDBCardBody className="d-flex mx-3 flex-column">
                <div className="d-flex flex-row mb-4">
                  <span className="h1 text-center fw-bold">Sign up to your account</span>
                </div>
                <div className="p-2">
                  <Form onSubmit={handleSubmit} className="w-100">
                    <div className="mb-3">
                      <label className="mb-1 form-label fw-bold" htmlFor="fullNameInput">Full name</label>
                      <MDBInput
                        name="fullName"
                        value={user.fullName}
                        onChange={handleChange}
                        id="fullNameInput"
                        type="text"
                        size="lg"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="mb-1 form-label fw-bold" htmlFor="emailInput">Email</label>
                      <MDBInput
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        id="emailInput"
                        type="email"
                        size="lg"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="mb-1 form-label fw-bold" htmlFor="passwordInput">Password</label>
                      <MDBInput
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        id="passwordInput"
                        type="password"
                        size="lg"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="mb-1 form-label fw-bold" htmlFor="phoneInput">Phone</label>
                      <MDBInput
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        id="phoneInput"
                        type="text"
                        size="lg"
                      />
                    </div>

                    <Container className="my-4 d-flex justify-content-around">
                      <MDBRadio
                        name="type"
                        id="adminRadio"
                        checked={user.type === 'admin'}
                        value="admin"
                        onChange={handleChange}
                        label={<span className="fw-bold">Admin</span>}
                        inline
                      />
                      <MDBRadio
                        name="type"
                        id="userRadio"
                        checked={user.type === 'user'}
                        value="user"
                        onChange={handleChange}
                        label={<span className="fw-bold">User</span>}
                        inline
                      />
                    </Container>

                    <div className="d-grid mt-4">
                      <Button className="mb-4 bg-dark py-2 fs-5 border-0" variant="dark" size="lg" type="submit">
                        Register
                      </Button>
                    </div>
                  </Form>
                  
                  <p className="mb-5 pb-md-2 text-center" style={{ color: '#393f81' }}>
                    Have an account? <Link to="/login" style={{ color: '#393f81', fontWeight: "bold" }}>Login here</Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardImage
                style={{ mixBlendMode: 'darken' }}
                src={p2}
                alt="register form"
                className="rounded-start w-100"
              />
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default Register;
