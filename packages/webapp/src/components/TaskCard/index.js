import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Card from '../Card';
import { ReactComponent as EmailIcon } from '../../assets/images/chooseFarm/emailIcon.svg';
import StatusLabel from './StatusLabel';
import { Main } from '../Typography';
import { ReactComponent as CalendarIcon } from '../../assets/images/task/Calendar.svg';
import { ReactComponent as UnassignedIcon } from '../../assets/images/task/Unassigned.svg';

import { useTranslation } from 'react-i18next';

// current && not selected -> grey 900
// current && selected -> teal 900
// not current && not selected -> teal 900
// not current && selected -> teal 900

const cardColor = {
  planned: 'taskCurrent',
  late: 'taskCurrent',
  completed: 'taskMarked',
  abandoned: 'taskMarked',
};

const activeCardColor = {
  planned: 'taskCurrentActive',
  late: 'taskCurrentActive',
  completed: 'taskMarkedActive',
  abandoned: 'taskMarkedActive',
};

const PureTaskCard = ({
  status,
  locations,
  crops,
  dueDate,
  assignee = null,
  style,
  onClick = null,
  onClickAssignee,
  selected,
  ...props
}) => {
  const { t } = useTranslation();
  if (!locations.length) console.error('Task should be associated with at least one location');
  const locationText = locations.length > 1 ? t('TASK.CARD.MULTIPLE_LOCATIONS') : locations[0].name;
  const cropText = crops.length > 1 ? t('TASK.CARD.MULTIPLE_CROPS') : crops[0]; // TODO: make this use translation key
  const dateText = new Date(dueDate).toDateString().slice(4);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.statusLabel}>
        <StatusLabel status={status} />
      </div>
      <Card
        color={selected ? activeCardColor[status] : cardColor[status]}
        onClick={onClick}
        className={styles.card}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          ...style,
        }}
        {...props}
      >
        <div className={styles.taskIcon}></div>
        <div className={styles.info}>
          <Main style={{ fontWeight: '600', marginBottom: '4px' }}>{'Transplant'}</Main>
          <div className={styles.subMain}>{`${locationText} | ${cropText}`}</div>
          <div className={styles.dateUserContainer}>
            <div className={styles.iconTextContainer}>
              <CalendarIcon className={styles.icon} />
              <div>{dateText}</div>
            </div>
            {assignee ? (
              <div
                className={styles.iconTextContainer}
                onClick={onClickAssignee}
                style={{ cursor: 'pointer' }}
              >
                <div className={clsx(styles.firstInitial, styles.icon)}>
                  {assignee.first_name.toUpperCase().charAt(0)}
                </div>
                <div>{`${assignee.first_name} ${assignee.last_name.charAt(0)}.`}</div>
              </div>
            ) : (
              <div
                className={clsx(styles.iconTextContainer, styles.unassigned)}
                onClick={onClickAssignee}
                style={{ cursor: 'pointer' }}
              >
                <UnassignedIcon className={styles.icon} />
                <div>{t('TASK.UNASSIGNED')}</div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

PureTaskCard.propTypes = {
  color: PropTypes.oneOf(['secondary', 'active', 'disabled']),
  onClick: PropTypes.func,
  ownerName: PropTypes.string,
  farmName: PropTypes.string,
  address: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
};

export default PureTaskCard;
