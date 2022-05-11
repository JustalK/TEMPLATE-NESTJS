import { RepositoryService } from '@src/shared/repository.service';
import { NotFoundException } from '@nestjs/common';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class SharedService<M, CreateInput, UpdateInput> {
  constructor(
    private readonly repository: RepositoryService<M, CreateInput, UpdateInput>,
  ) {}

  /**
   * Search by id a document in the db
   * If the document does not exist, return an exception
   * @param _id The id of the document to find
   * @return The found document
   * */
  async findById(_id: string): Promise<M> {
    const doc = await this.repository.findById(_id);
    if (!doc) {
      throw new NotFoundException();
    }
    return doc;
  }

  /**
   * Return all the document of the collection
   * @return The objects belonging to the collection
   * */
  async findAll(): Promise<M[]> {
    return this.repository.findAll();
  }

  /**
   * Create the default options for encoding data
   * @param data The data for creating our document
   * @return The created document
   * */
  async create(data: CreateInput): Promise<M> {
    return this.repository.create(data);
  }
}
