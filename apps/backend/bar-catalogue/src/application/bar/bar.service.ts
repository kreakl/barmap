import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Bar } from '../../domain/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Bar)
    private readonly barRepository: Repository<Bar>,
  ) {}

  async findAll() {
    return this.barRepository.find();
  }

  async findById(id: number) {
    return this.barRepository.findOneBy({
      id,
    });
  }

  async findBarOutletsByBatch(barIds: readonly number[]) {
    const barsWithOutlets = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: [
        'outletList',
        'outletList.address',
        'outletList.address.state',
      ],
      where: {
        id: In(barIds),
      },
    });

    return barsWithOutlets.map((bar) => bar.outletList);
  }

  async findBarTypesByBatch(barIds: readonly number[]) {
    const barsWithTypes = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['typeList', 'typeList.category'],
      where: {
        id: In(barIds),
      },
    });

    return barsWithTypes.map((bar) => bar.typeList);
  }

  async findBarFranchiseByBatch(barIds: readonly number[]) {
    const barsWithFranchises = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['franchise'],
      where: {
        id: In(barIds),
      },
    });

    return barsWithFranchises.map((bar) => bar.franchise);
  }
}
