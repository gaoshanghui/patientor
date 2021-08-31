import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { Patient } from '../types';

import { apiBaseUrl } from '../constants';

import { useStateValue, setPatient } from '../state';

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
        console.log(error.message);
      }
    };

    void fetchPatientInformation();
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
    </div>
  );
};

export default PatientInfoPage;
