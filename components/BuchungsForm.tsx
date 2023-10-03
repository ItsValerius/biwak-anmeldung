"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { createInsertSchema } from "drizzle-zod";

const formSchema = createInsertSchema(orgs).omit({ id: true });

z.setErrorMap(customErrorMap);

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
import { orgs } from "@/db/schema/org";
import { customErrorMap } from "@/lib/customErrorMap";

export function BuchungsForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="  md:w-2/3 md:gap-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
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

        <Button className="" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
