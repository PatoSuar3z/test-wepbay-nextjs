
import { useState } from "react";

export default function Home() {

  let PaymentData;

  fetch('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Tbk-Api-Key-Id': '597055555532',
      'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "buy_order": "o1",
      "session_id": "s1",
      "amount": 10,
      "return_url": "http://localhost:3000/",
    }),
  })

    .then((res) => res.json())
    .then(async (data) => {
      console.log(data)
      PaymentData = data;
      fetch(`https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${PaymentData.token}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Tbk-Api-Key-Id': '597055555532',
          'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
          'Content-Type': 'application/json',
        },
      })
        .then((res2) => res2.json())
        .then((data2) => { console.log(data2) })
        .catch((error2) => { console.log(error2) });
    })
    .catch((error) => { console.log(error) });
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full lg:flex-row">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            Test WebPay Plus
          </h1>
        </div>
      </div>
    </main>
  )
}
