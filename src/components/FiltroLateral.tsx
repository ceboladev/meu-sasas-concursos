'use client'
import { useState } from 'react'

export default function FiltroLateral({ aoFiltrar }: { aoFiltrar: (banca: string) => void }) {
  const [banca, setBanca] = useState('');

  return (
    <aside className="p-4 bg-gray-900 text-white w-64 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">Banca</label>
        <select 
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          value={banca}
          onChange={(e) => setBanca(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="FGV">FGV</option>
          <option value="FCC">FCC</option>
          <option value="Cebraspe">Cebraspe</option>
        </select>
      </div>

      <button 
        onClick={() => aoFiltrar(banca)}
        className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded font-medium transition"
      >
        Aplicar Filtros
      </button>
    </aside>
  )
}