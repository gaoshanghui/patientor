import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { Patient, Entry } from '../types';

import { apiBaseUrl } from '../constants';

import { useStateValue, setPatient, setDiagnoses } from '../state';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// Component: Patient's entry detail
const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>Health Check Rating: {entry.healthCheckRating}</p>
        </div>
      );
    case 'Hospital':
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>
            Discharge: {entry.discharge.date} {entry.discharge.criteria}
          </p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
        <div>
          <p>{entry.date}</p>
          <p>{entry.description}</p>
          <p>
            Sick Leave: {entry.sickLeave?.startDate} {entry.sickLeave?.endDate}
          </p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patient }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientInformation = async () => {
      try {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchDiagnosesData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/diagnoses/`);
        dispatch(setDiagnoses(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    void fetchPatientInformation();
    void fetchDiagnosesData();
  }, [dispatch]);

  return (
    <div>
      <h3>{patient.name}</h3>
      <div>
        <span>gender: </span>
        {patient.gender}
      </div>
      <div>
        <span>ssn: </span>
        {patient.ssn}
      </div>
      <div>
        <span>occupation: </span>
        {patient.occupation}
      </div>
      <hr />
      <div>
        <h3>entries</h3>
        {patient.entries.map((entry) => {
          return (
            // <div key={entry.id}>
            //   <p>{entry.date}</p>
            //   <p>{entry.description}</p>
            //   <ul>
            //     {entry.diagnosisCodes?.map((code) => (
            //       <li key={code}>
            //         {code}{' '}
            //         {
            //           diagnoses?.find((diagnosis) => diagnosis.code === code)
            //             ?.name
            //         }
            //       </li>
            //     ))}
            //   </ul>
            // </div>
            <EntryDetails key={entry.id} entry={entry} />
          );
        })}
      </div>
    </div>
  );
};

export default PatientInfoPage;
