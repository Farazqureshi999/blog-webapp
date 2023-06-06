'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()


interface QueryProps {
    children: React.ReactNode
}

const QueryWrapper = ({children}:QueryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster/>
        {children}
    </QueryClientProvider>
  )
}

export default QueryWrapper