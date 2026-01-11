'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight,
  Zap,
  Shield,
  Smartphone,
  Clock,
  TrendingUp,
  Users,
  Star,
  Check,
  Menu,
  X,
  ArrowRight
} from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Paga</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Características</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Cómo funciona</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Testimonios</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Precios</a>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Iniciar sesión
              </button>
              <Link
                href="/checkout"
                className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
              >
                Ver demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-gray-900 font-medium">Características</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 font-medium">Cómo funciona</a>
            <a href="#testimonials" className="block text-gray-600 hover:text-gray-900 font-medium">Testimonios</a>
            <a href="#pricing" className="block text-gray-600 hover:text-gray-900 font-medium">Precios</a>
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button className="w-full text-gray-600 hover:text-gray-900 font-medium py-2">
                Iniciar sesión
              </button>
              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white px-4 py-3 rounded-full text-center font-medium"
              >
                Ver demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50/50 via-white to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-8">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700">Usado por +500 restaurantes en Colombia</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              La forma más <span className="inline-block">rápida ⚡</span> de que tus clientes{' '}
              <span className="inline-block">paguen 💳</span> en tu restaurante
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Escanea, paga y listo. Sin esperas, sin fricción. Aumenta la rotación de mesas
              y mejora la experiencia de tus clientes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/checkout"
                className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
              >
                Comenzar gratis
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all">
                Ver cómo funciona
              </button>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white" />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">+2,000 restaurantes satisfechos</p>
              </div>
            </div>
          </div>

          {/* Hero Image - Phone Mockup */}
          <div className="mt-16 relative">
            <div className="max-w-sm mx-auto">
              {/* Phone frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-gray-900/30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Mini checkout preview */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">La Brasserie</p>
                        <p className="text-sm text-gray-500">Mesa 12 · Orden #0042</p>
                      </div>
                      <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">12</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">$185.000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Impoconsumo (8%)</span>
                        <span className="text-gray-900">$14.800</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Servicio (10%)</span>
                        <span className="text-gray-900">$18.500</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900">$218.300</span>
                      </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
                      Pagar $218.300
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="hidden lg:block absolute top-20 left-10 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pago completado</p>
                  <p className="text-sm text-gray-500">Mesa 8 · $156.000</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute top-40 right-10 bg-white rounded-2xl shadow-xl p-4 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">+23% propinas</p>
                  <p className="text-sm text-gray-500">Este mes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm font-medium text-gray-500 mb-8">
            RESTAURANTES QUE CONFÍAN EN NOSOTROS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
            {['Crepes & Waffles', 'Andrés Carne de Res', 'Wok', 'La Brasserie', 'El Cielo', 'Harry Sasson'].map((name) => (
              <div key={name} className="text-xl sm:text-2xl font-bold text-gray-400">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para{' '}
              <span className="inline-block">modernizar 🚀</span> tu restaurante
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa que transforma la experiencia de pago en tu restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Pagos instantáneos',
                description: 'Tus clientes pagan en segundos con QR. Sin esperar al mesero, sin filas.',
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Seguro y confiable',
                description: 'Procesamos pagos con los más altos estándares de seguridad. PCI DSS compliant.',
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: 'Sin app necesaria',
                description: 'Funciona directamente en el navegador. Tus clientes no necesitan descargar nada.',
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: 'Ahorra tiempo',
                description: 'Reduce el tiempo de pago un 70%. Más rotación de mesas, más ingresos.',
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: 'Aumenta propinas',
                description: 'Los clientes dan un 23% más de propina cuando el proceso es fácil.',
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: 'División de cuenta',
                description: 'Tus clientes pueden dividir la cuenta fácilmente entre todos.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Así de fácil <span className="inline-block">funciona ✨</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En 3 simples pasos, tus clientes completan el pago
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Escanea el QR',
                description: 'El cliente escanea el código QR en la mesa con su celular',
              },
              {
                step: '02',
                title: 'Revisa y paga',
                description: 'Ve el detalle de su cuenta y elige su método de pago favorito',
              },
              {
                step: '03',
                title: '¡Listo!',
                description: 'Recibe confirmación instantánea y puede irse cuando quiera',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-2xl text-2xl font-bold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Resultados que{' '}
                <span className="inline-block">hablan 📊</span> por sí solos
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nuestros restaurantes asociados ven resultados desde el primer mes.
                Datos reales de establecimientos en Colombia.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { value: '70%', label: 'Reducción en tiempo de pago' },
                  { value: '23%', label: 'Aumento en propinas' },
                  { value: '15%', label: 'Más rotación de mesas' },
                  { value: '98%', label: 'Satisfacción del cliente' },
                ].map((stat, index) => (
                  <div key={index}>
                    <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ventas del día</span>
                  <span className="text-2xl font-bold text-gray-900">$4.850.000</span>
                </div>
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 60, 90, 75].map((height, index) => (
                    <div key={index} className="flex-1 bg-gray-900 rounded-t-lg" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mié</span>
                  <span>Jue</span>
                  <span>Vie</span>
                  <span>Sáb</span>
                  <span>Dom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros <span className="inline-block">clientes 💬</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Restaurantes de todo Colombia confían en nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Desde que implementamos Paga, nuestros meseros pueden enfocarse en dar mejor servicio en vez de estar corriendo con datáfonos.',
                author: 'María González',
                role: 'Gerente, La Brasserie',
              },
              {
                quote: 'El aumento en propinas fue inmediato. Nuestro equipo está más motivado y los clientes más satisfechos.',
                author: 'Carlos Mendoza',
                role: 'Dueño, Café del Centro',
              },
              {
                quote: 'La integración fue súper fácil. En menos de una semana ya teníamos todo funcionando perfectamente.',
                author: 'Andrea Ruiz',
                role: 'Directora de Operaciones, Grupo Gastro',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Precios simples y <span className="inline-block">transparentes 💰</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sin costos ocultos. Solo pagas por lo que usas.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12">
              <div className="text-center mb-8">
                <p className="text-gray-400 mb-2">Comisión por transacción</p>
                <p className="text-5xl font-bold mb-2">1.9%</p>
                <p className="text-gray-400">+ $500 COP por transacción</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Sin costo de instalación',
                  'Sin mensualidades',
                  'QR codes ilimitados',
                  'Dashboard en tiempo real',
                  'Soporte 24/7',
                  'Todos los métodos de pago',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout"
                className="block w-full bg-white text-gray-900 py-4 rounded-full text-center font-semibold hover:bg-gray-100 transition-all"
              >
                Comenzar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Únete a los <span className="inline-block">+500 restaurantes 🍽️</span> que ya transformaron su experiencia de pago
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Empieza hoy mismo. Sin compromisos, sin costos de activación.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/checkout"
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-900/20"
            >
              Comenzar gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:text-gray-900 transition-all">
              Hablar con ventas
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-xl">Paga</span>
              </div>
              <p className="text-gray-400">
                La forma más rápida de que tus clientes paguen en tu restaurante.
              </p>
            </div>

            <div>
              <p className="font-semibold mb-4">Producto</p>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-4">Empresa</p>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-4">Newsletter</p>
              <p className="text-gray-400 mb-4">Recibe tips para mejorar tu restaurante</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
                />
                <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
                  Enviar
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 Paga. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
