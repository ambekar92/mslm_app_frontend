import React from 'react';
// import toast from 'react-hot-toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { ComboboxField } from '../../../Components/formElements/ComboboxField';
import Layout  from '../../../Layout/Layout';

const SESReprocess =() =>{
  localStorage.setItem('menu','SAPReprocess');
  localStorage.setItem('submenu','SES Reprocess');

  return(
    <main className="dashboard main" id="main"> 
      <Layout/>
        <Row className="justify-center subContent">
          <Col xs={12} md={12}  className="rightSide">

            <div className="rightSideInner timesheet">
              <h2 className='mainTitle'>Service Entry Sheetion supplier_app</h2>
              <p className='subText'>Service Entry Sheetthe Main title</p>
              <hr/>

              {/* Code Start Here */}
              <h1>Test coding Purchase Requisition</h1>

            </div>   
          </Col>
        </Row>
    </main>
  )
}

export default SESReprocess;