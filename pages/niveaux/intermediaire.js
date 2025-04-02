import Head from 'next/head';

const videos = [
  { id: '3', title: 'Figures intermédiaires', url: 'https://www.youtube.com/embed/XXXXX' },
  { id: '4', title: 'Combinaisons', url: 'https://www.youtube.com/embed/XXXXX' },
];

export default function Intermediaire() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Niveau Intermédiaire - Salsa Rennes</title>
        <meta name="description" content="Cours de salsa de niveau intermédiaire à Rennes" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Niveau Intermédiaire
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                  <h2 className="text-xl font-semibold text-gray-800">{video.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
