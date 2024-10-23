const { _ai } = await import("lowline.ai");

async function generateText(prompt) {
  const result = await _ai.generatePlaintext({prompt});
  return result;
}

export { generateText }