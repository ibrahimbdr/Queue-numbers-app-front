import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios config/axiosInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = React.useState(false);
  setTimeout(() => {
    setShowMsg(true);
  }, 2500);
  const [phoneArr, setPhoneArr] = React.useState([]);
  const [nameArr, setNameArr] = React.useState([]);
  const [registered, setRegistered] = React.useState(false);
  React.useEffect(() => {
    if (registered) navigate("/print");
    axiosInstance
      .get("/customer/")
      .then((res) => {
        console.log(res.data);
        let arr = [];
        let arr2 = [];
        res.data.forEach((customer) => {
          arr.push(customer.phone);
          arr2.push(customer.name);
        });
        setPhoneArr(arr);
        setNameArr(arr2);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [registered]);

  return (
    <div className="flex flex-col justify-center items-center w-fit mx-auto">
      <h1 className="text-center mt-10 text-2xl md:text-4xl p-1 animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest">
        Please Enter Your Data
      </h1>

      <div className="group my-10 w-72 md:w-80 lg:w-96">
        <div className="w-full shadow-xl bg-gray-300 p-8 rounded">
          <h2 className="text-xl font-medium">REGISTER</h2>

          <Formik
            initialValues={{ name: "", phone: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .required("Required")
                .notOneOf(nameArr, "Name already has been registered"),
              phone: Yup.string()
                .required("Required")
                .notOneOf(phoneArr, "Phone number already has been registered"),
            })}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              axiosInstance
                .post(
                  "/customer/",

                  JSON.stringify(values),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              axiosInstance
                .post(
                  "/customer/login",

                  JSON.stringify({ phone: values.phone }),
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  console.log("token-customer", res.data.token);
                  localStorage.setItem("token-customer", res.data.token);
                  if (res.data.token) setRegistered(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="my-4 w-full">
                  <label
                    htmlFor="name"
                    className="block w-full mt-4 pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-gray-400"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    className="p-1peer h-10 w-full rounded-md bg-gray-50 px-4 font-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage name="name">
                    {(msg) => <div className="text-sm text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="my-4 w-full">
                  <label
                    htmlFor="phone"
                    className="block w-full mt-4 pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-gray-400"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    className="p-1 peer h-10 w-full rounded-md bg-gray-50 px-4 font-base outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-gray-400"
                  />
                  <ErrorMessage name="phone">
                    {(msg) => <div className="text-sm text-red-500">{msg}</div>}
                  </ErrorMessage>
                </div>

                <button
                  type="submit"
                  className="text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
