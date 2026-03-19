'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircle, Info } from 'lucide-react'

interface HelpTooltipProps {
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  icon?: 'help' | 'info'
}

export function HelpTooltip({ content, side = 'top', icon = 'help' }: HelpTooltipProps) {
  const Icon = icon === 'help' ? HelpCircle : Info

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="text-gray-400 hover:text-sky-500 transition-colors ml-1">
            <Icon className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs text-sm bg-gray-800 text-white">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

// Form field wrapper with integrated help
interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  helpText?: string
  tooltip?: string
  children: React.ReactNode
  className?: string
}

export function FormField({ 
  label, 
  htmlFor, 
  required, 
  helpText, 
  tooltip, 
  children,
  className = ''
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
          {tooltip && <HelpTooltip content={tooltip} />}
        </label>
        {helpText && <span className="text-xs text-gray-400">{helpText}</span>}
      </div>
      {children}
    </div>
  )
}
