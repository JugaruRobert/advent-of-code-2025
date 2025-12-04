export function readMatrix(input: string, delimiter = '') {
  const splitCharacter = input.includes('\r') ? '\r\n' : '\n';
  let lines = input.split(splitCharacter);

  if (lines[lines.length - 1].trim().length == 0) {
    lines = lines.slice(0, lines.length - 1);
  }

  return lines.map((line) => line.split(delimiter));
}
