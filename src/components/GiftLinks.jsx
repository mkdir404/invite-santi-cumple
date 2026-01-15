import Container from './Container.jsx'

const AMAZON_WISHLIST = 'https://www.amazon.com.mx/hz/wishlist/ls/27N2W4Y12UBFS?ref_=wl_share'
const LIVERPOOL_LISTA = 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/51935393'

function GiftButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex w-full items-center justify-center rounded-2xl bg-minionYellow px-5 py-3 text-sm font-extrabold text-slate-900 shadow-soft ring-1 ring-black/10 hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
    >
      {label}
      <span className="ml-2 inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  )
}

export default function GiftLinks() {
  return (
    <section id="regalos" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-posterCream to-transparent" />
        <div className="absolute inset-0 bg-posterCream" />
      </div>

      <div className="bg-posterBlue">
        <Container className="py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                ¡TE ESPERAMOS!!!
              </h2>
              <p className="max-w-prose text-white/85">
                Si quieres apoyar con un regalito, aquí están las ligas de la mesa de regalos.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <GiftButton href={AMAZON_WISHLIST} label="Wishlist Amazon" />
                <GiftButton href={LIVERPOOL_LISTA} label="Mesa de regalos Liverpool" />
              </div>

              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <div className="text-xs font-semibold uppercase tracking-wider text-white/70">Ligas directas</div>
                <div className="mt-2 space-y-2">
                  <a
                    href={AMAZON_WISHLIST}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all text-sm font-semibold text-minionYellow underline decoration-minionYellow/40 underline-offset-4 hover:decoration-minionYellow"
                  >
                    {AMAZON_WISHLIST}
                  </a>
                  <a
                    href={LIVERPOOL_LISTA}
                    target="_blank"
                    rel="noreferrer"
                    className="block break-all text-sm font-semibold text-minionYellow underline decoration-minionYellow/40 underline-offset-4 hover:decoration-minionYellow"
                  >
                    {LIVERPOOL_LISTA}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-black/25 blur" />
              <div className="spark-bg overflow-hidden rounded-[2.5rem] bg-[#F8EEC5] shadow-soft ring-1 ring-white/10">
                <img
                  src="/assets/page-2.png"
                  alt="Invitación (página 2)"
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>              
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
