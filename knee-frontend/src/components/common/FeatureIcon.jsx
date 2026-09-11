const FeatureIcon = ({ children }) => {
  return (
    <div className="w-14 h-14 rounded-full bg-[#EAF8F2] flex items-center justify-center">
      <div className="text-[#2F8F6B]">
        {children}
      </div>
    </div>
  );
};

export default FeatureIcon;