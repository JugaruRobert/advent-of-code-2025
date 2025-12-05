export function getGroups(input: string): string[][] {
  return input.split('\r\n\r\n').map((group) => group.split('\r\n'));
}
