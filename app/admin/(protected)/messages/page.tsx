import { Card } from "@/components/card";
import { SectionHeading } from "@/components/section-heading";
import { listContactMessages } from "@/lib/data";
import { markMessageReadAction } from "@/app/admin/(protected)/messages/actions";
import { formatDateTime } from "@/lib/format";

export default async function MessagesPage() {
  const messages = await listContactMessages();

  return (
    <div className="space-y-6">
      <SectionHeading kicker="Mensajes" title="Bandeja de contacto" description="Revisa, marca como leído y da seguimiento a las solicitudes recibidas." />
      <Card className="overflow-x-auto p-0">
        <table className="min-w-full divide-y divide-parchment-200 text-sm">
          <thead className="bg-parchment-50 text-left text-xs uppercase tracking-[0.22em] text-parchment-600">
            <tr>
              <th className="px-5 py-4">Nombre</th>
              <th className="px-5 py-4">Asunto</th>
              <th className="px-5 py-4">Fecha</th>
              <th className="px-5 py-4">Estado</th>
              <th className="px-5 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-parchment-200 bg-white">
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="px-5 py-4">
                  <div className="font-semibold text-temple-900">{message.name}</div>
                  <div className="text-xs text-slate-500">{message.email}</div>
                </td>
                <td className="px-5 py-4 text-slate-700">{message.subject}</td>
                <td className="px-5 py-4 text-slate-700">{formatDateTime(message.created_at)}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.read_at ? "bg-emerald-100 text-emerald-700" : "bg-parchment-100 text-parchment-700"}`}>
                    {message.read_at ? "Leído" : "Pendiente"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {!message.read_at ? (
                    <form action={markMessageReadAction}>
                      <input type="hidden" name="id" value={message.id} />
                      <button className="rounded-full border border-parchment-300 px-3 py-2 text-xs font-semibold text-temple-900">
                        Marcar leído
                      </button>
                    </form>
                  ) : (
                    <span className="text-xs text-slate-500">Sin acciones</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

