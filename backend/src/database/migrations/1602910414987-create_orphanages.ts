import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602910414987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Realizar alterações no banco de dados
        //Criar, deletar, adicionar... tabela
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [
            {
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'name',
                type: 'varchar'
            },
            {
                name: 'latitude',
                type: 'decimal',
                scale: 10, //n depois da vígula
                precision: 2, //n antes da vígula
            },
            {
                name: 'longitude',
                type: 'decimal',
                scale: 10, //n depois da vígula
                precision: 2, //n antes da vígula
            },
            {
                name: 'about',
                type: 'text',
            },
            {
                name: 'instructions',
                type: 'text',
            },
            {
                name: 'opening_hours',
                type: 'varchar',
            },
            {
                name: 'open_on_weekends',
                type: 'boolean',
                default: false
            },
    
            ],
        }))
        
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        //Desfazer o que foi feito no up
         await queryRunner.dropTable('orphanages')
    }
  
}