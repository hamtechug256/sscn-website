'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link2,
  Image,
  Quote,
  Heading1,
  Heading2,
  Type,
  Undo,
  Redo
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  label?: string
  helpText?: string
  required?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className,
  label,
  helpText,
  required
}: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)

  const insertFormat = useCallback((before: string, after: string = '') => {
    const textarea = document.activeElement as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }, [value, onChange])

  const toolbarButtons = [
    { icon: Bold, title: 'Bold (Ctrl+B)', action: () => insertFormat('<strong>', '</strong>') },
    { icon: Italic, title: 'Italic (Ctrl+I)', action: () => insertFormat('<em>', '</em>') },
    { icon: Underline, title: 'Underline', action: () => insertFormat('<u>', '</u>') },
    { divider: true },
    { icon: Heading1, title: 'Heading 1', action: () => insertFormat('<h1>', '</h1>\n') },
    { icon: Heading2, title: 'Heading 2', action: () => insertFormat('<h2>', '</h2>\n') },
    { icon: Type, title: 'Paragraph', action: () => insertFormat('<p>', '</p>\n') },
    { divider: true },
    { icon: List, title: 'Bullet List', action: () => insertFormat('<ul>\n<li>', '</li>\n</ul>') },
    { icon: ListOrdered, title: 'Numbered List', action: () => insertFormat('<ol>\n<li>', '</li>\n</ol>') },
    { divider: true },
    { icon: AlignLeft, title: 'Align Left', action: () => insertFormat('<p style="text-align:left">', '</p>\n') },
    { icon: AlignCenter, title: 'Align Center', action: () => insertFormat('<p style="text-align:center">', '</p>\n') },
    { icon: AlignRight, title: 'Align Right', action: () => insertFormat('<p style="text-align:right">', '</p>\n') },
    { divider: true },
    { icon: Link2, title: 'Add Link', action: () => insertFormat('<a href="URL">', '</a>') },
    { icon: Image, title: 'Add Image', action: () => insertFormat('<img src="URL" alt="description" />', '') },
    { icon: Quote, title: 'Quote', action: () => insertFormat('<blockquote>', '</blockquote>\n') },
  ]

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
          {helpText && (
            <span className="text-xs text-gray-400">{helpText}</span>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className={cn(
        'flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border rounded-t-lg',
        isFocused && 'bg-sky-50 border-sky-200'
      )}>
        {toolbarButtons.map((btn, i) => {
          if (btn.divider) {
            return <div key={i} className="w-px h-6 bg-gray-300 mx-1" />
          }
          return (
            <Button
              key={i}
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-white hover:text-sky-600"
              onClick={btn.action}
              title={btn.title}
            >
              <btn.icon className="w-4 h-4" />
            </Button>
          )
        })}
      </div>

      {/* Editor */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          'min-h-[300px] rounded-t-none border-t-0',
          isFocused && 'border-sky-300 ring-1 ring-sky-200'
        )}
        required={required}
      />

      {/* Help footer */}
      <p className="text-xs text-gray-400">
        💡 Tip: Select text and click a formatting button to apply style. 
        You can use basic HTML tags like &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, etc.
      </p>
    </div>
  )
}
