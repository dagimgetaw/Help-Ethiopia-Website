import { forwardRef } from "react";

const ChapaPayment = forwardRef((props, ref) => {
  const {
    donatorFirstName,
    donatorLastName,
    donatorEmail,
    donatedAmount,
    paymentMethod,
  } = props;

  const public_key = import.meta.env.VITE_CHAPA_PUBLIC_KEY;
  const id = Math.floor(Math.random() * 1000000);
  const tx_ref = `${donatorFirstName}-${donatedAmount}-ID-${id}`;

  return (
    <div className="hidden">
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay" ref={ref}>
        <input type="hidden" name="public_key" value={public_key} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={donatedAmount} />
        <input
          type="hidden"
          name="currency"
          value={paymentMethod === "Birr" ? "ETB" : "USD"}
        />
        <input type="hidden" name="email" value={donatorEmail} />
        <input type="hidden" name="first_name" value={donatorFirstName} />
        <input type="hidden" name="last_name" value={donatorLastName} />
        <input type="hidden" name="title" value="Donation" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with Chapa"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input type="hidden" name="callback_url" value="https://google.com/" />
        <input type="hidden" name="return_url" value="https://youtube.com/" />
        <input type="hidden" name="meta[title]" value="Donation" />
      </form>
    </div>
  );
});

ChapaPayment.displayName = "ChapaPayment";

export default ChapaPayment;
