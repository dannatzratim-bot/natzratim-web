import Link from "next/link";
import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { LinkButton } from "@/components/button";
import { IconArrowRight, IconCalendar, IconSearch } from "@/components/icons";
import { listEvents } from "@/lib/data";
import { formatDate, formatTime } from "@/lib/format";

type EventPageProps = {
  searchParams: Promise<{
    q?: string;
    month?: string;
  }>;
};

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export default async function EventosPage({ searchParams }: EventPageProps) {
  const params = await searchParams;
  const month = params.month || currentMonth();
  const events = await listEvents({ search: params.q, month });
  const months = [0, 1, 2, 3, 4, 5].map((offset) => {
    const date = new Date();
    date.setMonth(date.getMonth() + offset);
    return date.toISOString().slice(0, 7);
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        kicker="Eventos"
        title="Calendario y festividades"
        description="Vista mensual y lista de próximos encuentros, con detalle para cada evento."
      />

      <form className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Buscar eventos</span>
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={params.q}
            placeholder="Buscar eventos"
            className="w-full rounded-full border border-parchment-300 bg-white/90 py-3 pl-12 pr-4 text-sm shadow-sm focus:border-temple-400 focus:outline-none focus:ring-2 focus:ring-temple-500/20"
          />
        </label>
        <button className="rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">Buscar</button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3">
        {months.map((value) => (
          <Link
            key={value}
            href={`/eventos?month=${value}`}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${value === month ? "border-temple-700 bg-temple-900 text-white" : "border-parchment-300 bg-white text-temple-900"}`}
          >
            {value}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-parchment-600">
                  <IconCalendar className="h-4 w-4" />
                  {event.category}
                </div>
                <span className="text-sm font-semibold text-temple-900">{formatDate(event.event_date)}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold text-temple-900">{event.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">{event.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>Hora: {formatTime(event.start_time)} {event.end_time ? `- ${formatTime(event.end_time)}` : ""}</span>
                <span>Lugar: {event.location ?? "Por definir"}</span>
              </div>
              <div className="mt-5">
                <LinkButton href={`/eventos/${event.slug}`} variant="secondary">
                  Ver detalle
                  <IconArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Vista mensual</p>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-slate-500">
            {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
              <div key={day} className="py-2 font-semibold uppercase tracking-[0.18em]">
                {day}
              </div>
            ))}
            {calendarCells(month, events).map((cell, index) => (
              <div
                key={`${cell.label}-${index}`}
                className={`min-h-20 rounded-2xl border p-2 text-left ${cell.active ? "border-temple-200 bg-temple-50 text-temple-900" : "border-parchment-200 bg-white text-slate-400"}`}
              >
                <div className="text-xs font-semibold">{cell.label}</div>
                {cell.event ? <div className="mt-2 text-[11px] leading-4 text-temple-700">{cell.event.title}</div> : null}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function calendarCells(month: string, events: Awaited<ReturnType<typeof listEvents>>) {
  const [year, monthIndex] = month.split("-").map(Number);
  const first = new Date(year, monthIndex - 1, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex, 0).getDate();
  const total = Math.ceil((startDay + daysInMonth) / 7) * 7;
  const result: Array<{ label: string; active: boolean; event?: (typeof events)[number] }> = [];
  for (let index = 0; index < total; index += 1) {
    const day = index - startDay + 1;
    if (day < 1 || day > daysInMonth) {
      result.push({ label: "", active: false });
      continue;
    }
    const iso = `${month}-${String(day).padStart(2, "0")}`;
    result.push({ label: String(day), active: true, event: events.find((item) => item.event_date.startsWith(iso)) });
  }
  return result;
}

