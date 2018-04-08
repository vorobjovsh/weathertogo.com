    let picker = new Pikaday({
        field: document.getElementById('datepicker'),
        firstDay: 1,
        format: 'D.MM.YYYY',
        onSelect: function() {
            this.getMoment().format('Do MM.YYYY');
        },
        i18n: {
            previousMonth : 'Previous Month',
            nextMonth     : 'Next Month',
            months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
            weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        }
    });
