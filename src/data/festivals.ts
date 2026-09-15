export interface Festival {
  name: string;
  date: string; // ISO yyyy-mm-dd
  path: string; // related figure/chant route
  note: string;
}

// Fixed-date entries recur; lunar-calendar festivals (Diwali, Navratri, Holi,
// Janmashtami, Maha Shivratri) are approximate and should be re-verified each
// year against a panchang — they're not computed from the actual lunar calendar.
export const festivals: Festival[] = [
  { name: "Navratri begins", date: "2026-10-11", path: "/hinduism/durga", note: "Nine nights of the Goddess" },
  { name: "Diwali", date: "2026-11-08", path: "/hinduism/lakshmi", note: "Festival of lights, Lakshmi puja" },
  { name: "Guru Nanak Gurpurab", date: "2026-11-24", path: "/sikhism/waheguru", note: "Birth of Guru Nanak Dev Ji" },
  { name: "Christmas", date: "2026-12-25", path: "/christianity/jesus", note: "Birth of Jesus Christ" },
  { name: "Maha Shivratri", date: "2027-02-15", path: "/hinduism/shiva", note: "Night dedicated to Shiva" },
  { name: "Holi", date: "2027-03-03", path: "/hinduism/krishna", note: "Festival of colors" },
  { name: "Ram Navami", date: "2027-04-05", path: "/hinduism/hanuman", note: "Birth of Rama, honored alongside Hanuman" },
  { name: "Janmashtami", date: "2027-08-24", path: "/hinduism/krishna", note: "Birth of Krishna" },
];

export function upcomingFestivals(from: Date = new Date(), count = 3): Festival[] {
  return festivals
    .filter((f) => new Date(f.date) >= from)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, count);
}
