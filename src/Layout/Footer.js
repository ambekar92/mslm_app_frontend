import React, { Component } from 'react'  
  
export class Footer extends Component {  
    render() {  
        return (  
            <div>  
                <footer id="footer" className="footer">
                    <div className="copyright">
                    &copy; Copyright <strong><span>supplier_app</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">                   
                    Designed by <a href="https://supplier_app.agency/">supplier_app</a>
                    </div>
                </footer>
            </div>  
        )  
    }  
}  
  
export default Footer