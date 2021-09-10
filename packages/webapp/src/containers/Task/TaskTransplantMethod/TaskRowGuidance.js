import PurePlanGuidance from '../../../components/Crop/BedPlan/BedPlanGuidance';
import { useSelector } from 'react-redux';
import { measurementSelector } from '../../userFarmSlice';
import { HookFormPersistProvider } from '../../hooks/useHookFormPersist/HookFormPersistProvider';
import { hookFormPersistSelector } from '../../hooks/useHookFormPersist/hookFormPersistSlice';
import { managementPlanSelector } from '../../managementPlanSlice';

export default function TaskRowGuidance({ history, match }) {
  const persistedFormData = useSelector(hookFormPersistSelector);
  const { crop_variety_id } = useSelector(
    managementPlanSelector(persistedFormData.managementPlans[0].management_plan_id),
  );
  const system = useSelector(measurementSelector);

  return (
    <HookFormPersistProvider>
      <PurePlanGuidance
        system={system}
        history={history}
        variety_id={crop_variety_id}
        isFinalPage={true}
        cancelPath={'/tasks'}
        submitPath={'/add_task/task_assignment'}
        prefix={'transplant_task.planting_management_plan'}
      />
    </HookFormPersistProvider>
  );
}
