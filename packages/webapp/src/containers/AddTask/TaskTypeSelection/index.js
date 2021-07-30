import PureTaskTypeSelection from '../../../components/AddTask/PureTaskTypeSelection';
import { useSelector } from 'react-redux';
import { userFarmSelector } from '../../userFarmSlice';

function TaskTypeSelection({ history, match }) {
  const userFarm = useSelector(userFarmSelector);

  const onCustomTask = () => {
    history.push('/tasks/:management_plan_id/add_task/task_date');
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const handleCancel = () => {
    console.log('cancel called');
  };

  return (
    <PureTaskTypeSelection
      onCustomTask={onCustomTask}
      handleCancel={handleCancel}
      handleGoBack={handleGoBack}
    />
  );
}

export default TaskTypeSelection;
