import { CaptureCalibrationDatasetProgram } from "../components/programs/CaptureCalibrationDataset";
import { CalibrateApriltagRigProgram } from "../components/programs/CalibrateApriltagRig";
import { CalibrateBaseToCameraProgram } from "../components/programs/CalibrateBaseToCamera";
import { CaptureVideoDatasetProgram } from "../components/programs/CaptureVideoDataset";
import { EventType } from "./events";
import { Event as BusEvent } from "../../genproto/farm_ng_proto/tractor/v1/io";

export interface Program<T extends EventType = EventType> {
  programIds: readonly string[];
  inputRequired: (e: BusEvent) => T | null;
  eventLogPredicate: (e: BusEvent) => boolean;
  Component: React.FC<ProgramProps<T>>;
}

export interface ProgramProps<T extends EventType = EventType> {
  inputRequired: T;
}

export const programRegistry: Program[] = [
  CaptureVideoDatasetProgram as Program,
  CaptureCalibrationDatasetProgram as Program,
  CalibrateApriltagRigProgram as Program,
  CalibrateBaseToCameraProgram as Program
];

export function programForProgramId(programId: string): Program | null {
  return (
    programRegistry.find((program) => program.programIds.includes(programId)) ||
    null
  );
}
