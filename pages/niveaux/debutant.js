import Head from 'next/head';
import Navbar from '../../components/Navbar';
import ProtectedRoute from '../../components/ProtectedRoute';

const videos = [
  { id: '1', title: 'Pas de base salsa', url: 'https://www.youtube.com/embed/x4hozdO1YKo' },
  { id: '2', title: 'Position de base', url: 'https://www.youtube.com/embed/x4hozdO1YKo' },
];

export default function Debutant() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#2b2b2b]">
        <Head>
          <title>Niveau Débutant - Salsa Rennes</title>
          <meta name="description" content="Cours de salsa pour débutants à Rennes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Navbar />

        <main className="container mx-auto px-4 py-12 pt-24">
          <h1 className="text-4xl font-bold text-center mb-12 text-[#f6bc7c]">
            Niveau Débutant
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
