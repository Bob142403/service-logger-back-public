import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigration1566993933823 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(36) NOT NULL, `lastName` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `service` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(36) NOT NULL, userId int, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, type varchar(255) NOT NULL, createdAt varchar(255) NOT NULL, `description` varchar(255) NOT NULL, serviceId int, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("DROP TABLE `user`");
    await queryRunner.query("DROP TABLE `service`");
    await queryRunner.query("DROP TABLE `log`");
  }
}
