import Container from './Container.jsx'
import Badge from './Badge.jsx'

const AMAZON_WISHLIST = 'https://www.amazon.com.mx/hz/wishlist/ls/27N2W4Y12UBFS?ref_=wl_share'
const LIVERPOOL_LISTA = 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51935393'

const ADDRESS = 'Cda. Punta Roca 159, 76230 Juriquilla, Qro.'
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8EEC5] via-posterCream to-posterCream" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-minionYellow/40 blur-3xl" />
        <div className="absolute -right-24 -top-16 h-72 w-72 rounded-full bg-posterBlue/20 blur-3xl" />
      </div>

      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge>Llamando a todos los</Badge>
              <Badge>Minions</Badge>
              <Badge>y Villanos</Badge>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-posterTeal sm:text-5xl">
              ¡A la celebración del
              <span className="block text-minionYellow drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]">
                3er Cumpleaños de Santiago!
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-white/80 px-5 py-3 shadow-soft ring-1 ring-black/5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">Fecha</div>
                <div className="text-lg font-extrabold text-slate-900">28 Febrero</div>
              </div>
              <div className="rounded-2xl bg-white/80 px-5 py-3 shadow-soft ring-1 ring-black/5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">Hora</div>
                <div className="text-lg font-extrabold text-slate-900">2:30 pm</div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-soft ring-1 ring-black/5">
              <div className="text-sm font-semibold text-slate-700">Lugar</div>
              <p className="mt-1 text-base text-slate-800">
                En el Salón de Fiestas <span className="font-semibold">“El Patio de mi casa”</span> ubicado en
                <span className="block font-semibold">{ADDRESS}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-posterTeal px-5 py-3 text-sm font-bold text-white shadow-soft hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  Ver ubicación
                </a>
                <a
                  href="#regalos"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-posterTeal shadow-soft ring-1 ring-black/10 hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/40"
                >
                  Mesa de regalos
                </a>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                (También puedes ver las ligas de regalos al final.)
              </p>
            </div>
          </div>

          {/* Right: poster image */}
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-white/40 blur" />
            <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-soft ring-1 ring-black/10">
              <img
                src="/assets/page-1.png"
                alt="Invitación (página 1)"
                className="h-auto w-full"
                loading="eager"
              />
            </div>            
          </div>
        </div>
      </Container>
    </header>
  )
}
