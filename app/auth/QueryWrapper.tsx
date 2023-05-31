'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

const queryClient = new QueryClient()


interface QueryProps {
    children: React.ReactNode
}

const QueryWrapper = ({children}:QueryProps) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryWrapper