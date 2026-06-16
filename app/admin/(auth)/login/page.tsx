import { signInAction } from "@/app/admin/(auth)/login/actions";
import { Logo } from "@/components/logo";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="rounded-[2rem] border border-parchment-200 bg-white/90 p-8 shadow-shrine">
      <div className="flex justify-center">
        <Logo compact />
      </div>
      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-parchment-600">Acceso administrativo</p>
        <h1 className="font-display text-3xl font-bold text-temple-900">Iniciar sesión</h1>
        <p className="text-sm leading-7 text-slate-600">Usa tu usuario o correo y contraseña de Supabase Auth.</p>
      </div>
      {params.error ? <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{params.error}</div> : null}
      <form action={signInAction} className="mt-6 space-y-4">
        <input name="identifier" required placeholder="Usuario o correo" className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
        <input name="password" type="password" required placeholder="Contraseña" className="w-full rounded-2xl border border-parchment-200 px-4 py-3 text-sm" />
        <button className="w-full rounded-full bg-temple-900 px-5 py-3 text-sm font-semibold text-white shadow-shrine">Entrar</button>
      </form>
    </div>
  );
}

