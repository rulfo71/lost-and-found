import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { MapPin, Calendar, User } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/lib/tailwind/utils";
import { LostFoundObject } from "../types/object";

export function ObjectCard({ object }: { object: LostFoundObject }) {
  return (
    <Card className="p-4 space-y-2 border border-zinc-200 shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{object.title}</CardTitle>
            <CardDescription className="mt-1">
              {object.description}
            </CardDescription>
          </div>
          <Badge
            className={cn(
              "font-bold",
              object.type === "lost" ? "bg-red-200" : "bg-green-200"
            )}
          >
            {object.type === "lost" ? "Perdido" : "Encontrado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {object.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(object.event_date ?? "").toLocaleDateString("es-ES")}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            {object.contact}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
