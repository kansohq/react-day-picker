import React from 'react';
import { getTime } from 'date-fns';

import { prepareDayPicker } from './helpers';
import defaultProps from './defaultProps';
import { DayPickerProps } from 'types/props';
import { ClassNames, Components } from 'types/common';

function filterEmpty(obj: object): object {
  if (!obj) {
    return {};
  }
  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined)
    .reduce((obj, [key, value]) => ((obj[key] = value), obj), {});
}

export const DayPicker: React.FC<DayPickerProps> = (
  initialProps = defaultProps
) => {
  // Extend props with defaults
  const components: Components = {
    ...defaultProps.components,
    ...filterEmpty(initialProps.components),
  };
  const classNames: ClassNames = {
    ...defaultProps.classNames,
    ...filterEmpty(initialProps.classNames),
  };
  const props: DayPickerProps = {
    ...defaultProps,
    ...filterEmpty(initialProps),
    components,
    classNames,
  };

  // From `style` prop
  const style = { ...props.styles.container, ...props.style };

  // From `className prop`
  let className = [props.classNames.container];
  if (props.className) {
    className.concat(props.className.split(' '));
  }
  const classNameStr = className.join(' ');

  const { months } = prepareDayPicker(props);
  const { Navigation, Month } = props.components;

  return (
    <div className={classNameStr} style={style} dir={props.dir}>
      {props.showNavigation && <Navigation dayPickerProps={props} />}
      <div
        className={props.classNames.months}
        style={props.styles ? props.styles.month : undefined}
      >
        {months.map((month: Date) => (
          <Month
            key={getTime(month)}
            month={month}
            months={months}
            dayPickerProps={props}
          />
        ))}
      </div>
    </div>
  );
};
