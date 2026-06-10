export default function ImportModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#111827]">Importuj dane</h2>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#374151] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Upload area */}
        <div className="mb-5">
          <p className="text-sm font-medium text-[#374151] mb-2">Wgraj plik CSV/PDF</p>
          <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2563EB] hover:bg-[#F8FAFF] transition-all">
            <svg className="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-medium text-[#374151]">Przeciągnij i upuść pliki tutaj</p>
            <p className="text-xs text-[#9CA3AF]">Obsługiwane formaty: .csv, .pdf, .xls (max. 10MB)</p>
          </div>
        </div>

        {/* Bank import */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#374151] mb-3">Importuj z banku</p>
          <div className="grid grid-cols-2 gap-2">
            {['PKO BP', 'mBank', 'ING Bank', 'Więcej...'].map((bank) => (
              <button
                key={bank}
                className="flex items-center gap-2 border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-[#EFF6FF] rounded-lg px-4 py-2.5 text-sm font-medium text-[#374151] transition-colors"
              >
                <svg className="w-4 h-4 text-[#2563EB] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                {bank}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#374151] font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            Anuluj
          </button>
          <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            Importuj
          </button>
        </div>
      </div>
    </div>
  );
}
