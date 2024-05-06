import React, { useEffect } from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

// Components
import Constants from "../../../common/Constants";

//Redux
import DataTable from "react-data-table-component";

const CommonItemLevelDatatableModal = React.forwardRef((props, ref) => {

  const {columns, data, title} = props;
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        props.onHide();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [props]);

  // useEffect(() => {
  //   //  console.log(">> ", props);
  //   setLoading(true);

  //   if(data && columns){
  //     setLoading(false);
  //   }
    
  // // eslint-disable-next-line
  // }, [props]);


  return (
    // backdrop="static"
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      dialogClassName="modal-90w"
      ref={ref}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
          {/* <p className="subText">
            At supplier_app, every person has a role, each with its own level of
            access.
          </p> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <Row>
          <Col xs={12} md={12} lg={12}>
            <DataTable
              title=""
              columns={columns}
              data={data}
              // progressPending={loading}
              pagination
              // paginationServer
              // paginationTotalRows={totalRows}
              // onChangeRowsPerPage={handlePerRowsChange}
              // onChangePage={handlePageChange}
              selectableRows
              paginationRowsPerPageOptions={Constants.ROW_PER_PAGE}
            />
          </Col>
        </Row>

      </Modal.Body>
    </Modal>
  );
});

export default CommonItemLevelDatatableModal;
