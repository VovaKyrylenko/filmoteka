function pagination(totalPages, activePage) {
  // 1. Створюю шаблон масиву, який буде повертати ф-я після внесення до неї змін
  const arr = ['<-', '1', '...', '...', `${totalPages}`, '->'];

  // 2. Умова виконується, якщо загальна кількість сторінок менше ніж 7
  if (totalPages < 7) {
    // numArr - це масив сторінок, в межах яких знаходиться активна сторінка, а також після додається до шаблонного масиву (згідно макету довжина цього масиву 5, включаючи активну сторінку)
    const numArr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      // Умова додавання до активної сторінки приставки active
      if (i === activePage) {
        i = i + 'active';
        numArr.push(i);
        i = activePage + 1;
      }
      numArr.push(String(i));
    }
    // З шаблонного масиву прибираю всі початкові значення
    arr.splice(0, 6);
    // Додаю до шаблону масив з активною сторінкою
    numArr.reverse().forEach(num => {
      arr.splice(0, 0, num);
    });
    // Повертаю відредагований кінцевий шаблон масиву
    console.log(arr);
    return arr;
  }

  // 3. Для випадків, коли загальна кількість сторінок перевищує 7, створюю цикл для перебериння кожної сторінки в межах totalPages
  // В циклі виконуються 3 умови, в залежності від того, де знаходиться активна сторінка

  for (let i = activePage; i < totalPages; i += 1) {
    //   3.1 Умова виконується, якщо активна сторінка знаходиться в діапазоні від 1 до 4 включно
    if (activePage >= 1 && activePage <= 4) {
      const numArr = [];
      for (let i = 1; i <= 5; i += 1) {
        if (i === activePage) {
          i = i + 'active';
          numArr.push(i);
          i = activePage + 1;
        }
        numArr.push(String(i));
      }
      // З шаблонного масиву прибираю першу стрілку та перші крапки
      arr.splice(0, 3);

      numArr.reverse().forEach(num => {
        arr.splice(0, 0, num);
      });

      console.log(arr);
      return arr;
    }
    //   3.2 Умова виконується, якщо активна сторінка знаходиться в діапазоні від 5 і до кінця, але не враховуючи останні 4 сторінки
    if (activePage >= 5 && activePage <= totalPages - 4) {
      const numArr = [];
      for (let i = activePage - 2; i <= activePage + 2; i += 1) {
        if (i === activePage) {
          i = i + 'active';
          numArr.push(i);
          i = activePage + 1;
        }
        numArr.push(String(i));
      }
      numArr.reverse().forEach(num => {
        arr.splice(3, 0, num);
      });

      console.log(arr);
      return arr;
    }
    //   3.3 Умова виконується, якщо активна сторінка знаходиться в діапазоні останніх 5 сторінок
    if (activePage > totalPages - 4 && activePage <= totalPages) {
      const numArr = [];
      for (let i = totalPages - 4; i <= totalPages; i += 1) {
        if (i === activePage) {
          i = i + 'active';
          numArr.push(i);
          i = activePage + 1;
        }
        numArr.push(String(i));
      }
      // З шаблонного масиву прибираю останню стрілку та крапки
      arr.splice(3, 3);

      numArr.reverse().forEach(num => {
        arr.splice(3, 0, num);
      });

      console.log(arr);
      return arr;
    }
  }
}

// Перевірка функції
pagination(20, 10);
