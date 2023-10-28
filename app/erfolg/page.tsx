import { Button } from "@/components/ui/button";
import db from "@/db/client";
import { timeslots } from "@/db/schema/timeslots";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
const Erfolg = async (searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams.searchParams.id) return redirect("/");
  const slot = await db
    .select()
    .from(timeslots)
    .where(eq(timeslots.id, Number(searchParams.searchParams.id)));
  if (!slot || !slot[0]) return redirect("/");
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-12 px-12 py-6 md:gap-16 md:px-16 md:py-8 lg:px-24 lg:py-10">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Biwak Anmeldung KG Knallköpp Golkrath
      </h1>
      <p className="text-center text-xl">
        Vielen Dank für deine Anmeldung. <br />
        Du hast dich für folgende Uhrzeit angemeldet: {slot[0].time} <br />
        Bei Fragen kannst du dich an diese Mail Adresse wenden:{" "}
        <Link
          href="mailto:gf@knallkoepp-golkrath.de"
          className="text-primary underline"
        >
          gf@knallkoepp-golkrath.de
        </Link>{" "}
        <br />
      </p>
      <Button className="w-32 p-8 text-xl" asChild>
        <Link href={"/"}>Zurück</Link>
      </Button>
    </main>
  );
};

export default Erfolg;
