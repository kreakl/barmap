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

  mapEntriesToIds(
    bars: readonly Bar[],
    barIds: readonly number[],
    relation: keyof Bar,
  ) {
    const entriesMap = new Map(bars.map((bar) => [bar.id, bar[relation]]));

    return barIds.map((id) => entriesMap.get(id));
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

    return this.mapEntriesToIds(barsWithOutlets, barIds, 'outlets');
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

    return this.mapEntriesToIds(barsWithTypes, barIds, 'types');
  }

  async findBarFranchiseByBatch(barIds: readonly number[]) {
    const barsWithFranchise = await this.barRepository.find({
      select: {
        id: true,
      },
      relations: ['franchise'],
      where: {
        id: In(barIds),
      },
    });

    return this.mapEntriesToIds(barsWithFranchise, barIds, 'franchise');
  }
}
