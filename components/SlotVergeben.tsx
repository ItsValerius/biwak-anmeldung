import React from "react";
import { Button } from "./ui/button";

const SlotVergeben = () => {
  return (
    <Button
      disabled
      variant={"secondary"}
      className="w-32 disabled:pointer-events-auto disabled:hover:cursor-not-allowed  "
    >
      Vergeben
    </Button>
  );
};

export default SlotVergeben;
