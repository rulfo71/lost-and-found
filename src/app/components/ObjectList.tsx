// components/ObjectList.tsx
"use client";

import { useEffect, useState } from "react";
import { ObjectCard } from "@/app/components/ObjectCard";
import { Input } from "@/app/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/tailwind/utils";
import { LostFoundObject } from "../types/object";

export function ObjectList({ refreshTrigger }: { refreshTrigger: any }) {
  const [items, setItems] = useState<LostFoundObject[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchObjects() {
      let { data } = await supabase
        .from("objects")
        .select("*")
        .order("created_at", { ascending: false });
      if (!data) return;
      const query = search.trim().toLowerCase();
      if (query) {
        data = data.filter(
          (obj) =>
            obj.title?.toLowerCase().includes(query) ||
            obj.description?.toLowerCase().includes(query) ||
            obj.location?.toLowerCase().includes(query)
        );
      }
      setItems(data);
    }
    fetchObjects();
  }, [search, refreshTrigger]);

  const lostItems = items.filter((item) => item.type === "lost");
  const foundItems = items.filter((item) => item.type === "found");

  return (
    <div className="space-y-6">
      <Input
        placeholder="Buscar por objeto, descripción o ubicación..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-zinc-100 rounded-md">
          <TabsTrigger
            value="all"
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 rounded-md text-sm font-medium"
            )}
          >
            Todos ({items.length})
          </TabsTrigger>
          <TabsTrigger
            value="lost"
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 rounded-md text-sm font-medium"
            )}
          >
            Perdidos ({lostItems.length})
          </TabsTrigger>
          <TabsTrigger
            value="found"
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:text-zinc-900 text-zinc-500 rounded-md text-sm font-medium"
            )}
          >
            Encontrados ({foundItems.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <ObjectCard key={item.id} object={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lost" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lostItems.map((item) => (
              <ObjectCard key={item.id} object={item} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="found" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {foundItems.map((item) => (
              <ObjectCard key={item.id} object={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
