import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

function ApplyDoctor({ userId }) {
   const [doctor, setDoctor] = useState({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      specialization: '',
      experience: '',
      fees: '',
      timings: '',
   });

   const handleTimingChange = (_, timings) => {
      setDoctor({ ...doctor, timings });
   };

   const handleChange = (e) => {
      setDoctor({ ...doctor, [e.target.name]: e.target.value })
   }
   const handleSubmit = async () => {
      
      try {
         const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/user/registerdoc`, { doctor, userId: userId }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`
            }
         })
         if (res.data.success) {
            message.success(res.data.message)
         }
         else {
            message.error(res.data.success)
         }
      } catch (error) {
         console.log(error)
         message.error('Something went wrong')
      }
   };

   return (
      <Container className="py-5">
         <div className="bg-white rounded-3 shadow-sm p-4 p-md-5">
            <h2 className='text-center fw-bold mb-5' style={{ color: '#1e293b' }}>Apply for Doctor</h2>
            <Form onFinish={handleSubmit} layout="vertical" className='m-3'>
               <h5 className='mb-4 fw-bold text-primary border-bottom pb-2 font-monospace'>1. PERSONAL DETAILS</h5>
               <Row gutter={[24, 0]}>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Full Name</span>} required>
                        <Input name='fullName' size="large" value={doctor.fullName} onChange={handleChange} placeholder='Enter your full name' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Phone Number</span>} required>
                        <Input value={doctor.phone} size="large" onChange={handleChange} name='phone' type='number' placeholder='e.g. 9876543210' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Email Address</span>} required>
                        <Input value={doctor.email} size="large" onChange={handleChange} name='email' type='email' placeholder='yourname@example.com' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={24}>
                     <Form.Item label={<span className="fw-semibold">Practice Address</span>} required>
                        <Input.TextArea value={doctor.address} size="large" onChange={handleChange} name='address' rows={2} placeholder='Enter your clinic or hospital address' className="rounded-2" />
                     </Form.Item>
                  </Col>
               </Row>

               <h5 className='mb-4 mt-5 fw-bold text-primary border-bottom pb-2 font-monospace'>2. PROFESSIONAL DETAILS</h5>
               <Row gutter={[24, 0]}>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Specialization</span>} required>
                        <Input value={doctor.specialization} size="large" onChange={handleChange} type='text' name='specialization' placeholder='e.g. Cardiologist' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Years of Experience</span>} required>
                        <Input value={doctor.experience} size="large" onChange={handleChange} type='number' name='experience' placeholder='Years of practice' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Consultation Fees</span>} required>
                        <Input value={doctor.fees} size="large" onChange={handleChange} name='fees' type='number' placeholder='Fees per session' className="rounded-2" />
                     </Form.Item>
                  </Col>
                  <Col xs={24} md={12} lg={8}>
                     <Form.Item label={<span className="fw-semibold">Available Timings</span>} name="timings" required>
                        <TimePicker.RangePicker format="HH:mm" size="large" onChange={handleTimingChange} className="w-100 rounded-2" />
                     </Form.Item>
                  </Col>
               </Row>
               
               <div className="d-flex justify-content-end mt-5 pt-3">
                  <button className="btn btn-primary px-5 py-2 fw-bold shadow-sm rounded-pill" type="submit" style={{ backgroundColor: '#2b6cb0', border: 'none' }}>
                     Submit Application
                  </button>
               </div>
            </Form>
         </div>
      </Container>
   );
}

export default ApplyDoctor;
