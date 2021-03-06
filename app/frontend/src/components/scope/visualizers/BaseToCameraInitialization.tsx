import * as React from "react";
import {
  BaseToCameraInitialization,
  CalibrationParameter,
  ViewInitialization
} from "../../../../genproto/farm_ng_proto/tractor/v1/calibrator";
import { useFormState } from "../../../hooks/useFormState";
import {
  FormProps,
  SingleElementVisualizerProps
} from "../../../registry/visualization";
import { CalibrationParameterVisualizer } from "./CalibrationParameter";
import { CalibrationParameterTable } from "./CalibrationParameterTable";
import { Card } from "./Card";
import {
  StandardComponentOptions,
  StandardComponent
} from "./StandardComponent";
import { ViewInitializationVisualizer } from "./ViewInitialization";

const BaseToCameraInitializationForm: React.FC<FormProps<
  BaseToCameraInitialization
>> = (props) => {
  const [value, setValue] = useFormState(props);
  return (
    <>
      <CalibrationParameterVisualizer.Form
        valueLabel="Wheel Baseline"
        initialValue={
          value.wheelBaseline || CalibrationParameter.fromPartial({})
        }
        onChange={(updated) =>
          setValue((v) => ({ ...v, wheelBaseline: updated }))
        }
      />

      <CalibrationParameterVisualizer.Form
        valueLabel="Wheel Radius"
        initialValue={value.wheelRadius || CalibrationParameter.fromPartial({})}
        onChange={(updated) =>
          setValue((v) => ({ ...v, wheelRadius: updated }))
        }
      />
      <ViewInitializationVisualizer.Form
        initialValue={
          value.basePoseCamera || ViewInitialization.fromPartial({})
        }
        onChange={(updated) =>
          setValue((v) => ({ ...v, basePoseCamera: updated }))
        }
      />
    </>
  );
};

const BaseToCameraInitializationElement: React.FC<SingleElementVisualizerProps<
  BaseToCameraInitialization
>> = ({ value: [, value] }) => {
  const { wheelBaseline, wheelRadius, basePoseCamera } = value;
  return (
    <>
      {basePoseCamera && (
        <Card title="base_pose_camera Initialization">
          <ViewInitializationVisualizer.Element value={[0, basePoseCamera]} />
        </Card>
      )}
      {wheelBaseline && wheelRadius && (
        <Card title="Other Calibration Parameters">
          <CalibrationParameterTable
            labels={["Wheel Baseline", "Wheel Radius"]}
            parameters={[wheelBaseline, wheelRadius]}
          />
        </Card>
      )}
    </>
  );
};

export const BaseToCameraInitializationVisualizer = {
  id: "BaseToCameraInitialization",
  types: [
    "type.googleapis.com/farm_ng_proto.tractor.v1.BaseToCameraInitialization"
  ],
  options: StandardComponentOptions,
  Component: StandardComponent(BaseToCameraInitializationElement),
  Element: BaseToCameraInitializationElement,
  Form: BaseToCameraInitializationForm
};
