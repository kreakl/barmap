import { IllegalArgumentException } from './repository.exceptions';

/**
 * Page specification utility class.
 * @property {number} pageNumber the page number to retrieve.
 * @property {number} offset the number of entities composing the result.
 */
export class Pageable {
  readonly pageNumber: number;
  readonly offset: number;

  /**
   * Creates a pageable instance.
   * @param {Pageable} pageable the instance to create the pageable from.
   * @throws {IllegalArgumentException} if the given instance does not specify a page number and an offset.
   */
  constructor(pageable: Pageable) {
    if (!pageable.pageNumber) {
      throw new IllegalArgumentException(
        'A value for the page number is missing',
      );
    }
    if (!pageable.offset) {
      throw new IllegalArgumentException('A value for the offset is missing');
    }
    this.pageNumber = pageable.pageNumber;
    this.offset = pageable.offset;
  }
}

/**
 * Specifies some options to narrow down a search operation.
 * @property {any=} filters (optional) a MongoDB entity field-based query to filter results.
 * @property {any=} sortBy (optional) a MongoDB sort criteria to return results in some sorted order.
 * @property {Pageable=} pageable (optional) page data (i.e., page number and offset) required
 * to return a particular set of results.
 */
export type SearchOptions = {
  filters?: Record<string, any>;
  sortBy?: any;
  pageable?: Partial<Pageable>;
};

/**
 * Specifies a list of common database CRUD operations.
 */
export abstract class Repository<T, ID> {
  /**
   * Find an entity by ID.
   * @param {string} id the ID of the entity.
   * @returns {Promise<Optional<T>>} the entity or null.
   * @throws {IllegalArgumentException} if the given `id` is `undefined` or `null`.
   */
  findById: (id: ID) => Promise<T | null>;

  deleteMany: () => Promise<void>;

  /**
   * Find all entities.
   * @param {SearchOptions} options (optional) the desired search options (i.e., field filters, sorting,
   * and pagination data).
   * @returns {Promise<T[]>} all entities.
   * @throws {IllegalArgumentException} if the given `options` specifies an invalid parameter.
   */
  findAll: (options?: SearchOptions) => Promise<T[]>;
  findOne?: (options?: SearchOptions) => Promise<T | null>;

  /**
   * Save (insert or update) an entity.
   * @param {T} entity the entity to save.
   * @param {string} userId (optional) the ID of the user executing the action.
   * @returns {Promise<T>} the saved version of the entity.
   * @throws {IllegalArgumentException} if the given `entity` is `undefined` or `null` or
   * specifies an `id` not matching any existing entity.
   * @throws {ValidationException} if the given `entity` specifies a field with some invalid value.
   */
  insert: (entity: T) => Promise<T>;
  updateById: (id: ID, entity: T) => Promise<T>;

  /**
   * Delete an entity by ID.
   * @param {string} id the ID of the entity.
   * @returns {Promise<boolean>} `true` if the entity was deleted, `false` otherwise.
   * @throws {IllegalArgumentException} if the given `id` is `undefined` or `null`.
   */
  deleteById: (id: ID) => Promise<boolean>;
}
