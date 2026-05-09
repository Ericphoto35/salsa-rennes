import Seo from '../../components/Seo';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';

const videos = [
  { id: '1', title: 'Figures intermédiaires', url: 'https://www.youtube.com/embed/Q-BGFOCdYnc' },
  { id: '2', title: 'Combinaisons de pas', url: 'https://www.youtube.com/embed/2yQHozcJBu8' },
  { id: '3', title: 'Combinaisons de pas', url: 'https://www.youtube.com/embed/Q-BGFOCdYnc' },
];

export default function Intermediaire() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#2b2b2b]">
        <Seo
          title="Niveau Intermédiaire - Salsa Rennes"
          description="Cours de salsa niveau intermédiaire à Rennes"
          url="https://www.salsarennes.fr/niveaux/intermediaire"
          noIndex={true}
        />

        <Navbar />

        <main className="container mx-auto px-4 py-12 pt-24">
          <h1 className="text-4xl font-bold text-center mb-12 text-[#f6bc7c]">
            Niveau Intermédiaire
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="bg-[#2b2b2b] rounded-lg shadow-xl overflow-hidden border border-[#f6bc7c]/20">
                  <div className="relative pt-[56.25%]">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={video.url}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-[#f6bc7c]">{video.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
