import React, { useState, useEffect } from "react";
// import toast from 'react-hot-toast';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { ComboboxField } from '../../../Components/formElements/ComboboxField';
import Layout from "../../Layout/Layout";
import ItemService from "../../services/supplier_appCommonService";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  localStorage.setItem("menu", "License Manager");
  localStorage.setItem("submenu", "-");

  const [getData, setData] = useState("");

  useEffect(() => {
    // console.log(">> getData", getData);
    getLicenseData();
    
    // eslint-disable-next-line
  }, []);

  const getLicenseData = async () => {
    ItemService.getLicenseData().then((items) => {
      // Sort the data alphabetically based on a specific key (e.g., name)
      const sortedData = items?.data?.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      // Organize the sorted data into sections
      const groupedData = groupData(sortedData);

      console.log(">>groupedData ", groupedData);
      setData(groupedData);
    });
  };

  const handleSelect=(id)=>{
    console.log(">> ID", id);
    navigate('/detail-page');
  }

  const groupData = (sortedData) => {
    const grouped = {};
    // Group data into sections (A, B, C, etc.)
    sortedData.forEach((item) => {
      const firstLetter = item.name.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(item);
    });
    return grouped;
  };

  return (
    <main className="dashboard main" id="main">
      <Layout />
      <Row className="justify-center subContent">
        <Col xs={12} md={12} className="rightSide">
          <div className="rightSideInner timesheet ">
            <h2 className="mainTitle">License Manager List</h2>
            <p className="subText">All License Manager listed below</p>
            <hr />

            {/* Code Start Here */}
            {Object.keys(getData).map((section, index) => (
              <div key={index}>
                <Row>
                  <Col xs={12} md={12} lg={12} className="commLeftRightPadding">
                    <h2>{section}</h2>
                  </Col>

                  {getData[section].map((item, index) => (
                    <Col xs={12} md={3} lg={3} className="commTopButtonRightLeftPadding" key={index}>
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        key={item.id}
                        style={{ width: "100%" }}
                        onClick={()=>handleSelect(item.id)}
                      >
                        {item.name}
                      </button>
                    </Col>
                  ))}
                </Row>

                <hr />
              </div>
            ))}

          </div>
        </Col>
      </Row>
    </main>
  );
};

export default Dashboard;
