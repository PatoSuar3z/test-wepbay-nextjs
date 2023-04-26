import { useState } from "react";

export default function Home() {

  var token;

  fetch('https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Tbk-Api-Key-Id': '597055555532',
      'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "buy_order": "ordenCompra12345678",
      "session_id": "sesion1234557545",
      "amount": 10000,
      "return_url": "http://www.comercio.cl/webpay/retorno",
    }),
  })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data)
      token = data.token
      console.log(token)
    })
    .catch((error) => { console.log(error) });

function initTransaction() {
    fetch(`https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions/${token}`, {
      method: 'GET',
      headers: {
        'Tbk-Api-Key-Id': '597055555532',
        'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
        'Content-Type': 'application/json',
      },
    })
      .then((res2) => res2.json())
      .then((data2) => {console.log(data2)})
      .catch((error2) => { console.log(error2) });
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center w-full lg:flex-row">
          <h1 className="text-4xl font-bold text-center lg:text-left">
            Test WebPay Plus
          </h1>
          <button onClick={() => initTransaction()}>Pay</button>
        </div>
      </div>
    </main>
  )
}
