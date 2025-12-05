import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./EditCustomer.css"; // <-- Import CSS
import { FaArrowAltCircleRight, FaArrowCircleLeft, FaEdit, FaEye, FaFileInvoice, FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import { TbListNumbers } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // State for sidebar toggle
  const [formData, setFormData] = useState({
    customerName: "",
    customerAddress: "",
    customerState: "",
    customerPhoneNo: "",
    customerGSTIN: "",
    customerPan: "",
    customerEmail: "",
  });
 const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "customer", id);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setFormData(snap.data());
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCustomer = async () => {
    const docRef = doc(db, "customer", id);
    await updateDoc(docRef, formData);

    alert("Customer updated successfully!");
    navigate("/showcustomers");
  };

  return (
    <div className="edit-page">
         <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
                <ul>
                  <li style={{
                      fontSize: '22px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      margin: '20px 0',
                      borderBottom: '2px solid #c3b6d0',
                      paddingBottom: '10px',
                    }}>
                    {isOpen ? (
                      'Nandhini Agency'
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '-14px' }}>
                        <img
                          src="your-logo-path"  // Update with actual logo path
                          alt="Nandhini Fireworks Logo"
                          style={{
                            width: '50px',
                            height: 'auto',
                          }}
                        />
                      </div>
                    )}
                  </li>
                  <li><Link to="/newhome"><FaHome /> {isOpen && <span>Home</span>}</Link></li>
                  <li><Link to="/products"><AiFillProduct /> {isOpen && <span>Products</span>}</Link></li>    
                  <li><Link to="/allbills"><FaEye /> {isOpen && <span>All Bills</span>}</Link></li>
                  <li><Link to="/editbill"><FaEdit /> {isOpen && <span>Edit Bills</span>}</Link></li>
                  <li><Link to="/bill"><FaFileInvoice /> {isOpen && <span>Invoice</span>}</Link></li>
                  <li><Link to="/showcustomers"><IoIosPerson /> {isOpen && <span>Customers</span>}</Link></li>
                  <li><Link to="/invoice"><TbListNumbers />{isOpen && <span>Invoice Numbers</span>}</Link></li>
                  <li><Link to="/"><MdLogout /> {isOpen && <span>Logout</span>}</Link></li>
                  <li className="menu-item">
                    <button onClick={toggleSidebar} style={{
                      padding: '10px',
                      backgroundColor: '#1b2594',
                      border: 'none',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      cursor: 'pointer',
                    }}>
                      {isOpen ? <FaArrowCircleLeft style={{ color: 'white' }} /> : <FaArrowAltCircleRight style={{ color: 'white' }} />}
                    </button>
                  </li>
                </ul>
              </div>
      <div className="edit-card">

        <h2 className="edit-title">Edit Customer</h2>

        <div className="edit-form">
          {Object.keys(formData).map((field) => (
            <div className="input-group" key={field}>
              <label>{field.replace(/([A-Z])/g, " $1")}</label>

              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="edit-input"
              />
            </div>
          ))}

          <button className="update-btn" onClick={updateCustomer}>
            Update Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
