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
        'outlets',
        'outlets.address',
        'outlets.address.state',
        'outlets.photos',
      ],
      where: {
        id: In(barIds),
      },
    });

    return barsWithOutlets.map((bar) => bar.outlets);
  }

  async findBarTypesByBatch(barIds: readonly number[]) {
    const barsWithTypes = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['types', 'types.category'],
      where: {
        id: In(barIds),
      },
    });

    return barsWithTypes.map((bar) => bar.types);
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
