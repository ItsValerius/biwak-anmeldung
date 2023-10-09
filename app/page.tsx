import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import db from "@/db/client";
import { timeslots } from "@/db/schema/timeslots";

import { orgs } from "@/db/schema/orgs";
import { eq } from "drizzle-orm";
import BuchungsDialog from "@/components/BuchungsDialog";
import SlotVergeben from "@/components/SlotVergeben";

export default async function Home() {
  const slots = await db
    .select()
    .from(timeslots)
    .orderBy(timeslots.id)
    .leftJoin(orgs, eq(timeslots.id, orgs.timeslotId));

  return (
    <>
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
    </>
  );
}
