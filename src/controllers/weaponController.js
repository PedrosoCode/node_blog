
const pool = require('../db/database');

const criarArma = async (req, res) => {
  try {
    const { name, damage, fixedBonus, fixedReduction, range, hands, throwable, damageType } = req.body;
    const newWeapon = await pool.query(
      'INSERT INTO tb_rpg_weapons (name, damage, fixed_bonus, fixed_reduction, range, hands, throwable, damage_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, damage, fixedBonus, fixedReduction, range, hands, throwable, damageType]
    );
    res.json(newWeapon.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { criarArma };
