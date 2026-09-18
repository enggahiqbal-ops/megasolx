export const metadata = { title: "Privacy Policy" };

const SECTIONS: { heading: string; body: string }[] = [
  {
    heading: "1. Information We Collect",
    body: "We collect personal information, such as your phone number, email address, and any other details you provide when opting in to receive SMS/MMS and email communications via our website forms. This information is collected when you voluntarily provide it during sign-ups, inquiries, or promotions. A link to this Privacy Policy is included in all submission forms that collect phone numbers.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "We use the information collected to send you SMS/MMS and email communications related to promotions, updates, and special offers, and to enhance your website experience through the use of cookies, which help us improve our services and tailor content based on your preferences. Your phone number and other contact details will not be shared or sold to third parties for marketing purposes.",
  },
  {
    heading: "3. Opt-Out",
    body: 'You may opt out of receiving SMS/MMS messages at any time by replying "STOP" to any message. For emails, you can click "unsubscribe" in the email footer. We make it easy for you to withdraw consent at any time.',
  },
  {
    heading: "4. Cookies",
    body: "We use cookies to track website usage, analyze trends, and provide a more personalized browsing experience. You can control the use of cookies through your browser settings. Disabling cookies may affect certain features of the website.",
  },
  {
    heading: "5. GDPR Compliance",
    body: 'If you are located in the European Union (EU), we comply with the General Data Protection Regulation (GDPR). We will only collect and process your personal information with your explicit consent. You have the right to access, correct, or delete your personal information at any time, and may withdraw your consent by replying "STOP" to any SMS/MMS message, clicking "unsubscribe" in emails, or contacting us directly.',
  },
  {
    heading: "6. U.S. Data Laws",
    body: "In compliance with U.S. federal regulations, including the Controlling the Assault of Non-Solicited Pornography And Marketing (CAN-SPAM) Act and the Telephone Consumer Protection Act (TCPA), we ensure that recipients receive only opted-in communications via both SMS/MMS and email, and are given clear instructions to opt-out at any time. We will not use or share personal information, including mobile phone numbers, for unsolicited marketing purposes.",
  },
  {
    heading: "7. California Privacy Rights",
    body: "If you are a resident of California, the California Consumer Privacy Act (CCPA) grants you additional rights regarding your personal information, including the right to know what personal information is being collected, request deletion of your data, and opt out of the sale of your personal information. We will not discriminate against you for exercising any of your CCPA rights.",
  },
  {
    heading: "8. Data Security",
    body: "We take reasonable measures to protect the personal information you provide, including your phone number. However, no method of transmission over the internet, mobile networks, or email is completely secure. We cannot guarantee the absolute security of your information.",
  },
  {
    heading: "9. Message Frequency and Data Rates",
    body: "Message frequency may vary depending on promotions and updates. Standard message and data rates may apply for SMS/MMS communications based on your mobile carrier.",
  },
  {
    heading: "10. Your Rights",
    body: "You have the right to access, correct, or delete your personal information. You can also withdraw consent to receive further communications at any time.",
  },
  {
    heading: "11. Changes to the Privacy Policy",
    body: "We reserve the right to update or modify this Privacy Policy at any time. Changes will be posted on our website, and we encourage you to review this policy periodically.",
  },
  {
    heading: "12. Contact Us",
    body: "If you have any questions or concerns about our Privacy Policy, cookies, or compliance with GDPR, U.S. data laws, or California state regulations, please contact us at hello@montrastudio.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black px-[5%] py-16 text-white md:py-24">
      <h1 className="font-display-condensed text-4xl uppercase md:text-6xl">Privacy Policy</h1>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
        Montra Studio is committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, and protect the personal information you provide
        when opting in to receive SMS/MMS and email communications from us. By consenting to
        receive messages from us, you agree to the practices described in this policy.
      </p>

      <div className="mt-14 max-w-3xl space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display-condensed text-xl uppercase text-white">{section.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{section.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
