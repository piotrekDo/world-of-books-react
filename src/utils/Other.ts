export function sleep(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

export function publicationTypeParser(type: string) {
  if (type === 'AUDIOBOOK') return 'Audiobook';
  if (type === 'SCIENTIFIC_PAPER') return 'Scientific paper';
  if (type === 'BOOK') return 'Book';
  return type;
}
