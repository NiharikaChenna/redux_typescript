import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addContact, editContact } from "../Redux/Actions/Action";
import { Contact } from "../Redux/Reducer/contactReducer";
import { toast } from "react-toastify";

interface Params extends Record<string, string | undefined> {
  id: string;
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>();
  const history = useNavigate();

  //The useSelector hook is used to extract the Contact array from the store.
  const contacts = useSelector((state: Contact[]) => state);
  const currentContact = contacts.find(
    // Here parseInt(id ?? "") converts the id parameter to a number type or returns an empty string if id is undefined.
    (contact: Contact) => contact.id === parseInt(id ?? "")
  );
  const [name, setName] = useState<string>(
    currentContact ? currentContact.name : ""
  );
  const [email, setEmail] = useState<string>(
    currentContact ? currentContact.email : ""
  );
  const [number, setNumber] = useState<string>(
    currentContact ? currentContact.number.toString() : ""
  );
  const contactToEdit = currentContact ? true : false;

  const onSubmit = (data: Contact) => {
    if (contactToEdit) {
      const editedContact: Contact = {
        id: currentContact!.id,
        name:data.name,
        email:data.email,
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        number: parseInt(data.number),
      };
      dispatch(editContact(editedContact));
      toast.success("Student updated successfully !!");
      history("/");
    } else {
      const newContact: Contact = {
        id: contacts[contacts.length - 1].id + 1,
        name: data.name,
        email: data.email,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        number: parseInt(data.number),
      };
      dispatch(addContact(newContact));
      toast.success("Student added successfully !!");
      history("/");
    }
  };
  return (
    <div className="container">
      {contactToEdit ? (
        <h1 className="display-3 my-5 text-center">Edit Student {id}</h1>
      ) : (
        <h1 className="display-3 my-5 text-center">Add Student</h1>
      )}
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                defaultValue={name}
                {...register("name", { required: true })}
              />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="form-group mt-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                defaultValue={email}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <span>
                  This field is required and must be a valid email address
                </span>
              )}
            </div>
            <div className="form-group mt-3">
              <input
                type="tel"
                placeholder="Phone Number"
                className="form-control"
                defaultValue={number}
                {...register("number", { required: true, pattern: /^\d{10}$/ })}
              />
              {errors.number && (
                <span>
                  This field is required and must be a 10-digit number
                </span>
              )}
            </div>
            <div className="form-group mt-4">
              <input
                type="submit"
                value={contactToEdit ? "Update" : "Add Student"}
                className="btn btn-block btn-dark"
              />
              {contactToEdit && (
                <Link to="/" className="btn btn-danger ms-3">
                  Cancel
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
