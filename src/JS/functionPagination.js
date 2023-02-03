export function pagination(activePage, totalPages) {
  if (typeof totalPages !== 'number' || typeof activePage !== 'number') {
    return;
  }
  if (totalPages < activePage || totalPages <= 0 || activePage <= 0) {
    return;
  }

  const arr = [
    activePage - 2,
    activePage - 1,
    activePage,
    activePage + 1,
    activePage + 2,
  ];

  const filteredArr = arr.filter(num => num > 1 && num < totalPages);
  const newArr = [1, totalPages];

  const includeThreeLeft = activePage === 5;
  const includeThreeRight = activePage === totalPages - 4;
  const includeLeftDots = activePage > 5;
  const includeRightDots = activePage < totalPages - 4;

  if (includeThreeLeft) filteredArr.unshift(2);
  if (includeThreeRight) filteredArr.push(totalPages - 1);

  if (includeLeftDots) {
    filteredArr.unshift('...');
    newArr.unshift('<-');
  }

  if (includeRightDots) {
    filteredArr.push('...');
    newArr.push('->');
  }

  if (newArr.includes('<-') || newArr.length === 4) {
    newArr.splice(2, 0, ...filteredArr);
  } else if (newArr.includes('->')) {
    newArr.splice(1, 0, ...filteredArr);
  } else {
    newArr.splice(1, 0, ...filteredArr);
  }

  const result = newArr.map(el => {
    if (typeof el === 'number') {
      if (el === activePage) {
        el = el + 'active';
      }
      el = String(el);
    }
    return el;
  });

  return result;
}

pagination(15, 20);
