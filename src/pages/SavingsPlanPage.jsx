import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getSavingsGoal, saveSavingsGoal } from '../firebase/db';

const chartData = [
  { month: 'Sty', value: 35 },
  { month: 'Lut', value: 45 },
  { month: 'Mar', value: 55 },
  { month: 'Kwi', value: 63 },
  { month: 'Maj', value: 73 },
  { month: 'Cze', value: 95, active: true },
];

export default function SavingsPlanPage() {
  const { currentUser } = useAuth();
  const maxVal = Math.max(...chartData.map((d) => d.value));

  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    targetAmount: '',
    savedAmount: '',
    monthlyContribution: '',
    deadline: '',
  });

  useEffect(() => {
    if (!currentUser) return;
    getSavingsGoal(currentUser.uid)
      .then((data) => {
        setGoal(data);
        setForm({
          title: data.title || '',
          targetAmount: data.targetAmount || '',
          savedAmount: data.savedAmount || '',
          monthlyContribution: data.monthlyContribution || '',
          deadline: data.deadline || '',
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentUser]);

  async function handleSave(e) {
    e.preventDefault();
    setSaveError('');
    setSaving(true);
    try {
      const updated = {
        title: form.title,
        targetAmount: parseFloat(form.targetAmount) || 0,
        savedAmount: parseFloat(form.savedAmount) || 0,
        monthlyContribution: parseFloat(form.monthlyContribution) || 0,
        deadline: form.deadline,
      };
      await saveSavingsGoal(currentUser.uid, updated);
      setGoal(updated);
      setEditing(false);
      setSaveSuccess('Plan zapisany!');
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch {
      setSaveError('Nie udało się zapisać planu.');
    } finally {
      setSaving(false);
    }
  }

  const pct = goal ? Math.min(100, Math.round(((goal.savedAmount || 0) / (goal.targetAmount || 1)) * 100)) : 0;
  const fmt = (n) => Number(n).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const inputCls = "w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-5">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Twój plan oszczędnościowy</h1>
              <p className="text-[#6B7280] text-sm mt-0.5">Spersonalizowana strategia osiągnięcia wolności finansowej.</p>
            </div>
            <button
              onClick={() => setEditing((e) => !e)}
              className="self-start sm:self-auto bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#374151] font-medium px-4 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {editing ? 'Anuluj' : 'Edytuj plan'}
            </button>
          </div>

          {saveSuccess && <div className="bg-[#F0FDF4] border border-green-200 text-[#16A34A] rounded-lg px-4 py-3 text-sm">{saveSuccess}</div>}
          {saveError && <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-4 py-3 text-sm">{saveError}</div>}

          {/* Edit form */}
          {editing && (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-[#111827] mb-4">Ustaw cel oszczędnościowy</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Nazwa celu</label>
                  <input type="text" className={inputCls} placeholder="Np. Oszczędności na wakacje" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Cel (PLN)</label>
                    <input type="number" min="0" step="0.01" className={inputCls} placeholder="12000" value={form.targetAmount} onChange={(e) => setForm({ ...form, targetAmount: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Już zaoszczędzono (PLN)</label>
                    <input type="number" min="0" step="0.01" className={inputCls} placeholder="0" value={form.savedAmount} onChange={(e) => setForm({ ...form, savedAmount: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Miesięczna wpłata (PLN)</label>
                    <input type="number" min="0" step="0.01" className={inputCls} placeholder="500" value={form.monthlyContribution} onChange={(e) => setForm({ ...form, monthlyContribution: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Termin</label>
                    <input type="date" className={inputCls} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" disabled={saving} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                    {saving ? 'Zapisywanie…' : 'Zapisz plan'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <p className="text-sm text-[#6B7280] text-center py-12">Ładowanie…</p>
          ) : (
            <>
              {/* Goal card */}
              <div className="grid lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-xl flex-shrink-0">✈️</div>
                      <h2 className="text-xl font-bold text-[#111827]">{goal?.title || 'Mój cel'}</h2>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-3xl font-bold text-[#2563EB] leading-none">{pct}%</p>
                      <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mt-0.5">UKOŃCZONO</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4 ml-12">
                    Cel: {fmt(goal?.targetAmount || 0)} PLN
                    {goal?.deadline ? ` • Termin: ${goal.deadline}` : ''}
                  </p>
                  <div className="bg-[#E5E7EB] rounded-full h-2 mb-6">
                    <div className="bg-[#2563EB] h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: 'Zaoszczędzono', value: `${fmt(goal?.savedAmount || 0)} PLN` },
                      { label: 'Pozostało', value: `${fmt(Math.max(0, (goal?.targetAmount || 0) - (goal?.savedAmount || 0)))} PLN` },
                      { label: 'Miesięczna wpłata', value: `${fmt(goal?.monthlyContribution || 0)} PLN`, blue: true },
                    ].map((s) => (
                      <div key={s.label} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                        <p className="text-xs text-[#6B7280] mb-1">{s.label}</p>
                        <p className={`text-lg font-bold ${s.blue ? 'text-[#2563EB]' : 'text-[#111827]'}`}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="font-bold text-[#111827]">Wskazówka</h3>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-4">
                    Regularne miesięczne wpłaty to najskuteczniejszy sposób na osiągnięcie celu finansowego. Nawet małe kwoty robią różnicę.
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                  >
                    Zaktualizuj plan
                  </button>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-bold text-[#111827] text-lg">Prognoza oszczędności</h2>
                    <p className="text-[#6B7280] text-sm mt-0.5">Przewidywany wzrost kapitału w ciągu najbliższych 6 miesięcy</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-[#2563EB] inline-block" />Twój plan
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
                    {[0,1,2,3,4].map((i) => <div key={i} className="border-t border-[#F3F4F6] w-full" />)}
                  </div>
                  <div className="relative flex items-end gap-4 h-44 pb-6">
                    {chartData.map((d) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-xl transition-all"
                          style={{ height: `${(d.value / maxVal) * 148}px`, backgroundColor: d.active ? '#2563EB' : '#C7D7F9' }}
                        />
                        <span className={`text-xs font-medium ${d.active ? 'text-[#2563EB] font-bold' : 'text-[#9CA3AF]'}`}>{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="relative bg-[#2563EB] rounded-2xl p-8 overflow-hidden min-h-[160px] flex items-center">
                <div className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-48 h-44 rounded-full bg-[#1D4ED8] items-end justify-center overflow-hidden opacity-80">
                  <div className="w-32 h-32 flex items-end justify-center pb-2">
                    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-70">
                      <ellipse cx="40" cy="72" rx="20" ry="5" fill="#1E40AF" opacity="0.5"/>
                      <path d="M40 70 L40 35" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M40 50 Q28 42 24 30 Q36 30 40 42" fill="#60A5FA" opacity="0.8"/>
                      <path d="M40 44 Q52 36 56 24 Q44 24 40 36" fill="#93C5FD" opacity="0.7"/>
                      <path d="M40 58 Q32 52 30 44 Q38 44 40 52" fill="#60A5FA" opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                <div className="relative z-10 pr-0 sm:pr-56">
                  <h2 className="text-2xl font-bold text-white mb-2">Zmotywowany do startu?</h2>
                  <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                    Twój plan jest gotowy. Pierwsza wpłata dzisiaj przyspieszy Twój cel.
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="bg-white hover:bg-gray-50 text-[#2563EB] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    Zaktualizuj wpłatę
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
