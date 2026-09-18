'use client';

import { useState, useMemo } from 'react';
import {
  School,
  Search,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Wifi,
  Tv,
  Wind,
  Zap,
  CheckCircle2,
  AlertCircle,
  Building2,
} from 'lucide-react';

interface Classroom {
  id: string;
  name: string;
  building: string;
  department: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentClass: string;
  currentInstructor: string;
  endsAt: string;
  nextClass: string;
  nextStartsAt: string;
  facilities: string[];
}

const CLASSROOMS: Classroom[] = [
  {
    id: 'room-a101',
    name: 'Room A-101',
    building: 'Innovation Center',
    department: 'Computer Science & AI',
    capacity: 65,
    status: 'occupied',
    currentClass: 'Full Stack Web Architecture',
    currentInstructor: 'Prof. S. Rao',
    endsAt: '3:30 PM',
    nextClass: 'Database Systems & SQL Optimization',
    nextStartsAt: '3:45 PM',
    facilities: ['4K Projector', 'High-Speed Wi-Fi', 'Air Conditioned', 'Power Outlets at Desks'],
  },
  {
    id: 'room-b205',
    name: 'Room B-205 (Smart Lab)',
    building: 'Block A (Engineering Wing)',
    department: 'Electrical & Electronics',
    capacity: 45,
    status: 'available',
    currentClass: 'None — Free for Study / Projects',
    currentInstructor: 'Open Access',
    endsAt: 'Until 4:00 PM',
    nextClass: 'Power Electronics Lab',
    nextStartsAt: '4:00 PM',
    facilities: ['Oscilloscopes', 'Soldering Stations', 'Gigabit LAN', 'Air Conditioned'],
  },
  {
    id: 'room-c130',
    name: 'Room C-130 (Seminar Hall)',
    building: 'Central Library Complex',
    department: 'Mathematics & Data Science',
    capacity: 120,
    status: 'occupied',
    currentClass: 'Linear Algebra & Matrix Decompositions',
    currentInstructor: 'Dr. V. Raman',
    endsAt: '4:15 PM',
    nextClass: 'Probability & Stochastic Models',
    nextStartsAt: '4:30 PM',
    facilities: ['Surround Audio', 'Dual Laser Projectors', 'Recording Rig', 'Tiered Seating'],
  },
  {
    id: 'room-d210',
    name: 'Room D-210 (Quantum Lab)',
    building: 'Student Research Center',
    department: 'Applied Physics',
    capacity: 40,
    status: 'reserved',
    currentClass: 'Quantum Mechanics & Simulation Group',
    currentInstructor: 'Research Cohort 2026',
    endsAt: '5:00 PM',
    nextClass: 'Open Project Lab',
    nextStartsAt: '5:30 PM',
    facilities: ['GPU Workstations', 'Whiteboards', 'AC', 'Coffee Station Nearby'],
  },
  {
    id: 'room-e102',
    name: 'Room E-102 (Incubation Studio)',
    building: 'Innovation Center',
    department: 'Entrepreneurship Cell',
    capacity: 50,
    status: 'available',
    currentClass: 'Open for Student Founder Teams',
    currentInstructor: 'E-Cell Coordinators',
    endsAt: 'Until 6:00 PM',
    nextClass: 'Pitch Deck Workshop',
    nextStartsAt: '6:00 PM',
    facilities: ['Smart Boards', 'Lounge Seating', 'High-Speed Wi-Fi', 'Microphones'],
  },
  {
    id: 'room-f301',
    name: 'Room F-301',
    building: 'Block B (Computing Wing)',
    department: 'Information Technology',
    capacity: 70,
    status: 'occupied',
    currentClass: 'Cloud Computing & Kubernetes',
    currentInstructor: 'Prof. K. Sharma',
    endsAt: '3:45 PM',
    nextClass: 'DevOps CI/CD Hands-on',
    nextStartsAt: '4:00 PM',
    facilities: ['4K Projector', 'Power Sockets', 'Gigabit Wi-Fi'],
  },
];

export default function ClassroomsPage() {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'occupied' | 'reserved'>('all');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');

  const buildings = ['all', 'Innovation Center', 'Block A (Engineering Wing)', 'Central Library Complex', 'Student Research Center', 'Block B (Computing Wing)'];

  const filtered = useMemo(() => {
    return CLASSROOMS.filter((room) => {
      if (filterStatus !== 'all' && room.status !== filterStatus) return false;
      if (selectedBuilding !== 'all' && room.building !== selectedBuilding) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const matches =
          room.name.toLowerCase().includes(q) ||
          room.building.toLowerCase().includes(q) ||
          room.department.toLowerCase().includes(q) ||
          room.currentClass.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [query, filterStatus, selectedBuilding]);

  return (
    <div className="container-s py-10 md:py-16">
      {/* Header Banner */}
      <div className="mb-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300 mb-3">
          <Sparkles size={13} />
          <span>Realtime Campus Live Radar</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Smart Campus Classroom & Lab Radar.
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300">
          Find available study rooms, see live class schedules in session, and discover free project lab spaces across campus.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] mb-10 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search room numbers, buildings, departments, or current subject in session..."
            className="input-search w-full pl-11 py-3 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/[0.06]">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Rooms', value: 'all' },
              { label: '🟢 Available Now', value: 'available' },
              { label: '🔴 In Session', value: 'occupied' },
              { label: '🟡 Reserved Labs', value: 'reserved' },
            ].map((tab) => {
              const active = filterStatus === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setFilterStatus(tab.value as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${active
                    ? 'bg-indigo-600 text-white shadow-glow-sm border border-indigo-400/30'
                    : 'bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Building Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Building2 size={15} className="text-indigo-400 shrink-0" />
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="input-search py-1.5 px-3 text-xs bg-[#12151f] text-white cursor-pointer"
            >
              {buildings.map((b) => (
                <option key={b} value={b} className="bg-[#12151f] text-white">
                  {b === 'all' ? 'All Buildings & Wings' : b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Classrooms Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((room) => {
          const isAvailable = room.status === 'available';
          const isOccupied = room.status === 'occupied';

          return (
            <div
              key={room.id}
              className={`glass-panel p-6 rounded-2xl border transition-all duration-200 ${isAvailable
                ? 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/[0.02]'
                : isOccupied
                  ? 'border-white/[0.08] hover:border-white/[0.16]'
                  : 'border-amber-500/30 hover:border-amber-500/60 bg-amber-500/[0.02]'
                }`}
            >
              {/* Top status bar */}
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-indigo-300 font-bold text-xs">
                    <School size={15} />
                  </span>
                  <h3 className="text-lg font-bold text-white">{room.name}</h3>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isAvailable
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : isOccupied
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${isAvailable ? 'bg-emerald-400 animate-pulse' : isOccupied ? 'bg-rose-400' : 'bg-amber-400'
                      }`}
                  />
                  {isAvailable ? 'Available Now' : isOccupied ? 'Class in Session' : 'Cohort Reserved'}
                </span>
              </div>

              {/* Building & Dept */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-slate-500" />
                  {room.building}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} className="text-slate-500" />
                  Capacity: {room.capacity} seats
                </span>
              </div>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">{room.department}</p>

              {/* Schedule Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Status ({room.endsAt})
                  </span>
                  <p className="font-semibold text-white mt-0.5 flex items-center justify-between">
                    <span>{room.currentClass}</span>
                    <span className="text-slate-400 text-[11px] font-normal">{room.currentInstructor}</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.04]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Next Scheduled ({room.nextStartsAt})
                  </span>
                  <p className="font-medium text-slate-300 mt-0.5">{room.nextClass}</p>
                </div>
              </div>

              {/* Facilities tags */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                {room.facilities.map((fac) => (
                  <span
                    key={fac}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-medium text-slate-300"
                  >
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="glass-panel p-16 text-center rounded-2xl border border-white/[0.08] mt-6">
          <p className="text-base font-bold text-white">No rooms match your filter criteria.</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Try clearing your search keyword or selecting all buildings.</p>
          <button
            onClick={() => {
              setQuery('');
              setFilterStatus('all');
              setSelectedBuilding('all');
            }}
            className="btn-subtle text-xs py-2 px-4"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}