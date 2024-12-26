import { useState } from 'react';
import './App.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function generateAnswer() {
    try {
      console.log(API_KEY);
      setAnswer('loading...');
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        method: 'post',
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setAnswer('Failed to generate an answer. Please try again.');
    }
  }

  return (
    <>
      <h1 className="bg-blue-300">Chat AI</h1>
      <textarea
        className="border rounded w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        cols="30"
        rows="10"
        placeholder="Ask Anything?"
      ></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <pre>{answer}</pre>
    </>
  );
}

export default App;
