'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  ChevronLeft,
  Check,
  CreditCard,
  Banknote,
  Users,
  Receipt,
  Sparkles,
  ChevronRight
} from 'lucide-react'

// Types
type CheckoutStep = 'review' | 'tip' | 'split' | 'payment' | 'confirmation'
type TipPreset = 10 | 12 | 15 | 'custom'
type SplitMethod = 'equal' | 'by-items' | 'custom-amount'
type PaymentMethod = 'apple-pay' | 'google-pay' | 'card' | 'cash'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

interface SplitConfig {
  enabled: boolean
  method: SplitMethod
  numberOfPeople: number
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
const HIPOCONSUMO_RATE = 0.10 // 10% Hipoconsumo

const STEPS: CheckoutStep[] = ['review', 'tip', 'split', 'payment', 'confirmation']

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review')
  const [tipPreset, setTipPreset] = useState<TipPreset>(15)
  const [customTip, setCustomTip] = useState<number>(18)
  const [splitConfig, setSplitConfig] = useState<SplitConfig>({
    enabled: false,
    method: 'equal',
    numberOfPeople: 2,
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Calculations
  const subtotal = useMemo(() =>
    mockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    []
  )

  const hipoconsumo = useMemo(() => subtotal * HIPOCONSUMO_RATE, [subtotal])

  const tipPercentage = useMemo(() =>
    tipPreset === 'custom' ? customTip : tipPreset,
    [tipPreset, customTip]
  )

  const tipAmount = useMemo(() =>
    subtotal * (tipPercentage / 100),
    [subtotal, tipPercentage]
  )

  const total = useMemo(() =>
    subtotal + hipoconsumo + tipAmount,
    [subtotal, hipoconsumo, tipAmount]
  )

  const yourShare = useMemo(() =>
    splitConfig.enabled ? total / splitConfig.numberOfPeople : total,
    [splitConfig, total]
  )

  const currentStepIndex = STEPS.indexOf(currentStep)

  const goNext = useCallback(() => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex])
    }
  }, [currentStepIndex])

  const goBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex])
    }
  }, [currentStepIndex])

  const handlePayment = useCallback(async () => {
    if (!paymentMethod) return

    setIsProcessing(true)
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setCurrentStep('confirmation')
  }, [paymentMethod])

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {currentStep !== 'review' && currentStep !== 'confirmation' ? (
              <button
                onClick={goBack}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Volver"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
            ) : (
              <div className="w-9" />
            )}

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

            <div className="w-9" />
          </div>
        </div>

        {/* Progreso de pasos */}
        {currentStep !== 'confirmation' && (
          <div className="max-w-lg mx-auto px-6 pb-3">
            <div className="flex items-center gap-1">
              {STEPS.slice(0, -1).map((step, index) => (
                <div
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentStepIndex
                      ? 'bg-gray-900'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Contenido Principal */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Paso: Revisar */}
        {currentStep === 'review' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Revisa tu Pedido
              </h1>
              <p className="text-gray-500 mt-1">
                Estás pagando la Mesa {TABLE_NUMBER}
              </p>
            </div>

            {/* Lista de Items */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="max-h-[320px] overflow-y-auto">
                {mockItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-start justify-between p-4 ${
                      index !== mockItems.length - 1
                        ? 'border-b border-gray-100'
                        : ''
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 w-5">
                          {item.quantity}×
                        </span>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-500 ml-7 mt-0.5">
                          {item.notes}
                        </p>
                      )}
                    </div>
                    <span className="font-medium tabular-nums text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totales */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Hipoconsumo ({(HIPOCONSUMO_RATE * 100).toFixed(0)}%)</span>
                <span className="tabular-nums">{formatCurrency(hipoconsumo)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg text-gray-900">
                <span>Total</span>
                <span className="tabular-nums">{formatCurrency(subtotal + hipoconsumo)}</span>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={goNext}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-900/10"
            >
              Continuar a Propina
            </button>
          </div>
        )}

        {/* Paso: Propina */}
        {currentStep === 'tip' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Agregar Propina
              </h1>
              <p className="text-gray-500 mt-1">
                Muestra tu agradecimiento por el servicio
              </p>
            </div>

            {/* Monto de Propina */}
            <div className="text-center py-8">
              <div className="text-5xl font-bold tracking-tight text-gray-900">
                {formatCurrency(tipAmount)}
              </div>
              <p className="text-gray-500 mt-2">
                {tipPercentage}% de {formatCurrency(subtotal)}
              </p>
            </div>

            {/* Presets de Propina */}
            <div className="grid grid-cols-4 gap-3">
              {([10, 12, 15, 'custom'] as TipPreset[]).map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTipPreset(preset)}
                  className={`py-4 rounded-xl font-semibold transition-all ${
                    tipPreset === preset
                      ? 'bg-gray-900 text-white scale-[1.02] shadow-lg shadow-gray-900/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset === 'custom' ? 'Otro' : `${preset}%`}
                </button>
              ))}
            </div>

            {/* Slider de Propina Personalizada */}
            {tipPreset === 'custom' && (
              <div className="animate-slide-up space-y-4 pt-4">
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={customTip}
                  onChange={(e) => setCustomTip(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0%</span>
                  <span className="font-semibold text-gray-900">
                    {customTip}%
                  </span>
                  <span>30%</span>
                </div>
              </div>
            )}

            {/* Total Actualizado */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Total del Pedido</span>
                <span className="tabular-nums">{formatCurrency(subtotal + hipoconsumo)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-3">
                <span>Propina</span>
                <span className="tabular-nums text-green-600">
                  +{formatCurrency(tipAmount)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg text-gray-900">
                <span>Nuevo Total</span>
                <span className="tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Botón Continuar */}
            <button
              onClick={goNext}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-900/10"
            >
              Continuar
            </button>
          </div>
        )}

        {/* Paso: Dividir Cuenta */}
        {currentStep === 'split' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                ¿Dividir la Cuenta?
              </h1>
              <p className="text-gray-500 mt-1">
                Divide el pago con tu grupo
              </p>
            </div>

            {/* Toggle Dividir */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dividir Cuenta</p>
                    <p className="text-sm text-gray-500">Partes iguales o personalizado</p>
                  </div>
                </div>
                <button
                  onClick={() => setSplitConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`w-12 h-7 rounded-full transition-all ${
                    splitConfig.enabled
                      ? 'bg-gray-900'
                      : 'bg-gray-200'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    splitConfig.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {/* Opciones de División */}
            {splitConfig.enabled && (
              <div className="animate-slide-up space-y-4">
                {/* Método de División */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'equal', label: 'Partes Iguales', icon: Users },
                    { value: 'by-items', label: 'Por Platillos', icon: Receipt },
                    { value: 'custom-amount', label: 'Personalizado', icon: CreditCard },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setSplitConfig(prev => ({ ...prev, method: value as SplitMethod }))}
                      className={`p-4 rounded-xl transition-all text-center ${
                        splitConfig.method === value
                          ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Número de Personas */}
                {splitConfig.method === 'equal' && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <p className="text-sm text-gray-500 mb-3">Número de personas</p>
                    <div className="flex items-center justify-center gap-6">
                      <button
                        onClick={() => setSplitConfig(prev => ({
                          ...prev,
                          numberOfPeople: Math.max(2, prev.numberOfPeople - 1)
                        }))}
                        className="w-12 h-12 rounded-full bg-gray-200 font-bold text-xl text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-4xl font-bold w-16 text-center text-gray-900">
                        {splitConfig.numberOfPeople}
                      </span>
                      <button
                        onClick={() => setSplitConfig(prev => ({
                          ...prev,
                          numberOfPeople: Math.min(12, prev.numberOfPeople + 1)
                        }))}
                        className="w-12 h-12 rounded-full bg-gray-200 font-bold text-xl text-gray-700 hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Tu Parte */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white text-center shadow-xl shadow-gray-900/20">
                  <p className="text-sm opacity-80 mb-1">Tu parte</p>
                  <p className="text-4xl font-bold">{formatCurrency(yourShare)}</p>
                  <p className="text-sm opacity-80 mt-2">
                    de {formatCurrency(total)} en total
                  </p>
                </div>
              </div>
            )}

            {/* Total sin División */}
            {!splitConfig.enabled && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total a Pagar</span>
                  <span className="tabular-nums">{formatCurrency(total)}</span>
                </div>
              </div>
            )}

            {/* Botón Continuar */}
            <button
              onClick={goNext}
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg shadow-gray-900/10"
            >
              Continuar a Pago
            </button>
          </div>
        )}

        {/* Paso: Método de Pago */}
        {currentStep === 'payment' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Método de Pago
              </h1>
              <p className="text-gray-500 mt-1">
                Elige cómo deseas pagar
              </p>
            </div>

            {/* Monto a Pagar */}
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 mb-1">
                {splitConfig.enabled ? 'Tu parte' : 'Total'}
              </p>
              <p className="text-5xl font-bold tracking-tight text-gray-900">
                {formatCurrency(yourShare)}
              </p>
            </div>

            {/* Métodos de Pago */}
            <div className="space-y-3">
              {/* Apple Pay */}
              <button
                onClick={() => setPaymentMethod('apple-pay')}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'apple-pay'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                    <path d="M17.0425 12.3095C17.0425 11.0555 17.6785 9.9785 18.7265 9.3495C18.0685 8.4215 17.0645 7.9015 15.7415 7.8195C14.4185 7.7375 13.0155 8.6145 12.5365 8.6145C12.0575 8.6145 10.8335 7.8605 9.7955 7.8605C7.6225 7.9015 5.3065 9.3905 5.3065 12.5145C5.3065 13.4835 5.4945 14.4835 5.8695 15.5145C6.3755 16.9215 8.2015 20.1865 10.1095 20.1045C11.0655 20.0635 11.7385 19.4155 12.9955 19.4155C14.2525 19.4155 14.8705 20.1045 15.9335 20.1045C17.8605 20.0635 19.5025 17.1215 19.9815 15.7145C17.3685 14.4435 17.0425 12.3915 17.0425 12.3095ZM14.7545 6.4515C15.6085 5.4155 15.4995 4.4635 15.4645 4.0865C14.7075 4.1275 13.8395 4.6185 13.3375 5.2145C12.7915 5.8515 12.4575 6.6455 12.5315 7.5185C13.3495 7.5855 14.1045 7.1285 14.7545 6.4515Z"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Apple Pay</p>
                  <p className="text-sm text-gray-500">Rápido y seguro</p>
                </div>
                {paymentMethod === 'apple-pay' && (
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>

              {/* Google Pay */}
              <button
                onClick={() => setPaymentMethod('google-pay')}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'google-pay'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Google Pay</p>
                  <p className="text-sm text-gray-500">Paga con Google</p>
                </div>
                {paymentMethod === 'google-pay' && (
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>

              {/* Tarjeta */}
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'card'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Tarjeta</p>
                  <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                </div>
                {paymentMethod === 'card' && (
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>

              {/* Efectivo */}
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                  paymentMethod === 'cash'
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Banknote className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">Efectivo</p>
                  <p className="text-sm text-gray-500">Paga en caja</p>
                </div>
                {paymentMethod === 'cash' && (
                  <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center animate-scale-in">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            </div>

            {/* Botón Pagar */}
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
                  Pagar {formatCurrency(yourShare)}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Paso: Confirmación */}
        {currentStep === 'confirmation' && (
          <div className="animate-fade-in text-center py-12 space-y-8">
            {/* Icono de Éxito */}
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-check-bounce shadow-xl shadow-green-500/30">
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
            </div>

            {/* Mensaje de Éxito */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                ¡Pago Completado!
              </h1>
              <p className="text-gray-500">
                Gracias por visitarnos
              </p>
            </div>

            {/* Resumen del Recibo */}
            <div className="bg-white rounded-2xl p-6 text-left space-y-4 max-w-sm mx-auto border border-gray-200 shadow-sm">
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
                <div className="flex justify-between">
                  <span className="text-gray-500">Propina ({tipPercentage}%)</span>
                  <span className="text-green-600">{formatCurrency(tipAmount)}</span>
                </div>
                {splitConfig.enabled && (
                  <div className="flex justify-between text-gray-500">
                    <span>División ({splitConfig.numberOfPeople} personas)</span>
                    <span>÷{splitConfig.numberOfPeople}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Pagaste</span>
                <span className="text-green-600">{formatCurrency(yourShare)}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-3 max-w-sm mx-auto">
              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10">
                Enviar Recibo por Email
              </button>
              <button
                onClick={() => {
                  setCurrentStep('review')
                  setTipPreset(15)
                  setSplitConfig({ enabled: false, method: 'equal', numberOfPeople: 2 })
                  setPaymentMethod(null)
                }}
                className="w-full py-4 text-gray-600 font-medium hover:text-gray-900 transition-colors"
              >
                Nuevo Pedido
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Padding inferior para área segura */}
      <div className="h-8" />
    </div>
  )
}
