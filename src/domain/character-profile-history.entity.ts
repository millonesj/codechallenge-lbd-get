import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../infraestructure/common/base.entity';

@Entity({
  name: 'character_profile_history',
})
export class CharacterProfileHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  autoId: number;

  @Column({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  height: string;

  @Column({ type: 'varchar', nullable: true })
  mass: string;

  @Column({ type: 'varchar', nullable: true })
  hairColor: string;

  @Column({ type: 'varchar', nullable: true })
  skinColor: string;

  @Column({ type: 'varchar', nullable: true })
  eyeColor: string;

  @Column({ type: 'varchar', nullable: true })
  birthYear: string;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;
}
