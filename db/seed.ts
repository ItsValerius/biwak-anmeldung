import db from "./client";
import { orgs } from "./schema/org";
import { timeslots } from "./schema/timeslots";

const makeTimeSlots = async () => {
  try {
    await db.insert(timeslots).values({ time: "17:11" });

    // Define the initial date and time
    let startTime = new Date();
    startTime.setHours(18, 0, 0, 0);
    // Define the number of iterations you want
    const numIterations = 11; // Change this to the desired number of iterations

    // Function to format time as "hh:ss"
    function formatTime(date: Date) {
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    }

    // Loop through the iterations
    for (let i = 0; i < numIterations; i++) {
      await db.insert(timeslots).values({ time: formatTime(startTime) });
      // Display the updated time for each iteration in "hh:ss" format
      console.log(`Iteration ${i + 1}: ${formatTime(startTime)}`);
      // Add 30 minutes to the start time
      startTime.setMinutes(startTime.getMinutes() + 30);
    }
  } catch (err) {
    console.log("Error creating timeslots");

    console.log(err);
  }
};
const seed = async () => {
  console.log("Seeding DB");
  await makeTimeSlots();
  try {
    await db.insert(orgs).values({
      name: "KG Knallköpp Golkrath",
      contact_mail: "biwak@knallkoepp-golkrath.de",
      schlachtruf: "Knall Mött",
      description: "",
      tollitäten: "Prinz Uwe I. und Prinzessin Katharina die II",
      contact_name: "Pascal Oster",
    });
  } catch (err) {
    console.log("Error creating default org");

    console.log(err);
  }
};
seed();
