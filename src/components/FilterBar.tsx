'use client';

interface FilterBarProps {
  producers: string[];
  selectedProducer: string;
  onProducerChange: (producer: string) => void;
}

export default function FilterBar({ producers, selectedProducer, onProducerChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onProducerChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedProducer === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All Producers
      </button>
      {producers.map((producer) => (
        <button
          key={producer}
          onClick={() => onProducerChange(producer)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedProducer === producer
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {producer}
        </button>
      ))}
    </div>
  );
}
