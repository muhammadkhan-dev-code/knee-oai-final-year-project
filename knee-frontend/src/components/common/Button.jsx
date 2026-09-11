export default function Button ({ title, className = '', ...props }) {
  return (
    <button
      className={`w-full text-white  rounded-xl font-semibold hover:opacity-90 transition ${className}`}
      style={{ backgroundImage: 'linear-gradient(to right, #0891b2, #14b8a6)' }}
      {...props}
    >
      {title}
    </button>
  )
}
