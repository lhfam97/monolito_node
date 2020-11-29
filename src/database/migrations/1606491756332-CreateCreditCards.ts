import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCreditCards1606491756332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'creditcards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          { name: 'codigo', type: 'varchar', isNullable: false },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('creditcards');
  }
}
