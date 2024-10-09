import { UserPlus, Bed, Bell, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32 rounded-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sistema de Triaje para Hospitales
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Clasifique y gestione eficientemente a los pacientes para una
              atención óptima entrega
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/ingresos"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Comience
              </Link>
              <a
                href="#features"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Más información <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Gestión eficiente de pacientes
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para gestionar el triaje hospitalario
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nuestro sistema agiliza el proceso de clasificación, asegurando
              que los pacientes recibir atención oportuna y adecuada según la
              gravedad de su condiciones.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <UserPlus
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Admisión de pacientes
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Registre y clasifique rápidamente a los pacientes entrantes
                  según sus síntomas y urgencia.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Bed className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Gestión de salas
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Asigne y realice un seguimiento eficiente de los pacientes en
                  diferentes salas y departamentos del hospital.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Bell className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Notificaciones
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Manténgase informado con alertas y actualizaciones en tiempo
                  real sobre el paciente Estado y situaciones críticas.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <Activity
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  Analíticas
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Obtenga información sobre el rendimiento del hospital y el
                  flujo de pacientes con análisis e informes completos.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Aumente la eficiencia de su hospital.
                <br />
                Comience a usar nuestra aplicación hoy.
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Mejore la atención al paciente y agilice las operaciones de su
                hospital con nuestro avanzado sistema de triaje.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  to="/login"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Comience
                </Link>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-white"
                >
                  Mas información <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <img
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80"
                alt="App screenshot"
                width={1824}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
