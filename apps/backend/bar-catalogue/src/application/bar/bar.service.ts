import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Bar } from '../../domain/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedDto, PaginatedQueryParametersDto } from '@bar-map/shared';

@Injectable()
export class BarService {
  constructor(
    @InjectRepository(Bar)
    private readonly barRepository: Repository<Bar>,
  ) {}

  async findAll(
    paginatedQueryDto: PaginatedQueryParametersDto = new PaginatedQueryParametersDto(),
  ) {
    const { skip, pageSize, order } = paginatedQueryDto;
    const [bars, itemCount] = await this.barRepository.findAndCount({
      skip,
      take: pageSize,
      order: {
        id: order,
      },
    });

    return new PaginatedDto(bars, { itemCount, paginatedQueryDto });
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
