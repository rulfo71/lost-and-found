"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { supabase } from "@/lib/supabase";

export function ObjectForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"lost" | "found">("lost");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("objects").insert({
      title,
      description,
      type,
      location,
      contact,
      event_date: eventDate,
    });
    setLoading(false);
    setTitle("");
    setDescription("");
    setLocation("");
    setContact("");
    setEventDate("");
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        placeholder="Nombre del objeto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Lugar"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        required
      />
      <Input
        placeholder="Contacto"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <div className="flex gap-2">
        <Button
          type="button"
          variant={type === "lost" ? "outline" : "default"}
          onClick={() => setType("lost")}
        >
          Perdido
        </Button>
        <Button
          type="button"
          variant={type === "found" ? "outline" : "default"}
          onClick={() => setType("found")}
        >
          Encontrado
        </Button>
      </div>
      <Button type="submit" disabled={loading}>
        Cargar
      </Button>
    </form>
  );
}
