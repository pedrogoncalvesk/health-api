import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Raw,
} from 'typeorm';

/**
 * Entity service
 */
@Entity('SERVICES')
export class ServiceEntity {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'raw',
  } as any)
  id: string;

  @Column({ name: 'NAME', type: 'varchar2', length: 255, nullable: false })
  name: string;

  @Column({ name: 'DESCRIPTION', type: 'clob', nullable: true })
  description?: string;

  // // Relacionamento com a tabela Appointment
  // @OneToMany(() => Appointment, (appointment) => appointment.service)
  // appointments: Appointment[];

  // // Relacionamento com a tabela DoctorService
  // @OneToMany(() => DoctorService, (doctorService) => doctorService.service)
  // doctorServices: DoctorService[];
}
