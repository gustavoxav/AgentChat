"use client"

import { useState, useEffect } from "react"

export function useKeyboardOpen() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const initialViewportHeight = window.visualViewport?.height || window.innerHeight

    const handleViewportChange = () => {
      if (window.visualViewport) {
        const currentHeight = window.visualViewport.height
        const heightDifference = initialViewportHeight - currentHeight
        setIsKeyboardOpen(heightDifference > 150)
      }
    }

    const handleResize = () => {
      const currentHeight = window.innerHeight
      const heightDifference = initialViewportHeight - currentHeight
      setIsKeyboardOpen(heightDifference > 150)
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportChange)
    } else {
      window.addEventListener("resize", handleResize)
    }

    const handleFocusIn = (e: FocusEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        setTimeout(() => {
          if (window.visualViewport) {
            const currentHeight = window.visualViewport.height
            const heightDifference = initialViewportHeight - currentHeight
            setIsKeyboardOpen(heightDifference > 150)
          }
        }, 300)
      }
    }

    const handleFocusOut = () => {
      setTimeout(() => {
        if (window.visualViewport) {
          const currentHeight = window.visualViewport.height
          const heightDifference = initialViewportHeight - currentHeight
          setIsKeyboardOpen(heightDifference > 150)
        } else {
          setIsKeyboardOpen(false)
        }
      }, 300)
    }

    document.addEventListener("focusin", handleFocusIn)
    document.addEventListener("focusout", handleFocusOut)

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleViewportChange)
      } else {
        window.removeEventListener("resize", handleResize)
      }
      document.removeEventListener("focusin", handleFocusIn)
      document.removeEventListener("focusout", handleFocusOut)
    }
  }, [])

  return isKeyboardOpen
}
