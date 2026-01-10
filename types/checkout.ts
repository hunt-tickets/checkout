export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
}

export interface TableInfo {
  number: number
  restaurant: string
  server?: string
}

export type CheckoutStep = 'review' | 'tip' | 'split' | 'payment' | 'confirmation'

export type TipPreset = 10 | 12 | 15 | 'custom'

export type SplitMethod = 'equal' | 'by-items' | 'custom-amount'

export type PaymentMethod = 'apple-pay' | 'google-pay' | 'card' | 'cash'

export interface SplitConfig {
  enabled: boolean
  method: SplitMethod
  numberOfPeople: number
  amounts?: number[]
}

export interface CheckoutState {
  step: CheckoutStep
  items: OrderItem[]
  table: TableInfo
  subtotal: number
  tax: number
  tipPercentage: number
  tipAmount: number
  splitConfig: SplitConfig
  paymentMethod: PaymentMethod | null
  isProcessing: boolean
  isPaid: boolean
}
