'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Download, Eye, RefreshCw } from 'lucide-react'
import Footer from '@/components/Footer'

interface LocalImage {
  id: number
  name: string
  url: string
  size: number
  uploaded: string
}

interface ApiResponse {
  success: boolean
  count: number
  images: LocalImage[]
  message: string
}

export default function ImageGalleryPage() {
  const [images, setImages] = useState<LocalImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<LocalImage | null>(null)
  const [displayedImages, setDisplayedImages] = useState<LocalImage[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage, setImagesPerPage] = useState(100)
  const [showAll, setShowAll] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState('')
  const [imageLoadError, setImageLoadError] = useState(false)
  const [apiStatus, setApiStatus] = useState<{
    status: 'loading' | 'success' | 'error' | 'empty'
    message: string
    responseTime?: number
    cached?: boolean
  }>({ status: 'loading', message: 'Loading...' })

  const fetchImages = async (refresh = false) => {
    try {
      setLoading(true)
      setApiStatus({ status: 'loading', message: 'Loading local images...' })
      
      console.log('🚀 Fetching local images...')
      const startTime = Date.now()
      
      const response = await fetch(`/api/images${refresh ? '?refresh=true' : ''}`)
      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        const data: ApiResponse = await response.json()
        console.log('✅ API Response:', data)
        
        if (data.success && data.images && data.images.length > 0) {
          setImages(data.images)
          setApiStatus({
            status: 'success',
            message: `Loaded ${data.images.length} images successfully`,
            responseTime,
            cached: data.message?.includes('cached') || false
          })
        } else {
          setApiStatus({
            status: 'empty',
            message: data.message || 'No images found',
            responseTime
          })
        }
      } else {
        console.error('❌ API Error:', response.status, response.statusText)
        setApiStatus({
          status: 'error',
          message: `API Error: ${response.status} ${response.statusText}`,
          responseTime
        })
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error)
      setApiStatus({
        status: 'error',
        message: `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        responseTime: 0
      })
    } finally {
      setLoading(false)
    }
  }

  // Update displayed images when images change
  useEffect(() => {
    if (showAll) {
      setDisplayedImages(images)
    } else {
      const startIndex = (currentPage - 1) * imagesPerPage
      const endIndex = Math.min(startIndex + imagesPerPage, images.length)
      setDisplayedImages(images.slice(startIndex, endIndex))
    }
  }, [images, currentPage, imagesPerPage, showAll])

  // Pagination functions
  const totalPages = Math.ceil(images.length / imagesPerPage)
  
  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const openModal = (image: LocalImage) => {
    console.log('Opening modal for image:', image)
    console.log('Image URL:', image.url)
    setSelectedImage(image)
    setImageLoadError(false)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handleDownload = (image: LocalImage) => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a')
      link.href = image.url
      link.download = image.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setDownloadMessage(`Downloaded: ${image.name}`)
      setTimeout(() => setDownloadMessage(''), 3000)
    } catch (error) {
      console.error('Download error:', error)
      setDownloadMessage('Download failed')
      setTimeout(() => setDownloadMessage(''), 3000)
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage) {
        if (event.key === 'Escape') {
          closeModal()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section - Matching Image Design - Mobile Optimized */}
      <div className="relative bg-black py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 relative z-10">
          {/* Main Gallery Box - Matching the image design - Mobile Optimized */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="bg-gray-900 border-2 border-green-400 rounded-lg p-4 sm:p-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
                  <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg">
                    GEMINI AI GALLERY: {images.length} AI-GENERATED IMAGES
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:mt-3 text-center">
                <span className="text-gray-300 text-xs sm:text-sm">
                  GOOGLE GEMINI AI • AI-GENERATED • HIGH-QUALITY • PROFESSIONAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-gold mx-auto mb-4"></div>
            <p className="text-gray-400 font-mono">LOADING ALL IMAGES...</p>
          </div>
        ) : !displayedImages || displayedImages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">NO IMAGES FOUND</h3>
            <p className="text-gray-400 font-mono mb-4">No AI-generated images available at the moment.</p>
            <button
              onClick={() => fetchImages(true)}
              className="bg-crypto-gold text-black px-4 py-2 rounded-lg font-mono hover:bg-crypto-gold/80 transition-colors"
            >
              REFRESH GALLERY
            </button>
          </div>
        ) : (
          <>
            {/* Gallery Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-6 sm:mb-8">
              <button
                onClick={() => fetchImages(true)}
                className="bg-crypto-gold text-black px-4 py-2 rounded-lg font-mono hover:bg-crypto-gold/80 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                REFRESH
              </button>
              
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg font-mono hover:bg-gray-600 transition-colors"
              >
                {showAll ? 'SHOW PAGINATED' : 'SHOW ALL'}
              </button>
            </div>

            {/* Image Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {displayedImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-crypto-gold/50 transition-colors">
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          openModal(image)
                        }}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDownload(image)
                        }}
                        className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-300 font-mono truncate">{image.name}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {(image.size / 1024 / 1024).toFixed(1)}MB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {!showAll && totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 sm:mt-12">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg font-mono hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  PREV
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-lg font-mono transition-colors ${
                          currentPage === page
                            ? 'bg-crypto-gold text-black'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg font-mono hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  NEXT
                </button>
              </div>
            )}

            {/* Download Message */}
            {downloadMessage && (
              <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-mono text-sm z-50">
                {downloadMessage}
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Modal - Mobile Optimized */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative max-w-4xl max-h-full w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/50 text-white p-1 sm:p-2 rounded-lg hover:bg-black/70 transition-colors z-10 text-sm sm:text-base"
            >
              ✕
            </button>
            
            <div className="relative">
              {!imageLoadError ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => {
                    console.error('Image load error:', selectedImage.url, e)
                    setImageLoadError(true)
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', selectedImage.url)
                    setImageLoadError(false)
                  }}
                />
              ) : (
                <div className="max-w-full max-h-[70vh] sm:max-h-[80vh] bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-red-400 text-4xl mb-4">⚠️</div>
                    <p className="text-white font-mono text-sm mb-2">Image failed to load</p>
                    <p className="text-gray-400 font-mono text-xs mb-4">{selectedImage.name}</p>
                    <button
                      onClick={() => setImageLoadError(false)}
                      className="bg-crypto-gold text-black px-4 py-2 rounded-lg font-mono hover:bg-crypto-gold/80 transition-colors text-sm"
                    >
                      RETRY
                    </button>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2 sm:p-4 rounded-b-lg">
                <h3 className="font-bold text-sm sm:text-base lg:text-lg font-mono mb-1 sm:mb-2 truncate">{selectedImage.name}</h3>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono">
                    Size: {(selectedImage.size / 1024 / 1024).toFixed(1)}MB
                  </span>
                  <button
                    onClick={() => handleDownload(selectedImage)}
                    className="bg-crypto-gold text-black px-2 sm:px-4 py-1 sm:py-2 rounded-lg font-mono hover:bg-crypto-gold/80 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}