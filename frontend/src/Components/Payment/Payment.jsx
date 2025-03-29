export default function Payment({
  donatorFirstName,
  donatorLastName,
  donatorEmail,
  donatedAmount,
}) {
  const public_key = import.meta.env.VITE_CHAPA_PUBLIC_KEY;
  const tx_ref = `${donatorFirstName}-${donatedAmount}`;

  return (
    <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
      <input type="hidden" name="public_key" value={public_key} />
      <input type="hidden" name="tx_ref" value={tx_ref} />
      <input type="hidden" name="amount" value={donatedAmount} />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value={donatorEmail} />
      <input type="hidden" name="first_name" value={donatorFirstName} />
      <input type="hidden" name="last_name" value={donatorLastName} />
      <input type="hidden" name="title" value="Let us do this" />
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

      <button
        className="w-full py-3 mt-6 rounded-lg bg-[#1E3A8A] text-white font-text cursor-pointer"
        type="submit"
      >
        Pay Now
      </button>
    </form>
  );
}
