import React from "react";
import { useReactToPrint } from "react-to-print";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios config/axiosInstance";

const Print2 = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 20000);
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [showRedirect, setRedirect] = React.useState(false);

  const [queueNumber, setQueueNumber] = React.useState(0);
  const [queueCustomer, setQueueCustomer] = React.useState("");
  const token = localStorage.getItem("token-customer");
  console.log(token);
  React.useEffect(() => {
    axiosInstance
      .post(
        "/appointment/",
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("appointmentNumber", res.data.number);
        localStorage.setItem("customerName", res.data.customer.name);
        localStorage.setItem("date", res.data.createdAt);

        setQueueNumber(res.data.number);
        setQueueCustomer(res.data.customer.name);
        console.log("num", queueNumber, "name", queueCustomer);
      })
      .catch((err) => {
        console.log(err);
      });
    //     const fetchData = async () => {
    //     const response = await fetch('http://localhost:4000/appointment',{
    //         method: 'POST',
    //         headers: {'Content-Type':'application/json', 'Authorization': token},
    //     })
    //     const appointment = await response.json()
    //     console.log(appointment);
    //     // if(appointment == null){

    //     // }
    //     localStorage.setItem('appointmentNumber', appointment.number)
    //     localStorage.setItem('customerName', appointment.customer.name)
    //     localStorage.setItem('date', appointment.createdAt)

    //     setQueueNumber(appointment.number);
    //     setQueueCustomer(appointment.customer.name);
    // }
    // fetchData()
    // .catch(console.error);
  });
  return (
    <div className="fixed w-fit bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
      {!showRedirect && (
        <h1 className="w-fit text-center mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl p-1 animate-typeWriterPlusPlusPlusPlus overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest">
          Hello <span className="font-semibold underline">{queueCustomer}</span>
          , your queue number is{" "}
          <span className="font-semibold underline">{queueNumber}</span>.
        </h1>
      )}
      {showRedirect && (
        <h1 className="w-fit text-center mt-10 text-lg p-1 overflow-hidden border-r-8 border-gray-500 whitespace-nowrap my-0 mx-auto tracking-widest">
          Redirecting to Home ...
        </h1>
      )}

      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} />
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handlePrint}
          className="text-2xl my-5 rounded px-4 py-2 transition-all  border border-gray-800 hover:bg-gray-800 hover:text-white"
        >
          Print
        </button>
      </div>
    </div>
  );
};

export default Print2;
