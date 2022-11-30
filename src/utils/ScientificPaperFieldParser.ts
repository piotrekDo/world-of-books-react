export const fieldParser = (field: string) => {
  if (field === 'ASTRONOMY') return 'Astronomy';
  if (field === 'CHEMISTRY') return 'Chemistry';
  if (field === 'PHYSIC') return 'Physic';
  if (field === 'HEALTH') return 'Health';
  if (field === 'NATURE') return 'Nature';
  if (field === 'MATHEMATICS') return 'Mathematics';
  if (field === 'COMPUTER_SCIENCE') return 'Computer science';
  return field;
};
