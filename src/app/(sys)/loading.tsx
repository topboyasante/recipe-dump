"use client"
import Loader from '@/components/ui/loader'
import React from 'react'

function Loading() {
  return (
    <div className='h-[90vh] flex justify-center items-center'>
        <Loader color='#121212' width='50' height='50'/>
    </div>
  )
}

export default Loading