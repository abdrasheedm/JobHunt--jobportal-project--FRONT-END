import React from "react";
import ReactDOM from "react-dom"
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });


function PayPalModal({visible}) {
  if(!visible){
    return
  }
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };
  return (
    <div className="bg-gray-900 fixed inset-0 z-10 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <PayPalButton
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
    </div>
  );
}
export default PayPalModal



// import React, { useEffect, useRef } from 'react'

// function PayPalModal({visible}) {

//     const paypal = useRef()
//     if(!visible){
//         return
//     }
//     // useEffect(() => {
//     //     window.paypal.Buttons({
//     //         createOrder:(data, actions, err) => {
//     //             return actions.order.create({
//     //                 intent: "CAPTURE",
//     //                 purchase_units: [
//     //                     {
//     //                         description:"Cool looking table",
//     //                         amount: {
//     //                             currency_code:"USD",
//     //                             value: 650.00
//     //                         }
//     //                     }
//     //                 ]
//     //             })
//     //         },
//     //         onApprove: async (data, actions) => {
//     //             const order = await actions.order.capture();
//     //             console.log(order)
//     //         },
//     //         onError:(err) => {
//     //             console.log(err);
//     //         }

//     //     })
//     //     .render(paypal.current)
//     // }, [])
//   return (
//     <div>
//         <div ref={paypal}>

//         </div>
//     </div>
//   )
// }

// export default PayPalModal