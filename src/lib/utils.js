export function mapToIds(list, idKey) {
  return list.reduce((prev, curr) => {
    prev[curr[idKey]] = curr;
    return prev;
  }, {});
}