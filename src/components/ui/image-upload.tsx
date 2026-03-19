'use client'

import { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  className?: string
  aspectRatio?: string
  maxSize?: number // in MB
  uploadEndpoint?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  aspectRatio = 'aspect-video',
  maxSize = 5,
  uploadEndpoint = '/api/upload'
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please upload an image file'
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }
    return null
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', 'uploads')

    const response = await fetch(uploadEndpoint, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Upload failed')
    }

    const data = await response.json()
    return data.url
  }

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    setSuccess(false)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)

    try {
      const url = await uploadFile(file)
      onChange(url)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
    }
  }, [maxSize, onChange, uploadEndpoint])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange('')
    onRemove?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('relative', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {value ? (
        <div className={cn('relative rounded-xl overflow-hidden border-2 border-gray-200', aspectRatio)}>
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClick}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change
            </Button>
            {onRemove && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
          </div>

          {/* Success indicator */}
          {success && (
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'relative rounded-xl border-2 border-dashed cursor-pointer transition-all',
            aspectRatio,
            isDragging
              ? 'border-sky-500 bg-sky-50'
              : 'border-gray-300 hover:border-sky-400 hover:bg-gray-50',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-sky-500 animate-spin mb-3" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <div className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors',
                  isDragging ? 'bg-sky-100' : 'bg-gray-100'
                )}>
                  <Upload className={cn(
                    'w-8 h-8 transition-colors',
                    isDragging ? 'text-sky-500' : 'text-gray-400'
                  )} />
                </div>
                <p className="text-base font-medium text-gray-700 mb-1">
                  {isDragging ? 'Drop image here' : 'Drag and drop image here'}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  or click to browse
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, WEBP up to {maxSize}MB
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
