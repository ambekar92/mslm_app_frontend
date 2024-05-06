import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Layout from '../Layout/Layout';
import { Link   } from "react-router-dom";
import ConstantsList from '../common/Constants';

export class Page404 extends Component {
    render() {
        return (
            <main className="dashboard main" id="">
                {/* <Layout /> */}
                <Row className="justify-center subContent">
                    <Col xs={12} md={12} className="rightSide">
                        <div className="container">
                            <section className="section error-404 d-flex flex-column align-items-center justify-content-center">
                                <h1>404</h1>
                                <h2>The page you are looking for doesn't exist.</h2>
                                {/* <a className="btn" href="/dashboard">Back to home</a> */}
                                <Link to={ConstantsList.DASHBOARD} className="btn">
                                    Back to home
                                </Link >
                                <img src="/assets/img/not-found.svg" className="img-fluid py-5" alt="Page Not Found" />
                                {/* <div className="credits">
                                    Designed by <a href="/">supplier_app</a>
                                </div> */}
                            </section>
                        </div>
                    </Col>
                </Row>
            </main>
        )
    }
}

export default Page404