import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";

const UserGuide = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-3 leading-6">
        <img src={headerIcon} alt="headerIcon" />
        <span className="text-[22px] font-semibold ">Help Center</span>
      </div>
      <h1 className="text-5xl font-semibold text-center leading-[72px]">
        User Guide
      </h1>
    </div>
  );
};

export default UserGuide;
