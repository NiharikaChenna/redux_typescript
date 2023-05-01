import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Contact} from "../Redux/Reducer/contactReducer"

const Home = () => {
  // get the contacts from the redux store
  const contacts = useSelector((state: Contact[]) => state);
  const dispatch = useDispatch();

  // function to delete a contact
  const deleteContact = (id: number): void => {
    dispatch({ type: "DELETE_CONTACT", payload: id }); // Dispatch the deleteContact action 
    toast.success("contact deleted sucessfully !"); // Success message using react-toastify
  };
  return (
    <div className="container">
      <div className=" row">
        <div className="col-md-12 my-5 text-right">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {
                contacts.map((contact: Contact, id: number) => {
                  return (
                  <tr key={id}>
                    <td>{id+1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.number}</td>
                     <td>
                      <Link to={`/edit/${contact.id}`} className='btn btn-small btn-primary m-2'>Edit</Link>
                      <button onClick={()=>deleteContact(contact.id)} className='btn btn-small btn-danger' type='button'>Delete</button>
                     </td>
                  </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
