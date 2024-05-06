'use client'

import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from './Profile';
import Company from './Company';
import Location from './Location';
import Payment from './Payment';
import UserManagement from './UserManagement';
// import Layout from '../../Layout/Layout'; 

  const Settings = (props) => {
    const [activeTab] = useState(props.page);
      
    const ProfileForm = () => (
      <Profile/>
    );
  
    const CompanyForm = () => (
      <Company/>
    );
  
    const PaymentMethodsForm = () => (
      <Payment/>
    );
  
    const UserManagementForm = () => (
      <UserManagement/>
    );
  
    const GeolocationsForm = () => (
      <Location/>
    );
  
  return (
    <main className="settings main" id="main">
      <Row className=''> {/* reverseCard */}
        <Col xs={12} md={12}  className="rightSide rightPadding">        
          {activeTab === 'Profile' && <ProfileForm />}
          {activeTab === 'Company' && <CompanyForm />}
          {activeTab === 'PaymentMethods' && <PaymentMethodsForm />}
          {activeTab === 'UserManagement' && <UserManagementForm />}
          {activeTab === 'Geolocations' && <GeolocationsForm />}
        </Col>
      </Row>
    </main>
  );
};

export default Settings;
