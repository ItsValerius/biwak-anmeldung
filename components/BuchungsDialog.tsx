import React from "react";
import { BuchungsForm } from "./BuchungsForm";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import BuchungsButton from "./BuchungsButton";

const BuchungsDialog = ({ slotId }: { slotId: number }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <BuchungsButton />
        </DialogTrigger>
        <DialogContent className="flex max-h-full items-center justify-center md:max-w-3xl ">
          <BuchungsForm slotId={slotId} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BuchungsDialog;
