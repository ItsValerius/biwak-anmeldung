import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
const Erfolg = async () => {
  const session = await getServerSession();
  if (!session) return redirect("/");
  return <div>page</div>;
};

export default Erfolg;
