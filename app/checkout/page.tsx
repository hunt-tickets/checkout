'use client'

import { useState, useMemo } from 'react'
import {
  Check,
  CreditCard,
  Sparkles,
  ChevronRight,
  ChevronDown
} from 'lucide-react'

// Types
type PaymentMethod = 'apple-pay' | 'google-pay' | 'card' | 'pse' | 'nequi' | 'cash'

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
  const [isItemsExpanded, setIsItemsExpanded] = useState(false)

  // Card details
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')

  // Invoice
  const [wantsInvoice, setWantsInvoice] = useState(false)
  const [invoiceNit, setInvoiceNit] = useState('')
  const [invoiceName, setInvoiceName] = useState('')
  const [invoiceEmail, setInvoiceEmail] = useState('')

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
      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{RESTAURANT_NAME}</h1>
            <p className="text-sm text-gray-500">Mesa {TABLE_NUMBER}</p>
          </div>
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{TABLE_NUMBER}</span>
          </div>
        </div>

        {/* Items List - Collapsible */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <button
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Resumen del pedido</span>
              <span className="text-sm text-gray-500">({mockItems.length} items)</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${
                isItemsExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isItemsExpanded && (
            <div className="border-t border-gray-100 max-h-[240px] overflow-y-auto">
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
          )}
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

          <select
            value={paymentMethod || ''}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-gray-900 transition-all appearance-none cursor-pointer"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
          >
            <option value="" disabled>Seleccionar método de pago</option>
            <option value="apple-pay">Apple Pay</option>
            <option value="google-pay">Google Pay</option>
            <option value="pse">PSE</option>
            <option value="nequi">Nequi</option>
            <option value="cash">Efectivo</option>
          </select>

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

        {/* Invoice */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div
            onClick={() => setWantsInvoice(!wantsInvoice)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div>
              <span className="font-medium text-gray-900">Factura electrónica</span>
              <p className="text-sm text-gray-500">Solicitar factura con datos fiscales</p>
            </div>
            <button
              className={`relative w-12 h-7 rounded-full transition-colors ${
                wantsInvoice ? 'bg-gray-900' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  wantsInvoice ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {wantsInvoice && (
            <div className="border-t border-gray-100 p-4 space-y-3">
              <input
                type="text"
                placeholder="NIT o Cédula"
                value={invoiceNit}
                onChange={(e) => setInvoiceNit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <input
                type="text"
                placeholder="Razón social o nombre"
                value={invoiceName}
                onChange={(e) => setInvoiceName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={invoiceEmail}
                onChange={(e) => setInvoiceEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
          )}
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
