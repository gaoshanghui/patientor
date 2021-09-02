import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { Patient } from '../types';

import { apiBaseUrl } from '../constants';

import { useStateValue, setPatient, setDiagnoses } from '../state';

const PatientInfoPage = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patient, diagnoses }, dispatch] = useStateValue();
  console.log('diagnoses: ', diagnoses);

  useEffect(() => {
    const fetchPatientInformation = async () => {
      try {
        const response = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(response.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchDiagnosesData = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/diagnoses/`);
        dispatch(setDiagnoses(response.data));
      } catch (error) {
        console.log(error.message);
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
            <div key={entry.id}>
              <p>{entry.date}</p>
              <p>{entry.description}</p>
              <ul>
                {entry.diagnosisCodes?.map((code) => (
                  <li key={code}>
                    {code}{' '}
                    {
                      diagnoses?.find((diagnosis) => diagnosis.code === code)
                        ?.name
                    }
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientInfoPage;
