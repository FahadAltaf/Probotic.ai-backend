const { PrismaClient, Prisma } = require('@prisma/client');

class PrismaService {
  constructor() {
    this.client = new PrismaClient()
  }

  // Create
  async insert(table, entity) {
    const columns = Object.keys(entity).join(', ');
    const values = Object.values(entity).map(val => 
      typeof val === 'object' ? `'${JSON.stringify(val)}'` : `'${val}'`
    ).join(', ');
    
    const result = await this.client.$queryRaw(
      Prisma.sql`
        INSERT INTO ${Prisma.raw(table)} (${Prisma.raw(columns)})
        VALUES (${Prisma.raw(values)})
        RETURNING *;
      `
    );
    return result[0];
  }

  // Bulk Insert
  async bulkInsert(table, entities) {
    const values = entities.map(entity => `(${Object.values(entity).map(val => `'${val}'`).join(', ')})`).join(', ');
    const result = await this.client.$queryRaw(
      Prisma.sql`
        INSERT INTO ${Prisma.raw(table)} (${Prisma.raw(Object.keys(entities[0]).join(', '))})
        VALUES ${Prisma.raw(values)}
        RETURNING *;
      `
    );
    return result;
  }

  // Read All
  async getAll(table) {
    return await this.client.$queryRaw(
      Prisma.sql`SELECT * FROM ${Prisma.raw(table)}`
    );
  }

  // Get by ID
  async getById(table, primaryKeyColumn, primaryKeyValue, isUUID = true) {
    const result = await this.client.$queryRaw(
      Prisma.sql`
        SELECT * FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(primaryKeyColumn)} = ${isUUID ? Prisma.sql`${primaryKeyValue}::uuid` : primaryKeyValue}
        LIMIT 1;
      `
    );
    return result[0];
  }

  // Get by Multiple IDs
  async getByIds(table, primaryKeyColumn, primaryKeyValues) {
    return await this.client.$queryRaw(
      Prisma.sql`
        SELECT * FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(primaryKeyColumn)} IN (${Prisma.raw(primaryKeyValues.join(', '))});
      `
    );
  }

  // Get Many by Field
  async getManyByField(table, fieldName, fieldValue) {
    return await this.client.$queryRaw(
      Prisma.sql`
        SELECT * FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(fieldName)} = ${fieldValue};
      `
    );
  }

  // Get Many by Field with Range
  async getManyByFieldWithRange(table, fieldName, fieldValue, lessField, lessValue, greaterField, greaterValue) {
    return await this.client.$queryRaw(
      Prisma.sql`
        SELECT * FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(fieldName)} = ${fieldValue}
        AND ${Prisma.raw(lessField)} <= ${lessValue}
        AND ${Prisma.raw(greaterField)} >= ${greaterValue};
      `
    );
  }

  // Get Many by Multiple Fields
  async getManyByMultipleFields(table, conditions) {
    const whereConditions = conditions.map(({ fieldName, fieldValue }) => {
        if (fieldName === 'id') {
            return Prisma.sql`${Prisma.raw(fieldName)} = ${fieldValue}::uuid`;
        }
        return Prisma.sql`${Prisma.raw(fieldName)} = ${fieldValue}`;
    });
    
    return await this.client.$queryRaw(
        Prisma.sql`
            SELECT * FROM ${Prisma.raw(table)}
            WHERE ${Prisma.join(whereConditions, ' AND ')};
        `
    );
  }
  // Get Many by Multiple Fields without UUID

  async getManyByMultipleFieldsWithoutUUID(table, conditions) {
    const whereConditions = conditions.map(({ fieldName, fieldValue }) => {
        if (fieldName === 'id') {
            return Prisma.sql`${Prisma.raw(fieldName)} = ${fieldValue}`;
        }
        return Prisma.sql`${Prisma.raw(fieldName)} = ${fieldValue}`;
    });
    
    return await this.client.$queryRaw(
        Prisma.sql`
            SELECT * FROM ${Prisma.raw(table)}
            WHERE ${Prisma.join(whereConditions, ' AND ')};
        `
    );
  }
  // Update
  async update(table, primaryKeyColumn, primaryKeyValue, entity, isUUID = true) {
    const setClause = Object.entries(entity)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${key} = '${JSON.stringify(value)}'`;
        }
        return `${key} = '${value}'`;
      })
      .join(', ');

    if (isUUID) {
        return await this.client.$queryRaw`
            UPDATE ${Prisma.raw(table)}
            SET ${Prisma.raw(setClause)}
            WHERE ${Prisma.raw(primaryKeyColumn)} = ${primaryKeyValue}::uuid
            RETURNING *;
        `;
    }

    return await this.client.$queryRaw`
        UPDATE ${Prisma.raw(table)}
        SET ${Prisma.raw(setClause)}
        WHERE ${Prisma.raw(primaryKeyColumn)} = ${primaryKeyValue}
        RETURNING *;
    `;
  }

  // Delete
  async delete(table, primaryKeyColumn, primaryKeyValue) {
    await this.client.$queryRaw(
      Prisma.sql`
        DELETE FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(primaryKeyColumn)} = ${primaryKeyValue};
      `
    );
  }

  // Bulk Delete
  async bulkDelete(table, fieldName, fieldValue) {
    await this.client.$queryRaw(
      Prisma.sql`
        DELETE FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(fieldName)} = ${fieldValue};
      `
    );
  }

  // Bulk Delete with Multiple Conditions
  async bulkDeleteWithConditions(table, conditions) {
    const whereClause = conditions
      .map(({ fieldName, fieldValue }) => `${fieldName} = '${fieldValue}'`)
      .join(' AND ');

    await this.client.$queryRaw(
      Prisma.sql`
        DELETE FROM ${Prisma.raw(table)}
        WHERE ${Prisma.raw(whereClause)};
      `
    );
  }

  // Check if exists
  async exists(table, fieldName, fieldValue) {
    const result = await this.client.$queryRaw(
      Prisma.sql`
        SELECT EXISTS(
          SELECT 1 FROM ${Prisma.raw(table)}
          WHERE ${Prisma.raw(fieldName)} = ${fieldValue}
        ) as exists;
      `
    );
    return result[0].exists;
  }

  async findManyWithPaginationAndSearch(table, options) {
    const { 
      whereConditions = [], 
      searchFields = [], 
      searchValue = null,
      page = 1, 
      pageSize = 10,
      orderBy = { field: 'created_at', direction: 'DESC' }
    } = options;

    const offset = (page - 1) * pageSize;
    
    let whereClause = whereConditions
      .map(({ fieldName, fieldValue }) => `${fieldName} = '${fieldValue}'`)
      .join(' AND ');

    if (searchValue && searchFields.length > 0) {
      const searchClauses = searchFields
        .map(field => `${field}::text ILIKE '%${searchValue}%'`)
        .join(' OR ');
      whereClause = whereClause 
        ? `(${whereClause}) AND (${searchClauses})`
        : searchClauses;
    }

    const whereSQL = whereClause ? `WHERE ${whereClause}` : '';
    
    const [results, countResult] = await Promise.all([
      this.client.$queryRaw(
        Prisma.sql`
          SELECT * FROM ${Prisma.raw(table)}
          ${Prisma.raw(whereSQL)}
          ORDER BY ${Prisma.raw(orderBy.field)} ${Prisma.raw(orderBy.direction)}
          LIMIT ${pageSize}
          OFFSET ${offset};
        `
      ),
      this.client.$queryRaw(
        Prisma.sql`
          SELECT COUNT(*) as total FROM ${Prisma.raw(table)}
          ${Prisma.raw(whereSQL)};
        `
      )
    ]);

    const totalCount = parseInt(countResult[0].total);

    return {
      results,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize)
    };
  }

  async findManyWithOrCondition(table, whereConditions, orConditions, orderBy = null) {
    const whereClause = whereConditions
      .map(({ fieldName, fieldValue }) => `${fieldName} = '${fieldValue}'`)
      .join(' AND ');

    const orClause = orConditions
      .map(condition => {
        const entries = Object.entries(condition);
        return entries
          .map(([field, value]) => {
            if (value === null) {
              return `${field} IS NULL`;
            }
            return `${field} = '${value}'`;
          })
          .join(' AND ');
      })
      .join(' OR ');

    const orderByClause = orderBy 
      ? `ORDER BY ${orderBy.field} ${orderBy.direction}`
      : '';

    const query = `
      SELECT * FROM ${table}
      WHERE ${whereClause}
      AND (${orClause})
      ${orderByClause};
    `;

    return await this.client.$queryRaw(
      Prisma.sql([query])
    );
  }
}

module.exports = PrismaService; 