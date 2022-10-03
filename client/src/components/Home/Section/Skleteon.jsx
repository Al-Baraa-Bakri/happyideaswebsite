import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../../style/temp.css";

const Skleteon = () => {
  return (
    <div className="post">
      <div className="right-col">
        <Skeleton />
        <p className="mb-0">
          <Skeleton count={3} />
        </p>
      </div>
      <div className="left-col">
        <div className="avatar">
          <Skeleton height="100%" containerClassName="avatar-skeleton" />
        </div>
        <div className="user-name">
          <Skeleton width={70} />
        </div>
      </div>
    </div>
  );
};

export default Skleteon;
