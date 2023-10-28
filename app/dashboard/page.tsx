import db from "@/db/client";
import { orgs } from "@/db/schema/orgs";
import { timeslots } from "@/db/schema/timeslots";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import React from "react";
import { eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { redirect } from "next/navigation";

export const runtime = "nodejs";
export const revalidate = 60;

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/api/auth/signin");
  }

  const allSignups = await db
    .select()
    .from(orgs)
    .leftJoin(timeslots, eq(timeslots.id, orgs.timeslotId))
    .orderBy(timeslots.id);

  return (
    <main className=" flex min-h-screen flex-col  items-center gap-12 px-12 py-6 md:gap-16 md:px-16 md:py-8 lg:px-24 lg:py-10">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Biwak Anmeldung KG Knallköpp Golkrath
      </h1>
      <Table className="md:w-full md:text-lg">
        <TableHeader>
          <TableRow>
            <TableHead>Uhrzeit</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Kontakt Name</TableHead>
            <TableHead>Kontakt Email</TableHead>
            <TableHead>Schlachtruf</TableHead>
            <TableHead>Tollitäten</TableHead>
            <TableHead>Beschreibung</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSignups.map((signup) => {
            return (
              <TableRow key={signup.timeslots?.id}>
                <TableCell className="font-medium">
                  {signup.timeslots?.time}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org?.name}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org.contact_name}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org.contact_mail}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org.schlachtruf}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org.tollitäten}
                </TableCell>
                <TableCell className="font-medium">
                  {signup.org.description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
};

export default Dashboard;
