export function idToString(id: number) {
  const charset = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ"; // without 0, l, I
  let result = "";

  while (id > 0) {
    result += charset[id % 59];
    id = Math.floor(id / 59);
  }

  return result;
}
