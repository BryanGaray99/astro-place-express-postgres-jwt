const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on ('error', (err) => {
      console.error(err);
    })
  };

  async find() {
    const query = 'SELECT * FROM tasks';
    const res = await this.pool.query(query);
    return res.rows;
  };

  async create(data) {
    return data;
  };

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
