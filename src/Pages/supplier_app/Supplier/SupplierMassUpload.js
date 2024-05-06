import React from 'react';
// import toast from 'react-hot-toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { ComboboxField } from '../../../Components/formElements/ComboboxField';
import Layout  from '../../../Layout/Layout';

const SupplierMassUpload =() =>{
  localStorage.setItem('menu','Supplier');
  localStorage.setItem('submenu','Mass Upload');

  return(
    <main className="dashboard main" id="main"> 
      <Layout/>
        <Row className="justify-center subContent">
          <Col xs={12} md={12}  className="rightSide">

            <div className="rightSideInner timesheet">
              <h2 className='mainTitle'>Supplier Mass Upload List supplier_app</h2>
              <p className='subText'>subtext beased on the Main title</p>
              <hr/>

              {/* Code Start Here */}
              <h1>Test coding Supplier Mass Upload List</h1>

            </div>   
          </Col>
        </Row>
    </main>
  )
}

export default SupplierMassUpload;