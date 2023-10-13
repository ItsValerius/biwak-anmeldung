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

export const dynamic = "force-dynamic";

export default async function Home(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(
    new Date() <= new Date(2023, 9, 13, 10, 0, 0) &&
      searchParams.searchParams.bypass != process.env.BYPASS_KEY,
  );

  if (
    new Date() <= new Date(2023, 9, 13, 10, 0, 0) &&
    searchParams.searchParams.bypass != process.env.BYPASS_KEY
  ) {
    return (
      <h1 className="flex w-full items-center justify-center text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Die Anmeldung startet am 13.10.2023 um 10 Uhr
      </h1>
    );
  }
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
