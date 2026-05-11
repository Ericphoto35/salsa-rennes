import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import {
  fetchAllProfiles,
  updateUserProfile,
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../lib/firebase';

const EMPTY_EVENT = { title: '', tag: '', description: '', date: '', location: '', featured: false, order: 0 };

export default function Admin() {
  const [activeTab, setActiveTab] = useState('users');

  // ─── Users ────────────────────────────────────────────────────────────────
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});

  // ─── Events ───────────────────────────────────────────────────────────────
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventForm, setEventForm] = useState(EMPTY_EVENT);
  const [editingId, setEditingId] = useState(null);
  const [eventSaving, setEventSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !userProfile) return;
    if (!userProfile.is_admin) { router.push('/'); return; }
    loadUsers();
    loadEvents();
  }, [user, userProfile]);

  const loadUsers = async () => {
    try {
      const data = await fetchAllProfiles();
      setUsers(data);
    } catch (err) {
      console.error('loadUsers:', err);
      alert('Erreur chargement utilisateurs : ' + err.message);
    } finally {
      setUsersLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.error('loadEvents:', err);
      // Si permission refusée, on affiche juste la liste vide
      if (err.code === 'permission-denied') {
        alert('Accès refusé à la collection "events" — ajoutez la règle dans la Firebase Console (voir console pour détails).');
      } else {
        alert('Erreur chargement événements : ' + err.message);
      }
    } finally {
      setEventsLoading(false);
    }
  };

  const updateUserStatus = async (userId, isApproved) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: true }));
      await updateUserProfile(userId, { is_approved: isApproved });
      await loadUsers();
    } catch {
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const updateAdminStatus = async (userId, isAdmin) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId + '_admin']: true }));
      await updateUserProfile(userId, { is_admin: isAdmin });
      await loadUsers();
    } catch {
      alert('Erreur lors de la mise à jour du statut administrateur');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId + '_admin']: false }));
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventSaving(true);
    try {
      if (editingId) {
        await updateEvent(editingId, eventForm);
      } else {
        await createEvent(eventForm);
      }
      setEventForm(EMPTY_EVENT);
      setEditingId(null);
      setShowForm(false);
      await loadEvents();
    } catch {
      alert('Erreur lors de la sauvegarde');
    } finally {
      setEventSaving(false);
    }
  };

  const handleEdit = (ev) => {
    setEventForm({
      title: ev.title || '',
      tag: ev.tag || '',
      description: ev.description || '',
      date: ev.date || '',
      location: ev.location || '',
      featured: ev.featured || false,
      order: ev.order ?? 0,
    });
    setEditingId(ev.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet événement ?')) return;
    setDeletingId(id);
    try {
      await deleteEvent(id);
      await loadEvents();
    } catch {
      alert('Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  };

  const cancelForm = () => {
    setEventForm(EMPTY_EVENT);
    setEditingId(null);
    setShowForm(false);
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <Navbar />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="text-center text-[#f6bc7c]">Chargement...</div>
        </main>
      </div>
    );
  }

  if (!userProfile.is_admin) {
    return (
      <div className="min-h-screen bg-[#1a1a1a]">
        <Navbar />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="text-center text-red-500">Accès refusé.</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Seo title="Admin - Salsa Rennes" noIndex={true} />
      <Navbar />

      <main className="container mx-auto px-4 py-12 pt-24 max-w-6xl">
        <h1 className="text-3xl font-bold text-[#f6bc7c] mb-8">Administration</h1>

        {/* Onglets */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {[
            { key: 'users', label: 'Utilisateurs' },
            { key: 'events', label: 'Événements' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === key
                  ? 'bg-[#f6bc7c] text-[#1a1a1a]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ─── Onglet Utilisateurs ─── */}
        {activeTab === 'users' && (
          usersLoading ? (
            <div className="text-center text-[#f6bc7c] py-12">Chargement...</div>
          ) : (
            <div className="bg-[#242424] rounded-xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Nom</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Email</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Téléphone</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Statut</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Rôle</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c] text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/2">
                        <td className="px-6 py-4 text-white text-sm">{u.full_name || '-'}</td>
                        <td className="px-6 py-4 text-white/70 text-sm">{u.email}</td>
                        <td className="px-6 py-4 text-white/70 text-sm">{u.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${u.is_approved ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {u.is_approved ? 'Approuvé' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${u.is_admin ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-white/40'}`}>
                            {u.is_admin ? 'Admin' : 'Utilisateur'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateUserStatus(u.id, !u.is_approved)}
                              disabled={actionLoading[u.id]}
                              className="px-3 py-1 text-xs rounded-md bg-[#f6bc7c] text-[#1a1a1a] font-medium hover:bg-[#f6bc7c]/80 disabled:opacity-50"
                            >
                              {actionLoading[u.id] ? '...' : (u.is_approved ? 'Désapprouver' : 'Approuver')}
                            </button>
                            <button
                              onClick={() => updateAdminStatus(u.id, !u.is_admin)}
                              disabled={actionLoading[u.id + '_admin']}
                              className="px-3 py-1 text-xs rounded-md bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-50"
                            >
                              {actionLoading[u.id + '_admin'] ? '...' : (u.is_admin ? 'Retirer admin' : 'Faire admin')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* ─── Onglet Événements ─── */}
        {activeTab === 'events' && (
          <div className="space-y-6">

            {/* Bouton Ajouter */}
            {!showForm && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#f6bc7c] text-[#1a1a1a] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#f6bc7c]/90 transition-colors"
                >
                  + Ajouter un événement
                </button>
              </div>
            )}

            {/* Formulaire */}
            {showForm && (
              <div className="bg-[#242424] rounded-xl border border-white/10 p-6">
                <h2 className="text-lg font-semibold text-[#f6bc7c] mb-5">
                  {editingId ? 'Modifier l\'événement' : 'Nouvel événement'}
                </h2>
                <form onSubmit={handleEventSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-white/60 text-xs mb-1">Titre *</label>
                    <input
                      required
                      value={eventForm.title}
                      onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))}
                      placeholder="Ex: Breizh Loves Mambo"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50 placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs mb-1">Tag / Catégorie</label>
                    <input
                      value={eventForm.tag}
                      onChange={e => setEventForm(f => ({ ...f, tag: e.target.value }))}
                      placeholder="Ex: Festival · Rennes"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50 placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs mb-1">Date</label>
                    <input
                      value={eventForm.date}
                      onChange={e => setEventForm(f => ({ ...f, date: e.target.value }))}
                      placeholder="Ex: Avril 2027"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50 placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs mb-1">Lieu</label>
                    <input
                      value={eventForm.location}
                      onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="Ex: Rennes · 3 jours"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50 placeholder-white/20"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs mb-1">Ordre d'affichage</label>
                    <input
                      type="number"
                      value={eventForm.order}
                      onChange={e => setEventForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white/60 text-xs mb-1">Description</label>
                    <textarea
                      value={eventForm.description}
                      onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))}
                      rows={3}
                      placeholder="Description de l'événement..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#f6bc7c]/50 placeholder-white/20 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={eventForm.featured}
                      onChange={e => setEventForm(f => ({ ...f, featured: e.target.checked }))}
                      className="w-4 h-4 accent-[#f6bc7c]"
                    />
                    <label htmlFor="featured" className="text-white/70 text-sm">Événement mis en avant (grande carte)</label>
                  </div>
                  <div className="md:col-span-2 flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={eventSaving}
                      className="bg-[#f6bc7c] text-[#1a1a1a] px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#f6bc7c]/90 disabled:opacity-50 transition-colors"
                    >
                      {eventSaving ? 'Sauvegarde...' : (editingId ? 'Mettre à jour' : 'Créer')}
                    </button>
                    <button
                      type="button"
                      onClick={cancelForm}
                      className="px-6 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Liste des événements */}
            {eventsLoading ? (
              <div className="text-center text-[#f6bc7c] py-12">Chargement...</div>
            ) : events.length === 0 ? (
              <div className="text-center text-white/30 py-16 bg-[#242424] rounded-xl border border-white/10">
                Aucun événement. Cliquez sur &quot;Ajouter un événement&quot; pour commencer.
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-[#242424] rounded-xl border border-white/10 px-5 py-4 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {ev.featured && (
                          <span className="bg-[#f6bc7c]/20 text-[#f6bc7c] text-xs px-2 py-0.5 rounded-full">Mis en avant</span>
                        )}
                        {ev.tag && (
                          <span className="bg-white/10 text-white/50 text-xs px-2 py-0.5 rounded-full">{ev.tag}</span>
                        )}
                      </div>
                      <h3 className="text-white font-medium truncate">{ev.title}</h3>
                      {ev.description && (
                        <p className="text-white/40 text-sm mt-1 line-clamp-1">{ev.description}</p>
                      )}
                      <div className="flex gap-3 mt-2 text-xs text-white/30">
                        {ev.date && <span>{ev.date}</span>}
                        {ev.location && <span>· {ev.location}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(ev)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        disabled={deletingId === ev.id}
                        className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50 transition-colors"
                      >
                        {deletingId === ev.id ? '...' : 'Supprimer'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
