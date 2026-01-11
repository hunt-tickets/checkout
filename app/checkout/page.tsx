'use client'

import { useState, useMemo } from 'react'
import {
  Check,
  CreditCard,
  Banknote,
  Sparkles,
  ChevronRight
} from 'lucide-react'

// Types
type PaymentMethod = 'apple-pay' | 'google-pay' | 'card' | 'pse' | 'cash'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

// Mock data
const mockItems: OrderItem[] = [
  { id: '1', name: 'Wagyu Ribeye Steak', quantity: 1, price: 189000, notes: 'Término medio' },
  { id: '2', name: 'Risotto de Trufa', quantity: 1, price: 68000 },
  { id: '3', name: 'Ensalada César', quantity: 2, price: 32000 },
  { id: '4', name: 'Château Margaux 2015', quantity: 1, price: 1250000 },
  { id: '5', name: 'Crème Brûlée', quantity: 2, price: 28000 },
]

const TABLE_NUMBER = 12
const RESTAURANT_NAME = 'La Brasserie'
const HIPOCONSUMO_RATE = 0.10
const SERVICE_RATE = 0.10 // 10% propina voluntaria

export default function CheckoutPage() {
  const [includeService, setIncludeService] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  // Card details
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')

  // Calculations
  const subtotal = useMemo(() =>
    mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    []
  )

  const hipoconsumo = useMemo(() => subtotal * HIPOCONSUMO_RATE, [subtotal])
  const totalSinServicio = useMemo(() => subtotal + hipoconsumo, [subtotal, hipoconsumo])
  const servicio = useMemo(() => subtotal * SERVICE_RATE, [subtotal])
  const totalConServicio = useMemo(() => totalSinServicio + servicio, [totalSinServicio, servicio])
  const totalFinal = useMemo(() => includeService ? totalConServicio : totalSinServicio, [includeService, totalConServicio, totalSinServicio])

  const handlePayment = async () => {
    if (!paymentMethod) return

    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsPaid(true)
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  // Success Screen
  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="animate-fade-in text-center space-y-8">
            {/* Success Icon */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                ¡Pago Completado!
              </h1>
              <p className="text-gray-500">Gracias por visitarnos</p>
            </div>

            {/* Receipt */}
            <div className="bg-white rounded-2xl p-6 text-left space-y-4 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-semibold text-gray-900">{RESTAURANT_NAME}</p>
                  <p className="text-sm text-gray-500">Mesa {TABLE_NUMBER}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hipoconsumo</span>
                  <span className="text-gray-900">{formatCurrency(hipoconsumo)}</span>
                </div>
                {includeService && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Servicio voluntario (10%)</span>
                    <span className="text-green-600">{formatCurrency(servicio)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Total Pagado</span>
                <span className="text-green-600">{formatCurrency(totalFinal)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
                Enviar Recibo por Email
              </button>
              <button
                onClick={() => {
                  setIsPaid(false)
                  setPaymentMethod(null)
                  setIncludeService(true)
                }}
                className="w-full py-4 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Nuevo Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-600">
                  {RESTAURANT_NAME}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Mesa {TABLE_NUMBER}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Tu Cuenta
          </h1>
          <p className="text-gray-500 mt-1">
            Mesa {TABLE_NUMBER}
          </p>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="max-h-[240px] overflow-y-auto">
            {mockItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-start justify-between p-4 ${
                  index !== mockItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 w-5">{item.quantity}×</span>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-500 ml-7 mt-0.5">{item.notes}</p>
                  )}
                </div>
                <span className="font-medium tabular-nums text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-900">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Hipoconsumo ({(HIPOCONSUMO_RATE * 100).toFixed(0)}%)</span>
            <span className="tabular-nums">{formatCurrency(hipoconsumo)}</span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            {/* Toggle servicio */}
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-900">Incluir servicio</span>
                <span className="text-sm text-gray-500 ml-2">(10% voluntario)</span>
              </div>
              <button
                onClick={() => setIncludeService(!includeService)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  includeService ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    includeService ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {includeService && (
              <div className="flex justify-between text-gray-500 mt-2">
                <span>Servicio</span>
                <span className="tabular-nums">+{formatCurrency(servicio)}</span>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900 text-lg">Total</span>
              <span className="font-bold text-xl tabular-nums">{formatCurrency(totalFinal)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Método de pago</p>

          <div className="grid grid-cols-4 gap-2">
            {/* Apple Pay */}
            <button
              onClick={() => setPaymentMethod('apple-pay')}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'apple-pay'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M17.0425 12.3095C17.0425 11.0555 17.6785 9.9785 18.7265 9.3495C18.0685 8.4215 17.0645 7.9015 15.7415 7.8195C14.4185 7.7375 13.0155 8.6145 12.5365 8.6145C12.0575 8.6145 10.8335 7.8605 9.7955 7.8605C7.6225 7.9015 5.3065 9.3905 5.3065 12.5145C5.3065 13.4835 5.4945 14.4835 5.8695 15.5145C6.3755 16.9215 8.2015 20.1865 10.1095 20.1045C11.0655 20.0635 11.7385 19.4155 12.9955 19.4155C14.2525 19.4155 14.8705 20.1045 15.9335 20.1045C17.8605 20.0635 19.5025 17.1215 19.9815 15.7145C17.3685 14.4435 17.0425 12.3915 17.0425 12.3095ZM14.7545 6.4515C15.6085 5.4155 15.4995 4.4635 15.4645 4.0865C14.7075 4.1275 13.8395 4.6185 13.3375 5.2145C12.7915 5.8515 12.4575 6.6455 12.5315 7.5185C13.3495 7.5855 14.1045 7.1285 14.7545 6.4515Z"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Apple Pay</span>
            </button>

            {/* Google Pay */}
            <button
              onClick={() => setPaymentMethod('google-pay')}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'google-pay'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700">Google Pay</span>
            </button>

            {/* PSE */}
            <button
              onClick={() => setPaymentMethod('pse')}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'pse'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-10 h-10 bg-[#003B71] rounded-lg flex items-center justify-center overflow-hidden relative">
                <span className="text-white font-bold text-sm tracking-tight">PSE</span>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#FC7003] rounded-full"></div>
              </div>
              <span className="text-xs font-medium text-gray-700">PSE</span>
            </button>

            {/* Efectivo */}
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                paymentMethod === 'cash'
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Banknote className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700">Efectivo</span>
            </button>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">o pagar con tarjeta</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Card Form */}
          <div
            onClick={() => setPaymentMethod('card')}
            className={`bg-white rounded-2xl p-4 space-y-3 border-2 transition-all cursor-pointer ${
              paymentMethod === 'card' ? 'border-gray-900' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Datos de tarjeta</span>
            </div>

            <input
              type="text"
              placeholder="Número de tarjeta"
              value={cardNumber}
              onChange={(e) => {
                setPaymentMethod('card')
                const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                const formatted = value.replace(/(\d{4})/g, '$1 ').trim()
                setCardNumber(formatted)
              }}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/AA"
                value={cardExpiry}
                onChange={(e) => {
                  setPaymentMethod('card')
                  const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                  const formatted = value.length > 2 ? `${value.slice(0, 2)}/${value.slice(2)}` : value
                  setCardExpiry(formatted)
                }}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <input
                type="text"
                placeholder="CVV"
                value={cardCvv}
                onChange={(e) => {
                  setPaymentMethod('card')
                  setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))
                }}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>

            <input
              type="text"
              placeholder="Nombre en la tarjeta"
              value={cardName}
              onChange={(e) => {
                setPaymentMethod('card')
                setCardName(e.target.value)
              }}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            paymentMethod && !isProcessing
              ? 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98] shadow-lg shadow-gray-900/20'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              Pagar {formatCurrency(totalFinal)}
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Safe Area */}
        <div className="h-4" />
      </main>
    </div>
  )
}
