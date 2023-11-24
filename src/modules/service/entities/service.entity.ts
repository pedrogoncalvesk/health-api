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
    // select: false,
    // transformer: {
    //   from: (value: Buffer) => {
    //     console.log('from', value);
    //     return value.toString('hex');
    //   },
    //   to: (value: string) => {
    //     console.log('to', value, Buffer.from(value, 'hex'));
    //     // return Buffer.from(value, 'hex');
    //     return value;
    //   },
    // },
  } as any)
  // @PrimaryColumn({
  //   name: 'ID',
  //   type: 'raw',
  //   length: 16,
  //   // generatedType: 'VIRTUAL',
  //   // select: false,
  //   // default: null,
  // transformer: {
  //   from: (value: Buffer) => {
  //     console.log('from', value);
  //     return value.toString('hex');
  //   },
  //   to: (value: string) => {
  //     console.log('to', value, Buffer.from(value, 'hex'));
  //     return Buffer.from(value, 'hex');
  //   },
  // },
  // })
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
