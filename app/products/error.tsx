"use client"
import React from 'react'

export default function error
() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      
      {/* Error Code */}
      <h1 className="text-7xl font-bold text-red-500 mb-4">
        404
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        الصفحة غير موجودة
      </h2>

      {/* Description */}
      <p className="text-gray-500 mb-6">
        يبدو أنك حاولت الوصول إلى صفحة غير موجودة أو تم حذفها.
      </p>

      {/* Button */}
      <a
        href="/"
        className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
      >
        الرجوع للصفحة الرئيسية
      </a>

    </div>
  )
}
