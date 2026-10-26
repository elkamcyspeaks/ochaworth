import data from "@/data/programsPage.json"

export type Status = "ongoing" | "upcoming" | "completed"
export interface Program {
  slug?: string
  title: string
  category: string
  status: Status
  location: string
  date: string
  beneficiaries: string
  raised: number
  goal: number
  description: string
  summary?: string
  objectives: string[]
  impact: string
  coordinator: string
  partners: string[]
  img: string
  images: string[]
  startDate?: string
  endDate?: string
  galleryCollection?: string
}
export function programSlug(p: Pick<Program, "slug" | "title">) {
  return (
    p.slug?.trim() ||
    p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  )
}
export const programPath = (p: Pick<Program, "slug" | "title">) =>
  "/programs/" + programSlug(p)
export function datedStatus(
  p: Pick<Program, "status" | "startDate" | "endDate">,
  today: string,
): Status {
  if (p.startDate && today < p.startDate) return "upcoming"
  if (p.endDate && today > p.endDate) return "completed"
  if (p.startDate && p.endDate) return "ongoing"
  return p.status
}
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Lagos",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date())
export const programs: Program[] = data.programs.map((p) => ({
  ...p,
  status: datedStatus(p as Program, today),
  objectives: p.objectives ?? [],
  partners: p.partners ?? [],
  images: p.images ?? [],
}))
