export function getNextCompetenceId(
  seedId: string,
  parentId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr: any[],
  idKey: string
): string {
  const maybeSeed = parentId.indexOf(seedId) === -1 ? seedId : "";
  if (arr.length === 0) {
    return `${parentId}${maybeSeed}01`;
  }

  const [_, ...restIdPart] = arr[arr.length - 1][idKey].split(parentId);
  const nextId = String(Number(restIdPart.join("")) + 1).padStart(2, "0");

  return `${parentId}${maybeSeed}${nextId}`;
}
