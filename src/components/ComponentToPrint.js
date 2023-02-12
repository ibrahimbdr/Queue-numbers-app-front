import React from "react";
export class ComponentToPrint extends React.Component {
  render() {
    let appNum = localStorage.getItem("appointmentNumber");
    let custName = localStorage.getItem("customerName");
    let date = new Date(localStorage.getItem("date")).toLocaleString();
    if (appNum.length === 1) {
      appNum = "00" + appNum;
    }
    if (appNum.length === 2) {
      appNum = "0" + appNum;
    }
    return (
      <div className="fixed w-fit bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 border-2 py-4 px-2">
        <p>{date}</p>
        <h1 className="text-center text-3xl mt-4">Thank you for waiting ...</h1>
        <p className="text-center mt-4">
          ******************************************
        </p>
        <h1 className="text-center text-2xl mt-4">
          Hello, <span className="font-semibold">{custName}</span>
        </h1>
        <h2 className="text-center text-xl mt-4">
          Your queue Number is <span className="font-semibold">{appNum}</span>
        </h2>
      </div>
    );
  }
}
