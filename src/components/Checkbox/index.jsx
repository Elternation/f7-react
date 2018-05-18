import React              from 'react';
import async              from 'async';
import PropTypes          from 'prop-types';
import classNames         from 'classnames';

class F7Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.on_change_locked = false;
    this.checked = props.checked;
  }

  _filterProps() {
    let events_props = {};

    // Так как onChange работает не всегда будем эмулировать его сами вешаясь на onClick, а сам обработчки onChange забиваем
    events_props['onClick'] = this._syntheticOnChangeCallbackBuilder();
    events_props['onChange'] = () => { /* Empty function */ };

    for (let [key, value] of Object.entries(this.props)) {
      if (key.substring(0,2) !== 'on') {
        continue;
      }

      if (key !== 'onClick' && key !== 'onChange') {
        events_props[key] = value;
      }
    }

    return events_props;
  }

  /**
   * Возвращает совмещенный обработчки onClick и onChange для навеса на событие 'click', а уже в теле обработчика разбираем изменение или клик нам нужен
   *
   * @returns {Function}
   * @private
   */
  _syntheticOnChangeCallbackBuilder() {
    return (click_event) => {
      // Чтобы не было случайных пробросов событий для одного чекбокса блокируем параллельное выполнение onChange
      if (this.on_change_locked) {
        return;
      }

      // Синхронизируем ожидаемое состояние
      if(typeof this.checked === 'boolean') {
        this.input.checked = !this.checked;
      }

      // Если нашли обработчки onChange
      if (this.props.onChange) {
        // Блокируем выполнение параллельно второго onChange
        this.on_change_locked = true;

        // Создаем искусственно событие для инпута
        let change_event = document.createEvent('HTMLEvents');

        change_event.initEvent('change', false, true);

        // Действуем строго по порядку
        async.series([
          (acb) =>  {
            // Диспатчим событие для инпута, чтобы само событие наполнилось данными
            this.input.dispatchEvent(change_event);
            // Вызываем через setTimeout, чтобы попасть точно в конец стека вызовов
            setTimeout(acb, 0);
          },
          (acb) =>  {
            // Сами следим на состоянием, т.к. временами получались пробросы старых состояний. Тут имеем допущение, что каждый клик должен менять состояние на противоположное
            if(typeof this.checked === 'boolean') {
              change_event.target.checked = !this.checked;
            }

            this.props.onChange(change_event);
            setTimeout(acb, 0);
          },
          (acb) =>  {
            // Когда пробросили в обработчик восстанавливаем наше состояние checked из props и возвращаем состояние инпуту.
            // Дальше же если обработчик onChange внешне изменит состояние и вернет новый props, то мы изменим на новое в componentWillReceiveProps
            if (typeof this.props.checked === 'boolean') {
              this.checked = this.props.checked;
              this.input.checked = this.checked;
            }
            acb();
          },
        ], () => {
          // Когда все доделали разблокируем прием onChange
          this.on_change_locked = false;
        });
      }

      // Ну а если мы просто хотели onClick то прикодивыем его дальше
      if (this.props.onClick) {
        this.props.onClick(click_event);
      }
    };
  }

  _getFakeInputOnChange() {
    if (typeof this.props.checked === 'boolean' && typeof this.props.onChange === 'function') {
      return () => { /* Empty function */ };
    }

    return undefined;
  }

  UNSAFE_componentWillReceiveProps(new_props) {
    // По прилету новых props актуализируем состояние
    if (typeof new_props.checked === 'boolean') {
      this.checked = new_props.checked;
      this.input.checked = this.checked;
    }
  }

  render() {
    let events_props = this._filterProps();

    return <label {...events_props} className={classNames(['checkbox', this.props.className])}>
      <input onChange={this._getFakeInputOnChange()} ref={(input_el) => { this.input = input_el; }} checked={!!this.checked} type="checkbox"/>
      <i className="icon-checkbox"/>
    </label>;
  }
}

F7Checkbox.propTypes = {
  className: PropTypes.string,
  checked  : PropTypes.bool,
  onClick  : PropTypes.func,
  onChange : PropTypes.func
};

export default F7Checkbox;
