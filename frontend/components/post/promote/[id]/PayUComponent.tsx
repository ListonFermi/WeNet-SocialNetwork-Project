import { useEffect, useRef, useState } from "react";
import PayUApiCalls from "@/utils/apiCalls/PayUApiCalls";
import { FRONTEND_DOMAIN, PayU } from "@/utils/constants";
import { IUser } from "@/types/types";
import { generateTxnId } from "@/utils/generateTxnId";

type props = {
  currUserData: IUser;
  postId: string;
};

const PayUComponent = ({ currUserData, postId }: props) => {
  const [hash, setHash] = useState(null);

  const { firstName, lastName, email } = currUserData;

  const txnidRef = useRef(generateTxnId(8));
  const txnid = txnidRef.current;
  console.log({txnid})
  const amount = parseFloat("1000").toFixed(2); // Ensure correct format
  const productinfo = postId;
  const firstname = firstName;
  const lastname = lastName;
  const key = PayU.merchantKey;
  const phone = "1234567890"; // Ensure this is a string
  const surl = `${FRONTEND_DOMAIN}/api/paymentSuccess`;
  const furl = `${FRONTEND_DOMAIN}/api/paymentFailure`;
  const service_provider = "payu_paisa";

  useEffect(() => {
    const data = { txnid, amount, productinfo, firstname, email, phone };

    (async function (data) {
      try {
        const res = await PayUApiCalls.paymentReq(data);
        setHash(res.hash);
      } catch (error: any) {
        console.error("Payment Error: " + error.message);
        alert(error.message)
      }
    })(data);
  }, []);

  return (
    <form action="https://test.payu.in/_payment" method="post">
      <input type="hidden" name="key" value={key} />
      <input type="hidden" name="txnid" value={txnid} />
      <input type="hidden" name="productinfo" value={productinfo} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="firstname" value={firstname} />
      <input type="hidden" name="lastname" value={lastname} />
      <input type="hidden" name="surl" value={surl} />
      <input type="hidden" name="furl" value={furl} />
      <input type="hidden" name="phone" value={phone} />
      <input type="hidden" name="hash" value={hash || ""} />
      {hash && (
        <button
          type="submit"
          value="submit"
          className="bg-rootBg hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
        >
          Pay with PayU
        </button>
      )}
    </form>
  );
};

export default PayUComponent;
