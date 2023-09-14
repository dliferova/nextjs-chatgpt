import React from "react";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AssistantIcon = () => {
  return (
    <div className="bg-gray-800 flex h-[30px] w-[30px] items-center justify-center rounded-sm shadow-md shadow-black/50">
      <FontAwesomeIcon icon={faRobot} className="text-emerald-200"/>
    </div>
  );
};

export default AssistantIcon;
