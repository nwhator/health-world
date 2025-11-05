'use client'

import { useState } from 'react'
import { Bell, Clock, CheckCircle, AlertCircle, Calendar, Pill, Activity, Trash2, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface Notification {
  id: string
  type: 'appointment' | 'emergency' | 'medication' | 'health-tip' | 'system'
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: 'low' | 'medium' | 'high'
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'Your dental checkup is scheduled for tomorrow at 10:00 AM with Dr. Sarah Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'medication',
    title: 'Medication Reminder',
    message: 'Time to take your blood pressure medication',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    priority: 'high'
  },
  {
    id: '3',
    type: 'emergency',
    title: 'Emergency Response Update',
    message: 'Your emergency request has been received. Help is on the way.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
    priority: 'high'
  },
  {
    id: '4',
    type: 'health-tip',
    title: 'Daily Health Tip',
    message: 'Drink at least 8 glasses of water today to stay hydrated!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    read: true,
    priority: 'low'
  },
  {
    id: '5',
    type: 'system',
    title: 'Profile Updated',
    message: 'Your medical records have been successfully updated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    priority: 'medium'
  }
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-6 w-6 text-primary-500" />
      case 'medication':
        return <Pill className="h-6 w-6 text-accent-500" />
      case 'emergency':
        return <AlertCircle className="h-6 w-6 text-secondary-500" />
      case 'health-tip':
        return <Activity className="h-6 w-6 text-accent-500" />
      case 'system':
        return <Bell className="h-6 w-6 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-secondary-500'
      case 'medium':
        return 'border-l-4 border-primary-500'
      case 'low':
        return 'border-l-4 border-gray-300'
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read)

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Bell className="h-8 w-8 text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600 mt-1">
                  {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filter === 'all'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                filter === 'unread'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications." 
                  : "You don't have any notifications yet."}
              </p>
            </Card>
          ) : (
            filteredNotifications.map(notification => (
              <Card
                key={notification.id}
                className={`transition-all hover:shadow-lg ${
                  !notification.read ? 'bg-primary-50' : 'bg-white'
                } ${getPriorityColor(notification.priority)}`}
              >
                <div className="flex items-start gap-4 p-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <span className="flex-shrink-0 h-2 w-2 bg-primary-500 rounded-full mt-2" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="h-4 w-4" />
                        {formatTimestamp(notification.timestamp)}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-auto">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-secondary-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
