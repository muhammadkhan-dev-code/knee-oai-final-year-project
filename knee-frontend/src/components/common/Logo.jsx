import logo from '/logo_svg.svg'

const Logo = ({ size = 65, className = '', animated = true }) => {
  return (
    <>
      <style>{`
        @keyframes koaRotate {
          0% {
            transform: rotate(0deg);
          }

          50% {
            transform: rotate(180deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        .koa-logo-animation {
          animation: koaRotate 12s linear infinite;
          transform-origin: center;
          will-change: transform;
          display: block;
        }
      `}</style>

      <img
        src={logo}
        alt="KOA AI Logo"
        width={size}
        height={size}
        className={`${animated ? 'koa-logo-animation' : ''} ${className}`}
      />
    </>
  )
}

export default Logo