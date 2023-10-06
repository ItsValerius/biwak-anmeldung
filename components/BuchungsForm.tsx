"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { createInsertSchema } from "drizzle-zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { orgs } from "@/db/schema/orgs";
import { customErrorMap } from "@/lib/customErrorMap";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function BuchungsForm({ slotId }: { slotId: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = createInsertSchema(orgs, {
    contact_mail: (schema) =>
      schema.contact_mail.email({
        message: "Dieses Feld muss eine gültige Email Adresse enthalten.",
      }),
  }).omit({ id: true });
  z.setErrorMap(customErrorMap);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    values.timeslotId = slotId;
    const res = await fetch("/api/book", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if ((await res.json()).success) {
      router.push("/erfolg");
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:grid md:grid-cols-3 md:gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vereinsname</FormLabel>
              <FormControl>
                <Input
                  placeholder="KG..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>Der Name Eures Vereins.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ansprechpartner/Präsident</FormLabel>
              <FormControl>
                <Input
                  placeholder="Max..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>
                Name eures Ansprechpartners/Präsidenten.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact_mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Max...@..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>
                Eine Mail Adresse damit wir euch erreichen können.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="schlachtruf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schlachtruf</FormLabel>
              <FormControl>
                <Input
                  placeholder="Knall..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>Der Schlachtruf eures Vereins.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tollitäten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tollitäten</FormLabel>
              <FormControl>
                <Input
                  placeholder="Achim..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>Namen euer Tollitäten.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Art des Auftritts</FormLabel>
              <FormControl>
                <Input
                  placeholder="10 Tänze..."
                  {...field}
                  value={field.value ? field.value : ""}
                />
              </FormControl>
              <FormDescription>
                Eine Kurze Beschreibung zur Art eures Auftritts.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="md:col-span-3" type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Buchen"}
        </Button>
      </form>
    </Form>
  );
}
