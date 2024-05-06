import Spinner from 'react-bootstrap/Spinner';

const Loader = ({isLoading, className}) => {
  // console.log(">> ", className, isLoading);
  
  return (
    <>
      <div className={`${className}`}>
        {isLoading &&
          <Spinner animation="border" role="status" variant="info" className='mt-4'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }
        
      </div>      
    </>
  );
};

export default Loader;
