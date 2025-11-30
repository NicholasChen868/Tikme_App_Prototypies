import {
  Clock, Target, BarChart3, HelpCircle, Palette, CreditCard,
  CheckCircle, Star, Users, DoorOpen, Monitor, ClipboardList,
  TrendingUp, CheckSquare, AlertCircle, XCircle, Bell,
  Calendar, BookOpen, Zap, Heart, ChevronDown, ChevronUp,
  X, Settings, LogOut, Menu, Home, FileText, Award
} from 'lucide-react'

// Icon mapping for unified icon system
const iconMap = {
  // Teaching Tools
  'timer': Clock,
  'clock': Clock,
  'picker': Target,
  'target': Target,
  'poll': BarChart3,
  'polling': BarChart3,
  'quiz': HelpCircle,
  'question': HelpCircle,
  'whiteboard': Palette,
  'flashcard': CreditCard,
  'card': CreditCard,
  'attendance': CheckSquare,
  'behavior': Star,
  'star': Star,
  'groups': Users,
  'users': Users,
  'breakout': DoorOpen,
  'screen': Monitor,
  'progress1': ClipboardList,
  'progress2': TrendingUp,
  'trending': TrendingUp,

  // Status Icons
  'ready': CheckCircle,
  'check': CheckCircle,
  'checkCircle': CheckCircle,
  'incomplete': AlertCircle,
  'alert': AlertCircle,
  'not-ready': XCircle,
  'close': X,
  'x': X,
  'alarm': Bell,
  'bell': Bell,

  // Common Icons
  'calendar': Calendar,
  'book': BookOpen,
  'boost': Zap,
  'zap': Zap,
  'favorite': Heart,
  'heart': Heart,
  'down': ChevronDown,
  'up': ChevronUp,
  'chevronDown': ChevronDown,
  'chevronUp': ChevronUp,
  'settings': Settings,
  'logout': LogOut,
  'menu': Menu,
  'home': Home,
  'file': FileText,
  'award': Award
}

/**
 * Unified Icon Component using Lucide React
 * Replaces emoji icons with consistent, scalable SVG icons
 *
 * @param {string} name - Icon name from iconMap
 * @param {number} size - Icon size in pixels (default: 24)
 * @param {string} color - Icon color (CSS color value)
 * @param {string} className - Additional CSS classes
 * @param {number} strokeWidth - Icon stroke width (default: 2)
 */
function LucideIcon({
  name,
  size = 24,
  color,
  className = '',
  strokeWidth = 2,
  ...props
}) {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    console.warn(`LucideIcon: Icon "${name}" not found in iconMap`)
    return null
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={`lucide-icon ${className}`}
      {...props}
    />
  )
}

export default LucideIcon
export { iconMap }
