'use client'

import { useEffect, useState } from 'react'
import { Github, MessageCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card } from '../../components/ui/card'
import { useNavigate } from 'react-router-dom'

export default function Contact() {
  const [text, setText] = useState('')
  const fullText = '¡Hola! Somos desarrolladores apasionados por crear soluciones digitales innovadoras.'
  const [index, setIndex] = useState(0)

  const navigate = useNavigate();

  const handleManagment = () => {
    navigate("/");
  };

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [index])

  const developers = [
    {
      name: 'Puchalski Eric',
      github: 'https://github.com/dev1',
      whatsapp: 'https://wa.me/3765009935'
    },
    {
      name: 'Villalba Gonzalo',
      github: 'https://github.com/dev2',
      whatsapp: 'https://wa.me/3765009935'
    }
  ]

  const handleLogout = () => {
    // Lógica para manejar la salida del usuario
    console.log('Salir');
    // Aquí podrías redirigir al usuario o limpiar el estado de autenticación.
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: 'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programacion-aec7a31NE2zc5SL7ishXcfDJWaqecm.jpg")',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Flecha roja grande apuntando a la izquierda */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-red-600"
        width="80"
        height="80"
        viewBox="0 0 24 24"
        style={{ zIndex: 10 }}
      >
        <path d="M14 2L8 12h12l-6 10l6-10H8z" />
      </svg>

      <Card className="max-w-2xl w-full bg-gray-900 text-white p-8 rounded-xl shadow-lg relative z-20">
        <div className="space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center min-h-[80px] bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 bg-clip-text text-transparent shadow-lg">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {developers.map((dev, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-semibold text-center">{dev.name}</h2>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-white hover:bg-blue-600 border-blue-600"
                    asChild
                  >
                    <a href={dev.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent text-white hover:bg-green-600 border-green-600"
                    asChild
                  >
                    <a href={dev.whatsapp} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5 " />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-white/80">
            ¿Tienes un proyecto en mente? <span className="font-semibold text-white">¡Contáctanos!</span>
          </p>

          {/* Botón Salir */}
          <div className="text-center">
            <Button 
              variant="outline" 
              className="mt-4 w-full bg-transparent text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
              onClick={handleManagment}
            >
              Salir
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
