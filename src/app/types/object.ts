export interface LostFoundObject {
  id: string;
  title: string;
  description?: string;
  type: "lost" | "found";
  location?: string;
  contact?: string;
  event_date?: Date;
}
