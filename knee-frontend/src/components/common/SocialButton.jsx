export default function SocialButton({ icon }) {
  return (
    <button className="border rounded-xl py-4 flex justify-center hover:bg-gray-100 transition">
      {icon}
    </button>
  );
}