import { useState, useEffect } from 'react'
import Container from './Container.jsx'

const BALLOON_COLORS = [
  'bg-minionYellow',
  'bg-posterBlue',
  'bg-posterTeal',
  'bg-red-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500'
]

const GAME_DURATION = 10 // segundos

export default function BalloonGame() {
  const [balloons, setBalloons] = useState([])
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('balloonGame_bestScore') || '0')
  })
  const [nextBalloonId, setNextBalloonId] = useState(1)
  const [lastBalloonTime, setLastBalloonTime] = useState(0)

  // Temporizador del juego
  useEffect(() => {
    let timer
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Fin del juego
            setGameStarted(false)
            // Verificar si es un nuevo récord
            if (score > bestScore) {
              setBestScore(score)
              localStorage.setItem('balloonGame_bestScore', score.toString())
            }
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameStarted, timeLeft, score, bestScore])

  // Inicializar globos al montar el componente
  useEffect(() => {
    if (!gameStarted) {
      initializeBalloons()
    }
  }, [gameStarted])

  const initializeBalloons = () => {
    // Solo crear un globo al inicio
    const newBalloons = [{
      id: 0,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      x: Math.random() * 80 + 10, // 10% - 90% del ancho
      y: -30, // Comenzar más arriba para caída más visible
      popped: false,
      size: Math.random() * 40 + 60, // 60px - 100px
      fallSpeed: Math.random() * 3 + 2, // Velocidad de caída más rápida (2-5)
    }]
    setBalloons(newBalloons)
  }

  // Animar caída de globos
  useEffect(() => {
    if (!gameStarted) return

    const animationFrame = setInterval(() => {
      setBalloons(prevBalloons =>
        prevBalloons.map(balloon => {
          if (balloon.popped) return balloon

          const newY = balloon.y + balloon.fallSpeed
          // Si el globo llega al fondo, marcarlo para eliminación
          if (newY > 100) {
            return null
          }
          return { ...balloon, y: newY }
        }).filter(balloon => balloon !== null) // Remover globos que cayeron
      )
    }, 50) // Actualizar cada 50ms

    return () => clearInterval(animationFrame)
  }, [gameStarted])

  // Agregar nuevos globos periódicamente
  useEffect(() => {
    if (!gameStarted) return

    const spawnInterval = setInterval(() => {
      setBalloons(prevBalloons => {
        // Solo agregar si hay menos de 8 globos y quedan menos de 8 segundos
        if (prevBalloons.length < 8 && timeLeft > 2) {
          const newBalloon = {
            id: Date.now(), // Usar timestamp como ID único
            color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
            x: Math.random() * 80 + 10,
            y: -30,
            popped: false,
            size: Math.random() * 40 + 60,
            fallSpeed: Math.random() * 3 + 2,
          }
          return [...prevBalloons, newBalloon]
        }
        return prevBalloons
      })
    }, 2000) // Nuevo globo cada 2 segundos

    return () => clearInterval(spawnInterval)
  }, [gameStarted, timeLeft])

  const popBalloon = (balloonId) => {
    setBalloons(prevBalloons =>
      prevBalloons.map(balloon =>
        balloon.id === balloonId
          ? { ...balloon, popped: true }
          : balloon
      )
    )
    setScore(prevScore => prevScore + 10)
  }

  const resetGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setGameStarted(false)
  }

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setNextBalloonId(1)
    setLastBalloonTime(Date.now())
  }

  const poppedCount = balloons.filter(balloon => balloon.popped).length
  const totalBalloons = balloons.length
  const isGameComplete = timeLeft === 0 && gameStarted
  const isNewRecord = score > bestScore && timeLeft === 0

  return (
    <section id="balloon-game" className="relative overflow-hidden bg-gradient-to-b from-posterCream to-white py-12">
      <Container className="text-center">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-posterBlue sm:text-4xl">
              🎈 ¡Juego de Globos Minions! 🎈
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              ¡Rompe los globos cayendo en 30 segundos! ¿Puedes batir tu mejor récord? 🎯⏱️
            </p>
          </div>

          {/* Controles del juego */}
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            {!gameStarted ? (
              <button
                onClick={startGame}
                className="rounded-full bg-minionYellow px-8 py-4 text-lg font-bold text-slate-900 shadow-soft transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-minionYellow/50"
              >
                🚀 ¡Comenzar Juego! ({GAME_DURATION}s)
              </button>
            ) : (
              <button
                onClick={resetGame}
                className="rounded-full bg-posterTeal px-8 py-4 text-lg font-bold text-white shadow-soft transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-posterTeal/50"
              >
                🔄 Reiniciar
              </button>
            )}

            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="rounded-2xl bg-white/80 px-6 py-3 shadow-soft">
                <div className="text-xl font-bold text-posterBlue">
                  ⏱️ {timeLeft}s
                </div>
                <div className="text-sm text-slate-600">
                  Tiempo restante
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 px-6 py-3 shadow-soft">
                <div className="text-xl font-bold text-posterBlue">
                  🎯 {score}
                </div>
                <div className="text-sm text-slate-600">
                  Puntaje actual
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 px-6 py-3 shadow-soft">
                <div className="text-xl font-bold text-posterTeal">
                  🏆 {bestScore}
                </div>
                <div className="text-sm text-slate-600">
                  Mejor récord
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de fin del juego */}
          {isGameComplete && (
            <div className={`rounded-3xl p-6 text-white shadow-soft transition-all duration-500 ${
              isNewRecord
                ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse'
                : 'bg-gradient-to-r from-minionYellow to-posterBlue'
            }`}>
              <h3 className="text-2xl font-bold">
                {isNewRecord ? '🏆 ¡NUEVO RÉCORD! 🏆' : '⏰ ¡Tiempo terminado! ⏰'}
              </h3>
              <p className="mt-2 text-lg">
                Puntaje final: <strong>{score}</strong> puntos
                {isNewRecord && <span className="block text-xl animate-bounce">¡Has batido tu mejor marca!</span>}
              </p>
              <div className="mt-2 text-sm opacity-90">
                Globos rotos: {poppedCount} | Mejor récord: {Math.max(score, bestScore)}
              </div>
              <button
                onClick={resetGame}
                className="mt-4 rounded-full bg-white px-6 py-3 font-bold text-posterBlue transition-all hover:scale-105 shadow-lg"
              >
                🎈 Jugar de nuevo
              </button>
            </div>
          )}

          {/* Indicador de tiempo crítico */}
          {gameStarted && timeLeft <= 5 && timeLeft > 0 && (
            <div className="rounded-2xl bg-red-500 px-6 py-3 text-white shadow-soft animate-pulse">
              <div className="text-xl font-bold">⚠️ ¡{timeLeft} segundos restantes!</div>
            </div>
          )}

          {/* Área de juego */}
          {gameStarted && (
            <div className="relative mx-auto h-96 w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-b from-sky-200 to-sky-100 shadow-inner">
              {/* Nubes decorativas */}
              <div className="absolute left-4 top-4 text-4xl">☁️</div>
              <div className="absolute right-8 top-8 text-3xl">☁️</div>
              <div className="absolute bottom-4 left-8 text-2xl">☁️</div>

              {/* Globos cayendo */}
              {balloons.map((balloon) => (
                <button
                  key={balloon.id}
                  onClick={() => !balloon.popped && gameStarted && timeLeft > 0 && popBalloon(balloon.id)}
                  className={`absolute transform transition-all duration-300 focus:outline-none ${
                    balloon.popped
                      ? 'animate-ping opacity-0 pointer-events-none'
                      : `${balloon.color} hover:scale-110 hover:brightness-110 shadow-lg animate-bounce`
                  }`}
                  style={{
                    left: `${balloon.x}%`,
                    top: `${balloon.y}%`,
                    width: `${balloon.size}px`,
                    height: `${balloon.size}px`,
                    borderRadius: '50%', // Forma perfectamente circular
                    animationDuration: `${balloon.fallSpeed * 0.5}s`, // Velocidad de flotación
                  }}
                  disabled={balloon.popped || !gameStarted || timeLeft === 0}
                >
                  {!balloon.popped && (
                    <>
                      {/* Cuerda del globo */}
                      <div className="absolute bottom-0 left-1/2 h-8 w-0.5 -translate-x-1/2 transform bg-slate-600"></div>
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-slate-600"></div>
                      {/* Brillo del globo */}
                      <div className="absolute left-2 top-2 h-3 w-3 rounded-full bg-white/60"></div>
                    </>
                  )}

                  {/* Efecto de explosión */}
                  {balloon.popped && (
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      💥
                    </div>
                  )}
                </button>
              ))}

              {/* Instrucciones */}
              {!isGameComplete && gameStarted && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-soft">
                  🎈 ¡Rompe los globos cayendo antes de que se acabe el tiempo!
                </div>
              )}

              {!gameStarted && !isGameComplete && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/90 px-8 py-6 text-center shadow-soft">
                    <div className="text-4xl mb-2">🎈</div>
                    <div className="text-lg font-bold text-slate-700 mb-2">¿Listo para jugar?</div>
                    <div className="text-sm text-slate-600">
                      Haz clic en "¡Comenzar Juego!" para iniciar el desafío de 30 segundos
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}