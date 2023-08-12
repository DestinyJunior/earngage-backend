function _calculateAge(birthday: Date) {
  // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const stringIncludesAny = (text: string, searchWords: string[]) =>
  searchWords.some((el) => {
    return text.match(new RegExp(el, 'i'));
  });

const stringIncludesAll = (text: string, searchWords: string[]) =>
  searchWords.every((el) => {
    return text.match(new RegExp(el, 'i'));
  });

function forEachAsync<T, TRes>(
  collection: T[],
  action: (item: T) => Promise<TRes>,
): Promise<TRes[]> {
  const promises = collection.map((item: T) => {
    return action(item);
  });
  return Promise.all(promises);
}

export { _calculateAge, stringIncludesAny, stringIncludesAll, forEachAsync };
