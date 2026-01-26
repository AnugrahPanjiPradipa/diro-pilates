import Image from 'next/image';

const CourtStep = ({ selectedCourt, setSelectedCourt, COURTS }) => {
  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
        Select Court
      </h3>
      <div className="space-y-4">
        {COURTS.map((courtItem) => (
          <div
            key={courtItem.id}
            onClick={() => setSelectedCourt(courtItem)}
            className={`flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all
                    ${selectedCourt?.id === courtItem.id ? 'border-black ring-1 ring-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
          >
            {/* Gambar Court */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shrink-0">
              <Image
                src={courtItem.image}
                alt={courtItem.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900">{courtItem.name}</h4>
                <span className="text-xs font-bold text-black bg-gray-100 px-2 py-1 rounded-full">IDR {courtItem.price.toLocaleString()}/hr</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{courtItem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourtStep;
