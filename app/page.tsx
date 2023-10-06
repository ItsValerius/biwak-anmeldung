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
import { orgs } from "@/db/schema/orgs";
import { eq } from "drizzle-orm";

export default async function Home() {
  const slots = await db
    .select()
    .from(timeslots)
    .orderBy(timeslots.id)
    .leftJoin(orgs, eq(timeslots.id, orgs.timeslotId));

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col  items-center gap-12 px-12 py-6 md:gap-16 md:px-16 md:py-8 lg:px-24 lg:py-10">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Biwak Anmeldung KG Knallköpp Golkrath
      </h1>
      <Table className="md:w-full md:text-lg">
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
                <TableCell className="text-center font-medium">
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
  return <Button className="w-32">Reservieren</Button>;
};

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

const BuchungsDialog = ({ slotId }: { slotId: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BuchungsButton />
      </DialogTrigger>
      <DialogContent className="flex max-h-full items-center justify-center md:max-w-3xl ">
        <BuchungsForm slotId={slotId} />
      </DialogContent>
    </Dialog>
  );
};
