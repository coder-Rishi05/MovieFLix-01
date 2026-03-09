import { useState } from "react";
import { askAI } from "../services/aiService";

const AIPage = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const data = await askAI(input);
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        AI Mood Movie Assistant 🎬
      </h1>

      <div className="flex gap-4">
        <input
          className="flex-1 p-3 bg-neutral-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling today?"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 rounded"
        >
          Ask
        </button>
      </div>

      {loading && <p className="mt-6">Thinking...</p>}

      {response && (
        <div className="mt-8 bg-neutral-800 p-6 rounded">
          <p className="text-xl font-semibold mb-2">
            Mood: {response.mood}
          </p>
          <p className="mb-4">{response.message}</p>
          <p>
            Recommended Genres: {response.recommended_genres.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIPage;