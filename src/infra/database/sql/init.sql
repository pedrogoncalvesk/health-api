/**
* CREATE Table API001_USU MNEMONIC
*/
CREATE TABLE HEALTH_APP.API001_USU (
    USU_ID NUMBER GENERATED ALWAYS AS IDENTITY,
    USU_CPF VARCHAR2(11) NOT NULL UNIQUE,
    USU_PFL VARCHAR2(45) NOT NULL,
    USU_EML VARCHAR2(200) NOT NULL UNIQUE,
    USU_FRT_NAM VARCHAR2(45) ,
    USU_LST_NAM VARCHAR2(4000),
    USU_STS NUMBER(1,0) DEFAULT 1,
    USU_CRT_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    USU_UPD_AT TIMESTAMP NULL,
    USU_PSW VARCHAR2(60),
    PRIMARY KEY (USU_ID)
);
COMMIT;

/**
* CREATE Table API001_TSK MNEMONIC
*/
CREATE TABLE HEALTH_APP.API001_TSK (
    TSK_ID RAW(16) default SYS_GUID() PRIMARY KEY,
    TSK_NAM VARCHAR2(11) NOT NULL,
    TSK_DSC VARCHAR2(300) NOT NULL,
    TSK_STS NUMBER(1,0) DEFAULT 0,
    TSK_USU_ID NUMBER(12) NOT NULL CONSTRAINT FK_API001_TSK_USU_ID REFERENCES API001_USU(USU_ID),
    TSK_CRT_AT TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    TSK_UPD_AT TIMESTAMP NULL
);
COMMIT;
ALTER USER HEALTH_APP quota unlimited on DATA;
COMMIT;
INSERT INTO HEALTH_APP.API001_USU (USU_CPF,USU_PFL, USU_EML, USU_FRT_NAM, USU_LST_NAM,USU_STS, USU_PSW) 
VALUES ('77444621063', 'admin', 'admin@system.com', 'Admin', 'System', 1, '$2b$10$IVOsdVthIS6d3t/CE5vwv.IdBGzSvrqx7e3HPyA48e1pgCTMcgzD6');
COMMIT;

CREATE TABLE HEALTH_APP.users (
    UserID NUMBER PRIMARY KEY,
    Name VARCHAR2(255),
    Email VARCHAR2(255),
    -- Adicione outros atributos comuns a médicos e pacientes, se necessário
);

CREATE TABLE Doctor (
    DoctorID NUMBER PRIMARY KEY,
    UserID NUMBER UNIQUE,
    Specialty VARCHAR2(255),
    -- Adicione outros atributos específicos de médicos, se necessário
    CONSTRAINT fk_doctor_user FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE Patient (
    PatientID NUMBER PRIMARY KEY,
    UserID NUMBER UNIQUE,
    HealthCondition VARCHAR2(255),
    -- Adicione outros atributos específicos de pacientes, se necessário
    CONSTRAINT fk_patient_user FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE HEALTH_APP.services (
    id RAW(16) default SYS_GUID() PRIMARY KEY,
    name VARCHAR2(255) NOT NULL UNIQUE,
    description LONG NULL DEFAULT NULL,
);

CREATE TABLE HEALTH_APP.SERVICES (
    ID RAW(16) DEFAULT SYS_GUID() PRIMARY KEY,
    NAME VARCHAR2(255) NOT NULL UNIQUE,
    DESCRIPTION CLOB NULL
);
COMMIT;

CREATE TABLE Appointment (
    AppointmentID NUMBER PRIMARY KEY,
    PatientID NUMBER,
    DoctorID NUMBER,
    ServiceID NUMBER,
    DateTime TIMESTAMP,
    Status VARCHAR2(50),
    -- Adicione outros atributos relacionados a agendamento, se necessário
    CONSTRAINT fk_appointment_patient FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    CONSTRAINT fk_appointment_doctor FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID),
    CONSTRAINT fk_appointment_service FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
);

CREATE TABLE DoctorService (
    DoctorServiceID NUMBER PRIMARY KEY,
    DoctorID NUMBER,
    ServiceID NUMBER,
    Availability VARCHAR2(255),
    -- Adicione outros atributos relacionados à associação de médico e serviço, se necessário
    CONSTRAINT fk_doctor_service_doctor FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID),
    CONSTRAINT fk_doctor_service_service FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
);

-- Adicione índices ou outras restrições, conforme necessário
