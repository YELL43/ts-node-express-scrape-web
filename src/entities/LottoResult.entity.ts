import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LottoResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  firstPrize: string;

  @Column()
  threeFront: string;

  @Column()
  threeBack: string;

  @Column()
  twoBack: string;

  @Column()
  titleFirstPrize: string;

  @Column()
  titleThreeFront: string;

  @Column()
  titleThreeBack: string;

  @Column()
  titleTwoBack: string;
}