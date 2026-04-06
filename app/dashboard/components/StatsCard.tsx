type Props = {
  title: string;
  value: number;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-gray-800">
        {value.toLocaleString()}
      </h2>
    </div>
  );
}