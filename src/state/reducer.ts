import { State } from './state';
import { Patient, Diagnosis } from '../types';

// Types
export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS';
      payload: Diagnosis[];
    };

// Reducers
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: {
          ...action.payload,
        },
      };
    case 'SET_DIAGNOSIS':
      return {
        ...state,
        diagnoses: [...action.payload],
      };
    default:
      return state;
  }
};

// Action creators
export const setPatient = (patientData: Patient): Action => {
  return {
    type: 'SET_PATIENT',
    payload: patientData,
  };
};

export const setPatientList = (patientsData: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientsData,
  };
};

export const setDiagnoses = (diagnosesData: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS',
    payload: diagnosesData,
  };
};
