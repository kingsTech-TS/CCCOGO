import * as React from "react"

export type ToastType = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toasts: ToastType[]
  addToast: (toast: Omit<ToastType, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastType[]>([])

  const addToast = (toast: Omit<ToastType, "id">) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => removeToast(id), 4000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within ToastProvider")
  return {
    toast: context.addToast,
    toasts: context.toasts,
    removeToast: context.removeToast,
  }
}
