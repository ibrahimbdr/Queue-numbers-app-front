import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios config/axiosInstance";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  // navigate instance to call after login to redirect to the next page
  const navigate = useNavigate();

  // state for Showing YES and NO options when the page reders after time is finished
  const [showMsg, setShowMsg] = React.useState(false);

  // To apply the effect of showing YES and NO after displaying "Do you have a login?"
  setTimeout(() => {
    setShowMsg(true);
  }, 2500);

  // State responsible for showing and hiding login Div
  const [signDiv, setSignDiv] = React.useState(3);

  // For getting Previous registered phones from database to validate registered phones in the form
  const [phoneArr, setPhoneArr] = React.useState([]);

  // calling api for getting phone numbers from database
  React.useEffect(() => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-fit mx-auto">
      <h1 className="text-center mt-10 text-2xl md:text-4xl p-1 animate-typeWriter overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest">
        Do You Have a Login?
      </h1>
      {showMsg && (
        <>
          <div className="flex justify-center my-10">
            <button
              onClick={() => setSignDiv(1)}
              className="text-3xl md:text-5xl border border-gray-800 hover:bg-gray-800 hover:text-white mx-5 w-32 text-center rounded  py-2 transition-all"
            >
              YES
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-3xl md:text-5xl border border-gray-800 bg-gray-800 text-white hover:bg-white hover:text-gray-800 mx-5 w-32 text-center rounded  py-2 transition-all"
            >
              NO
            </button>
          </div>
          {signDiv === 1 && (
            <div className=" w-72 md:w-80 lg:w-96 flex flex-col items-center">
              <div className="w-full shadow-xl bg-gray-300 p-8 rounded">
                <h2 className="text-xl font-medium">LOGIN</h2>
                {/* Using formik package for login form */}
                <Formik
                  initialValues={{ phone: "" }}
                  validationSchema={Yup.object({
                    phone: Yup.string()
                      .required("Required")
                      // Validating the phone is registered before
                      .oneOf(phoneArr, "Phone number is not registered"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    // connecting to api and sending post request to get the login token
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
                        if (res.data) navigate("/print2");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="my-4 w-full">
                        <label htmlFor="phone" className="block">
                          phone
                        </label>
                        <Field
                          type="phone"
                          name="phone"
                          className="h-10 rounded w-full p-1"
                        />
                        <ErrorMessage name="phone">
                          {(msg) => (
                            <div className="text-sm text-red-500">{msg}</div>
                          )}
                        </ErrorMessage>
                      </div>
                      <button
                        type="submit"
                        className="text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white"
                        disabled={isSubmitting}
                      >
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
          {signDiv === 2 && (
            <button
              type="button"
              onClick={() => navigate("/print2")}
              className="text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white"
            >
              Register an Appointment
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
