import { useState } from 'react'
import Container from './Container.jsx'

export default function Footer() {
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('Por favor ingresa tu nombre o familia')
      return
    }

    setIsSubmitting(true)

    try {
      // Método híbrido: Funciona tanto en desarrollo como producción
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfPhPiSAYmKRPUQ-JcCdWNRKTR5iUWcF-my6azatuZQkj382Q/formResponse'

      // Usar el nombre proporcionado (ahora es obligatorio)
      const finalName = name.trim()

      // Para desarrollo local: usar iframe oculto (evita CORS completamente)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        await submitViaIframe(formUrl, finalName)
      } else {
        // Para producción: usar fetch con no-cors
        const formData = new FormData()
        formData.append('entry.1703187310', finalName)
        await fetch(formUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors'
        })
      }

      setIsSubmitted(true)
      setName('')
    } catch (error) {
      console.error('Error al enviar:', error)
      // En desarrollo local, mostrar éxito aunque haya error de CORS
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setIsSubmitted(true)
        setName('')
        return
      }
      alert('Hubo un error al confirmar tu asistencia. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función auxiliar para enviar vía iframe (evita CORS)
  const submitViaIframe = (formUrl, nameValue) => {
    return new Promise((resolve) => {
      // Crear iframe oculto
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.name = 'google-form-iframe'

      // Crear formulario temporal
      const form = document.createElement('form')
      form.action = formUrl
      form.method = 'POST'
      form.target = 'google-form-iframe'

      // Agregar campo
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'entry.1703187310'
      input.value = nameValue
      form.appendChild(input)

      // Agregar al DOM y enviar
      document.body.appendChild(iframe)
      document.body.appendChild(form)

      // Resolver después de un breve delay (tiempo para que se envíe)
      setTimeout(() => {
        form.submit()
        setTimeout(() => {
          document.body.removeChild(form)
          document.body.removeChild(iframe)
          resolve()
        }, 1000)
      }, 100)
    })
  }

  return (
    <footer className="bg-posterCream">
      <Container className="py-10">
        <div className="rounded-3xl bg-white/70 p-6 shadow-soft ring-1 ring-black/5">
          {isSubmitted ? (
            <div className="text-center">
              <p className="text-lg font-bold text-posterTeal mb-2">
                ¡Gracias por confirmar tu asistencia! 🎉
              </p>
              <p className="text-sm text-slate-600">
                Te esperamos con ansias
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-4 py-2 bg-minionYellow text-slate-900 font-semibold rounded-xl hover:brightness-105 transition-colors"
              >
                Confirmar otra asistencia
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-base font-bold text-posterTeal text-center">
                Confirma tu asistencia al evento
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre o Familia
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ingresa tu nombre o familia"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-posterTeal focus:ring-2 focus:ring-posterTeal/20 outline-none transition-colors"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-posterBlue text-white font-bold rounded-xl shadow-soft hover:bg-posterTeal focus:outline-none focus:ring-4 focus:ring-posterBlue/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Confirmando...
                    </>
                  ) : (
                    <>
                      Confirmar asistencia ✨
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              ¡Nos vemos pronto! 💛💙
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
