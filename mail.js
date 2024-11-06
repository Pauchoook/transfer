console.log('Init!');

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+79999999999');
im.mask(inputs);



if (document.querySelector('.leave-review__form')) {

  const validation_1 = new JustValidate('.leave-review__form');
  validation_1
    .addField('.input-tel', [
      {
        rule: 'number',
        errorMessage: 'Введите корректный номер',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле',
      },
      {
        rule: 'minNumber',
        value: 3,
        errorMessage: 'Введите корректный номер',
      },
    ],
      {
        errorsContainer: '.input-tel+.form-error',
      }
    )
    .addField('.input--textarea', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'maxLength',
        value: 200,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '.input--textarea+.form-error',
      }
    ).onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            // successText();
            // location.href = 'https://xn----7sbnekcnb5bky.xn--p1ai/thanks.html';
            alert('Ваша заявка отправлена. Наши специалисты в ближайшее время свяжутся с Вами.');
          }
        }
      }

      xhr.open('POST', '/mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });
}


if (document.querySelector('.tax__form')) {

  const validation_2 = new JustValidate('.tax__form');
  validation_2
    .addField('#tax-name', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#tax-name+.form-error',
      }
    )
    .addField('#tax-family', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#tax-family+.form-error',
      }
    )
    .addField('#tax-patronymic', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#tax-patronymic+.form-error',
      }
    )
    .addField('#passport-series', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#passport-series+.form-error',
      }
    )
    .addField('#passport-number', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#passport-number+.form-error',
      }
    )
    .addField('#passport-date', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#passport-date+.form-error',
      }
    )
    .addField('#passport-who', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#passport-who+.form-error',
      }
    )
    .addField('#tax-tel', [
      {
        rule: 'number',
        errorMessage: 'Введите корректный номер',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле',
      },
      {
        rule: 'minNumber',
        value: 3,
        errorMessage: 'Введите корректный номер',
      },
    ],
      {
        errorsContainer: '.input-tel+.form-error',
      }
    )
    .addField('#tax-email', [
      {
        rule: 'email',
        errorMessage: 'Введите e-mail',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле',
      },
    ],
      {
        errorsContainer: '#tax-email+.form-error',
      }
    )
    .addField('#tax-patronymic-contacts', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
      {
        errorsContainer: '#tax-patronymic-contacts+.form-error',
      }
    )
    .addField('#name-client-1', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
    )
    .addField('#patronimyc-client-1', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
    )
    .addField('#family-client-1', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните поле'
      }
    ],
    )
    .addField('#date-client-1', [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Введите минимум 3 буквы'
      },
      {
        rule: 'required',
        errorMessage: 'Заполните поле'
      }
    ],
    )
    .onSuccess((event) => {
      console.log('Validation passes and form submitted', event);

      let formData = new FormData(event.target);

      console.log(...formData);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            alert('Ваша заявка отправлена. Наши специалисты в ближайшее время свяжутся с Вами.');
            // successText();           
          }
        }
      }

      xhr.open('POST', '/mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });
}





// validation_3
//   .addField('.callback-tel', [
//     {
//       rule: 'required',
//       value: true,
//       errorMessage: 'Заполните телефон',
//     },
//     {
//       rule: 'minNumber',
//       value: 3,
//       errorMessage: 'Введите корректный номер',
//     },

//   ]).onSuccess((event) => {
//     console.log('Validation passes and form submitted', event);

//     let formData = new FormData(event.target);

//     console.log(...formData);

//     let xhr = new XMLHttpRequest();

//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           console.log('Отправлено');
//           // successText();
//           location.href = 'https://xn----7sbnekcnb5bky.xn--p1ai/thanks.html';
//         }
//       }
//     }

//     xhr.open('POST', 'mail.php', true);
//     xhr.send(formData);

//     event.target.reset();
//   });
