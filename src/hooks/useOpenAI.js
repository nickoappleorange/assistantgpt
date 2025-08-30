import { useState } from 'react';

const OPENAI_API_KEY = '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';

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage, history = []) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are Lumina, an advanced AI assistant. You are helpful, creative, and provide detailed responses. Always be friendly and professional. If asked to generate a title for a conversation, provide a short, concise title of 5 words or less, and nothing else.'
            },
            ...history,
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error.message}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt) => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error.message}`);
      }
      
      const data = await response.json();
      return data.data[0].url;

    } catch (error) {
      console.error('DALL-E 3 API error:', error);
      throw new Error('Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    generateImage,
    isLoading
  };
};