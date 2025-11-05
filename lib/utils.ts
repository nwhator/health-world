import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatTime(time: string): string {
  return time
}

export function formatCurrency(amount: number, currency: string = '₹'): string {
  return `${currency}${amount.toLocaleString()}`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    'en-route': 'bg-purple-100 text-purple-800',
    arrived: 'bg-indigo-100 text-indigo-800',
    'in-progress': 'bg-primary-100 text-primary-800',
    completed: 'bg-accent-100 text-accent-800',
    cancelled: 'bg-secondary-100 text-secondary-800',
    active: 'bg-secondary-100 text-secondary-800',
    dispatched: 'bg-orange-100 text-orange-800',
    resolved: 'bg-accent-100 text-accent-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
