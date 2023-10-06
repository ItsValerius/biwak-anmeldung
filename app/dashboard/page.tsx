import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) return redirect("/api/auth/signin");
  return <div>page</div>;
};

export default Dashboard;
