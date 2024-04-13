async function AiMessage(message, system = "be a helpful doctor. ONLY answer medical questions. DO NOT ANSWER ANYTHING OTHER THAN MEDICAL QUESTIONS. Be kind and symphathetic to the user. Do not use emojis. Do not use slang. Write short and concise.", model, temp = 0.8) {
  const url = 'https://api.deepinfra.com/v1/openai/chat/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'text/event-stream',
  }
  const body = {
    model: model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: message },
    ],
    stream: false,
    temperature: temp
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    result += chunk;
  }

  return result;
}
