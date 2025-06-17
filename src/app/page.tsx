"use client";

import { ObjectForm } from "@/app/components/ObjectForm";
import { ObjectList } from "@/app/components/ObjectList";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";

export default function HomePage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-8 bg-white min-h-screen min-w-screen">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-zinc-900">
          Objetos Perdidos y Encontrados
        </h1>
        <p className="text-zinc-600">
          Ayudamos a reunir personas con sus objetos perdidos
        </p>
        <p className="text-zinc-600">
          ¿Alguna vez perdiste algo en la montaña y no había manera de que te lo
          devuelvan? ¿O encontraste algo y no sabías a quien devolverselo?
        </p>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
              + Reportar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reportar objeto</DialogTitle>
            </DialogHeader>
            <ObjectForm onSubmitted={() => setRefresh(!refresh)} />
          </DialogContent>
        </Dialog>
      </div>

      <ObjectList refreshTrigger={refresh} />
    </main>
  );
}
