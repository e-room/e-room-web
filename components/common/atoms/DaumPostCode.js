import DaumPostcodeEmbed from "react-daum-postcode";

export default function DaumPostCode({ onComplete, ...props }) {
  return <DaumPostcodeEmbed onComplete={onComplete} {...props} />;
}
