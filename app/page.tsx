import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import db from "@/db/client";
import { timeslots } from "@/db/schema/timeslots";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BuchungsForm } from "@/components/BuchungsForm";
import { orgs } from "@/db/schema/org";
import { eq } from "drizzle-orm";

export default async function Home() {
  const slots = await db
    .select()
    .from(timeslots)
    .orderBy(timeslots.id)
    .leftJoin(orgs, eq(timeslots.id, orgs.timeslotId));

  return (
    <main className="flex min-h-screen flex-col items-center gap-12  md:gap-16 p-12 md:p-16 lg:p-24 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-center lg:leading-[1.1]">
        Biwak Anmeldung KG Knallköpp Golkrath
      </h1>
      <Table className=" md:text-lg md:w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Uhrzeit</TableHead>
            <TableHead className="text-center">Verfügbarkeit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot) => {
            return (
              <TableRow key={slot.timeslots.id}>
                <TableCell className="font-medium">
                  {slot.timeslots.time}
                </TableCell>
                <TableCell className="font-medium text-center">
                  {slot.org?.id ? (
                    <SlotVergeben />
                  ) : (
                    <BuchungsDialog slotId={slot.timeslots.id} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

const BuchungsButton = () => {
  return <Button className="w-32"> Buchen</Button>;
};

const SlotVergeben = () => {
  return (
    <Button disabled variant={"secondary"} className="w-32">
      Vergeben
    </Button>
  );
};

const BuchungsDialog = ({ slotId }: { slotId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BuchungsButton />
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center  max-h-full">
        <BuchungsForm slotId={slotId} />
      </DialogContent>
    </Dialog>
  );
};
