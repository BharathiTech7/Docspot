import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { message } from 'antd';
import { Button, Form } from 'react-bootstrap';
import photo1 from '../../images/photo1.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '', password: ''
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", user);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userData', JSON.stringify(res.data.userData));
        message.success('Login successfully');
        const isLoggedIn = JSON.parse(localStorage.getItem("userData"));
        const { type } = isLoggedIn

        switch (type) {
          case "admin":
            navigate("/adminHome")
            break;
          case "user":
            navigate("/userhome")
            break;

          default:
            navigate("/Login")
            break;
        }
      }
      else {
        message.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')

    }
  };


  return (
    <>
      <Navbar fixed="top" expand="lg" className="bg-white shadow-sm py-2">
        <Container fluid className="px-4 px-md-5">
          <Navbar.Brand>
            <Link to={'/'} className="fw-bold fs-4 text-dark text-decoration-none">
              <span style={{ color: '#2b6cb0' }}>Doc</span>Spot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="border-0 shadow-none" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto"></Nav>
            <Nav className="align-items-center gap-4">
              <Link to={'/'} className="text-dark fw-semibold text-decoration-none custom-nav-link">Home</Link>
              <Link to={'/login'} className="text-dark fw-semibold text-decoration-none custom-nav-link">Login</Link>
              <Link to={'/register'} className="px-4 py-2 bg-dark text-white text-decoration-none fw-bold rounded shadow-sm custom-reg-btn">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ marginTop: '80px' }}>
        <MDBContainer className="my-5">
          <MDBCard style={{ border: 'none' }}>
            <MDBRow style={{ background: 'rgb(190, 203, 203)' }} className='g-0 border-none p-3'>
            <MDBCol md='6'>
              <MDBCardImage src={photo1} alt="login form" className='rounded-start w-100' />
            </MDBCol>

            <MDBCol md='6'>
              <MDBCardBody className='d-flex mx-5 flex-column justify-content-center'>
                <div className='d-flex flex-row mt-2 mb-5'>
                  <span className="h1 fw-bold mb-0">Sign in to your account</span>
                </div>

                <Form onSubmit={handleSubmit} className="w-100">
                  <div className="mb-4">
                    <label className="form-label mb-1" htmlFor="formControlLgEmail">Email</label>
                    <MDBInput
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      id="formControlLgEmail"
                      type="email"
                      size="lg"
                      autoComplete='off'
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label mb-1" htmlFor="formControlLgPassword">Password</label>
                    <MDBInput
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      id="formControlLgPassword"
                      type="password"
                      size="lg"
                      autoComplete='off'
                    />
                  </div>

                  <div className="d-grid mt-4">
                    <Button className="mb-4 bg-dark py-2 fs-5 border-0" size='lg' type='submit'>
                      Login
                    </Button>
                  </div>
                </Form>

                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                  Don't have an account? <Link to={'/register'} style={{ color: '#393f81', fontWeight: "bold" }}>Register here</Link>
                </p>

              </MDBCardBody>
            </MDBCol>

          </MDBRow>
        </MDBCard>
        </MDBContainer>
      </div>
    </>
  );
}

export default Login;
