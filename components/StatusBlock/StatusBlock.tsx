import React from "react";
import BabyTodayCardServer from "../BabyTodayCard/BabyTodayCardServer";

const StatusBlock = () => {
  return (
    <>
      <div>StatusBlock</div>
      <BabyTodayCardServer week={1} />
    </>
  );
};

export default StatusBlock;
